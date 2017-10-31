class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);

    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('Game Over!');
      this._board.print();
    } else if (!this._board.hasSafeTiles()) {
      console.log('You win!');
      this._board.print();
    } else {
      console.log('Current Board:');
      this._board.print();
    }
  }
}


class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  } // playerBoard()

  get bombBoard() {
    return this._bombBoard;
  } // playerBoard()

  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      // add bomb to playerBoard
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  } // flipTile()

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    // check adjacent tiles for bombs
    const neighborOffsets = [
      [-1,-1],
      [-1,0],
      [-1,1],
      [0,-1],
      [0,1],
      [1,-1],
      [1,0],
      [1,1]
    ];

    // Checking the length of the bomb board would return the number of rows (i.e. the number of nested arrays):
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];

      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns ) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          this._numberOfBombs++;
        }
      }
    });
    return this._numberOfBombs;
  } // getNumberOfNeighborBombs()

  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  } // hasSafeTiles()

  print() { // #19???
    console.log(this._playerBoard.map(row => row.join('|')).join('\n'));
  } // print()

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];
    for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      let row = [];
      for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  } // static generatePlayerBoard()

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];
    for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      let row = [];
      for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(' ');
      }
      board.push(row);
    }

    let numberOfBombsPlaced = 0;

    while (numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }

    return board;
  } // static generateBombBoard()
} // Board

const g = new Game(3,3,3);

g.playMove(1,0);
