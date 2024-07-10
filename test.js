
const size = 3;
    let board = [];
for(let i = 0; i < size; i++){
    board[i] = [];
    for (let j = 0; j < size; j++) {
        board[i].push('-');
    }
}

board[0][0] = 'x';
board[1][1] = 'x';
board[2][2] = 'x';

const printBoard = (board) => {
    const stringBoard = board.map(row => row.join(' ')).join('\n');
    console.log(stringBoard);
}

const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
const flatBoard = board.flat();
for(let i = 0; i < lines.length; i++){

    let line = lines[i];

    if(flatBoard[line[0]] === 'x'
        && flatBoard[line[0]] === flatBoard[line[1]]
        && flatBoard[line[0]] === flatBoard[line[2]]){
        console.log("win win chicken dinner!!!");
    }
}
//printBoard(board);
console.log(board.flat());
//console.log(board.filter((c) => c !== 'x').length === 0);


