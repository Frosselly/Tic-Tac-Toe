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

    const checkTie = () => {
        if(board.flat().filter((c) => c === '-').length === 0)
        {
            return true;
        }
        return false;
    }


    const printBoard = () => {
        const stringBoard = board.map(row => row.join(' ')).join('\n');
        console.log(stringBoard);
    }
       
    return {getBoard, markSpot, printBoard, checkWin, checkTie};
}




function Game(
    player1 = "p1",
    player2 = "p2"
){
    const board = GameBoard();
    
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
        //textField.textContent = `Make your move ${currentPlayer.name}`;
    }
    const printWin= () => {
        board.printBoard();
        console.log(`Congratulations ${currentPlayer.name} you WON!!!!`);
        //textField.textContent = `Congratulations ${currentPlayer.name} you WON!!!!`;
    }
    const printTie= () => {
        board.printBoard();
        console.log(`You tied!!!!`);
        //textField.textContent = `You tied!!!!`;
    }

    



    const playRound = (x, y) => {
        const success = board.markSpot(x, y, currentPlayer.token);
        if(!success || !isItRunning) return false;
       
        if(board.checkWin(currentPlayer.token)){
            printWin();
            return 'win';
        }else if(board.checkTie()){
            printTie();
            return 'tie';
        }
        else{
            printNewRound()
            
        }
        switchPlayers();
        
        return true;
    }

    
    printNewRound();
   

    return {getCurrentPlayer, playRound, getBoard: board.getBoard}
}

const screen = ScreenController();

function ScreenController(){

    let game = Game();
    const playerTurnDiv = document.querySelector(".messages");
    const boardDiv = document.querySelector('.game');
    let progress;


    const addImage = (currMark, node) => {
        const mark = ['X', '0'];
        const img = document.createElement("img");
        switch (currMark) {
            case 'X':
                img.src = 'alpha-x.svg'
                break;
            case '0':
                img.src = 'alpha-o.svg'
                break;
            case '-':
                    return false;
                    break;        
            default:
                break;
        }
        node.appendChild(img);
    }
    const updateScreen = () => {
        boardDiv.textContent = "";
    
        const board = game.getBoard();
        const activePlayer = game.getCurrentPlayer();
    
        // Display player's turn
        switch (progress) {
            case 'win':
                playerTurnDiv.textContent = `${activePlayer.name} won`
                break;
            case 'tie':
                playerTurnDiv.textContent = `you tied!!!`
                break;   
            default:
                playerTurnDiv.textContent = `${activePlayer.name}'s turn...`
                break;
        }
        
    
        board.forEach((row, rowIndex)=> {
          row.forEach((cell, index) => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.dataset.column = index
            cellButton.dataset.row = rowIndex
            addImage(cell, cellButton);
            boardDiv.appendChild(cellButton);
          })
        })
      }

  function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;
    if (!selectedColumn) return;
    
    progress = game.playRound( selectedRow, selectedColumn);
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);

  updateScreen();
    
    const resetBtn = document.querySelector("#resetBtn");
    
    resetBtn.addEventListener("click", ()=>{
        game = new Game();
    
        updateScreen();
    })
}

