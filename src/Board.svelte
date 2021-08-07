<script>
  import Box from "./Box.svelte";
  export let board, tiles, send, receive;
</script>

<div class="board">
  {#each board as row}
    <div class="row">
      {#each row as ids} 
        <Box ids={ids} tiles={tiles} receive={receive} send={send} />
      {/each}
    </div>
  {/each}
</div>

<style>
  .row {
    display: flex;
  }

  .board {
    background-color: rgb(187, 173, 160);
    padding: 7px;
    border-radius: 7px;
    margin-top: 20px;
  }
</style>
