//game board

//controller > players

function GameBoard(){
    const size = 3;
    const board = [];


    for(let i = 0; i < size; i++){
        board[i] = [];
        for (let j = 0; j < size; j++) {
            board[i].push('-');
        }
    }

    const getBoard = () => board;

    const markSpot = (x, y, player) => {
        if(board[x][y] !== '-') return false;

        board[x][y] = player;
        return true;
    }

    const checkWin = (player) => {
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
        
            if(flatBoard[line[0]] === player
                && flatBoard[line[0]] === flatBoard[line[1]]
                && flatBoard[line[0]] === flatBoard[line[2]]){
                
                return true;
            }
        }
        return false;
    }


    const printBoard = () => {
        const stringBoard = board.map(row => row.join(' ')).join('\n');
        console.log(stringBoard);
    }
       
    return {getBoard, markSpot, printBoard, checkWin};
}




function Game(
    player1 = "p1",
    player2 = "p2"
){
    const board = GameBoard();
    const textField = document.querySelector(".messages");
    let isItRunning = true;

    const players = [
        {
            name: player1,
            token: 'X'
        },
        {
            name: player2,
            token: '0'
        }
    ];

    let currentPlayer = players[0];

    const getCurrentPlayer = () => currentPlayer;
    const switchPlayers = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    }
    const printNewRound = () => {
        board.printBoard();
        console.log(`Make your move ${currentPlayer.name}`);
        textField.textContent = `Make your move ${currentPlayer.name}`;
    }
    const printWin= () => {
        board.printBoard();
        console.log(`Congratulations ${currentPlayer.name} you WON!!!!`);
        textField.textContent = `Congratulations ${currentPlayer.name} you WON!!!!`;
    }
    


    const playRound = (x, y) => {
        const success = board.markSpot(x, y, currentPlayer.token);
        if(!success || !isItRunning) return false;

        if(board.checkWin(currentPlayer.token)){
            printWin();
            isItRunning = false;
        }else{
            printNewRound();
        }

        switchPlayers();
        return true;
    }

    printNewRound();

    //HTML logic

   

    return {getCurrentPlayer, playRound}
}

let game = Game();

const addImage = (currMark, node) => {
    const mark = ['X', '0'];
    const img = document.createElement("img");
    img.src = currMark === mark[0] ? "alpha-x.svg" : "alpha-o.svg";
    node.appendChild(img);
}


const mark = ['.cross', '.circle']
//let currMark = mark[0];
const cellContainers = document.querySelectorAll(".cell");
cellContainers.forEach(child => {
    const [x, y] = child.id.split(',').map(Number);

    child.addEventListener("click", () => {
        const result = game.playRound(x,y);
        if(!result) return ;
        // child.classList.add(currMark);
        let currMark = game.getCurrentPlayer().token === 'X' ? '0' : 'X';
        addImage(currMark, child);
        //currMark = currMark === mark[0] ? mark[1] : mark[0];
        
    });
})


const resetBtn = document.querySelector("#resetBtn");

resetBtn.addEventListener("click", ()=>{
    game = new Game();

    cellContainers.forEach(child => {
        child.textContent = "";
    })
})