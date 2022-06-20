 /** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let h = 0; h < HEIGHT; h++ ) {
    board[h] = []
    for (let w = 0; w < WIDTH; w++ ) {
      board[h].push(null)
    }
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board")
  // TODO: add comment for this code
  // create a row
  let top = document.createElement("tr");
  // set the id for the row
  top.setAttribute("id", "column-top");
  // add an event listener for each top column
  top.addEventListener("click", handleClick);

  //loop through each row and create a column with the id set to the column #
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  //append the top row to the html board
  htmlBoard.append(top);

  // TODO: add comment for this code
  // loop through the number of rows set by "height" and create them
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    // for each row, lood with the number of columns set above
    for (let x = 0; x < WIDTH; x++) {
      // create a cell, add the id of "row-column" to each cell and append it to the current row being looped through
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    // append the new row with the cells
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  let arr = []
  for (let row = HEIGHT-1; row >= 0; row --) {
    arr.push(row)
  }
  // MYCOMMENT: we now have an array of the row values for each column
  // MYCOMMENT: run find to find the first array that is NOT EQUAL TO NULL
  const openSpot = arr.find( val => board[val][x] === null )
  return openSpot !== undefined ? openSpot : null
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const newPiece = document.createElement("div")
  newPiece.setAttribute("class", "piece")
  newPiece.classList.add("p" + currPlayer)
  document.getElementById(`${y}-${x}`).appendChild(newPiece)
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer

  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  // const fullBoard = board.every(function(arr){
  //   return arr.every(function(val){
  //     return val !== null
  //   })
  // })
  // refactored function statement below
  const fullBoard = board.every((arr) =>  arr.every(val => val !== null))

  if (fullBoard) {
    return endGame(`It's a tie!`);
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer ===  1 ? currPlayer = 2 : currPlayer = 1
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  // MYCOMMENT: 
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
