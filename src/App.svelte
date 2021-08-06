<script>
	import { tick } from "svelte";
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import Board from "./Board.svelte";
	import { initBoard, getSpawn, merge, isValidMove, move } from "./game.js";
	
	let board, tiles, uid, score;
	reset();
	document.addEventListener("keyup", handleKeyDown);

	const [send, receive] = crossfade({
		duration: d => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 100,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	function makeTile(i, j, val) {
		board[i][j].push(uid);
		tiles[uid++] = val;
	}

	function reset() {
		board = initBoard();
		tiles = {};
		uid = 0;
		score = 0;
		makeTile(...getSpawn(board));
		makeTile(...getSpawn(board));
	}

	async function handleKeyDown(e) {
		const key = e.keyCode;
		if(!isValidMove(board, tiles, key)) return;
		board = move(board, tiles, key);
		
		await tick();
		setTimeout(() => {
			const [changes, d_score] = merge(board, tiles);
			for(let c of changes) {
				board[c[0]][c[1]].pop();
				board[c[0]][c[1]].pop();
				makeTile(...c);
			}
			makeTile(...getSpawn(board));
			score += d_score;
		}, 200);
	}
</script>

<div class="App">
	<header class="app-header">
		<h1>2048</h1>
		<p class="tag-line">The lesser the tiles the more the survival</p>
	</header>
	<Board board={board} tiles={tiles} receive={receive} send={send} />
	<div class="score-reset">
		<h3 class="score-txt">Score: {score}</h3>
		<button class="reset-btn" on:click={reset}>Reset</button>
	</div>
</div>

<style>
	.App {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	header {
		text-align: center;
	}

	h1 {
		color: rgb(119, 110, 101);
		margin: 0;
	}

	.tag-line {
		color: rgb(119, 110, 101);
		font-size: 1.2em;
	}

	.score-txt {
		background-color: rgb(205, 193, 180);
		color: white;
		margin-top: 15px;
		margin-right: 70px;
		padding: 5px;
		border-radius: 5%;
		font-size: 1.1em;
	}

	.reset-btn {
		background-color: #8f7a66;
		border: solid 0px;
		color: #ffffff;
		border-radius: 5%;
		padding: 7px;
		font-size: 1.1em;
		cursor: pointer;
	}

	.score-reset {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 30px;
	}
</style>
