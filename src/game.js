/* 
board - 3d array containing tile ids at each box (i, j)
tiles - maps the tile id to the tile value

At one instant a box (i, j) can have atmost 2 tiles to help in animation.
After the animation is over, we merge the tiles so that each box has atmost 1 tile
*/

// helps in iterating over the board according to the direction
export const h = {
  37: [0, 0, 0, 1, 1, -4], //Left
  38: [0, 0, 1, 0, -4, 1], //Up
  39: [0, 3, 0, -1, 1, 4], //Right
  40: [3, 0, -1, 0, 4, 1], //Down
};

export const initBoard = () => {
  const board = [];

  for (let a = 0; a < 4; ++a) {
    const row = [];
    for (let b = 0; b < 4; ++b) {
      row.push([]);
    }
    board.push(row);
  }

  return board;
};

export const getSpawn = (board) => {
  const spots = [];
  for (let i = 0; i < 4; ++i) {
    for (let j = 0; j < 4; ++j) {
      if (!board[i][j].length) {
        spots.push([i, j]);
      }
    }
  }
  const s = spots[Math.floor(Math.random() * spots.length)];
  const x = Math.random() > 0.1 ? 2 : 4;
  return [s[0], s[1], x];
};

export const merge = (board, tiles) => {
  const changes = []; // Stores (i, j, new_val) tuples
  let d_score = 0;
  for (let i = 0; i < 4; ++i) {
    for (let j = 0; j < 4; ++j) {
      if (board[i][j].length > 1) {
        changes.push([i, j, 2 * tiles[board[i][j][0]]]);
        d_score += 2 * tiles[board[i][j][0]];
      }
    }
  }
  return [changes, d_score];
};

export const isValidMove = (board, tiles, key) => {
  const d = h[key];
  let i = d[0],
    j = d[1];

  for (let a = 0; a < 4; ++a) {
    let arr = []; //Stores the currect row/column in correct direction
    for (let b = 0; b < 4; ++b) {
      arr.push(!board[i][j].length ? 0 : tiles[board[i][j][0]]);
      i += d[2];
      j += d[3];
    }
    for (let k = 1; k < 4; ++k) {
      if (arr[k] !== 0 && (arr[k - 1] === 0 || arr[k - 1] === arr[k])) {
        return true;
      }
    }
    i += d[4];
    j += d[5];
  }
  return false;
};

export const move = (board, tiles, key) => {
  const d = h[key];
  let i = d[0],
    j = d[1];

  for (let a = 0; a < 4; ++a) {
    let arr = [[], [], [], []],
      k = 0;
    for (let b = 0; b < 4; ++b) {
      if (board[i][j].length) {
        if (!arr[k].length) {
          arr[k].push(board[i][j][0]);
        } else if (tiles[arr[k][0]] === tiles[board[i][j][0]]) {
          arr[k++].push(board[i][j][0]);
        } else {
          arr[++k].push(board[i][j][0]);
        }
      }
      i += d[2];
      j += d[3];
    }
    i -= 4 * d[2];
    j -= 4 * d[3];
    for (k = 0; k < 4; ++k) {
      board[i][j] = arr[k];
      i += d[2];
      j += d[3];
    }
    i += d[4];
    j += d[5];
  }
  return board;
};
