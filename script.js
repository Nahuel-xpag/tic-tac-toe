function  Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];
  
    
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Spot());
        }
    }

//method of getting the board to render it
const getBoard = () => board;

const markSpot = (rSpot, cSpot, player) => { 
    if ( board[rSpot][cSpot].getValue() === 0 ) {
        board[rSpot][cSpot].addMarker(player);
    }
    
};

const printBoard = () => {
    const boardWithMarkers = board.map((row) => row
    .map((spot) => spot.getValue()))
    console.log(boardWithMarkers);    
    return boardWithMarkers;
    };

    return { getBoard, markSpot, printBoard };
}
/* spot = a square of the board*/

function Spot() {
    let value = 0;

    const addMarker = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addMarker, getValue
    };
}

function DisplayController(
 playerOneName = "player one",
 playerTwoName = "player two")
 {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            marker: 'x'
        },
        {
            name: playerTwoName,
            marker: 'o'
        }
    ];

    let activePlayer = players[0];

    const switchTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] :
        players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.getBoard();
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };
    const winCheck = (player, board) => {
        for (let row = 0; row < 3; row++) {
            if (board[row][0] === player && board[row][1] === player && board[row][2] === player){
                console.log(`${getActivePlayer().name} wins!`);
                return true;
            }
        };
        for (let col = 0; col < 3; col++){
            if (board[0][col] === player && board[1][col] === player && board[2][col] === player){
                console.log(`${getActivePlayer().name} wins!`);
                return true;
                
            }
        };
        if((board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
        (board[0][2] === player && board[1][1] === player && board[2][0] === player)){
            console.log(`${getActivePlayer().name} wins!`);
            return true;
            
        }
       return false
    }

    const tieCheck = (board) => {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === 0) {
                    return 
                }
            }
        }
        return true
    }
    
    const playRound = (row, col) => {
        let boardArray = board.printBoard();
        if (boardArray && row >= 0 && row < boardArray.length && col >= 0 && col < boardArray[row].length) {
           
            if (boardArray[row][col] === 0){
                board.markSpot(row, col, getActivePlayer().marker)

                if (winCheck(getActivePlayer().marker, board.printBoard())) {
                    handleWin(getActivePlayer().name);

            }   else if (tieCheck(board.printBoard())){
                handleTie() 
            }
                else { 
                    switchTurn();
                    printNewRound();
                } 
            }   else {console.log('invalid row or column')}
            
        /* win condition here */
       }
        
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard
    };
 }
 function ScreenController(playerOne, playerTwo) {
    
    let game = DisplayController(playerOne, playerTwo); // Declare 'game' variable outside
    
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.gameboard');

    function updateScreen() {
        boardDiv.textContent = ''; // Clear the content of boardDiv
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name}'s turn`;
  
        board.forEach((row, rIndex) => {
            row.forEach((spot, cIndex) => {
                const spotButton = document.createElement('button');
                spotButton.classList.add('spot');

                spotButton.dataset.row = rIndex;
                spotButton.dataset.column = cIndex;
                if (spot.getValue() === 0) {
                    spotButton.textContent = '';
                } else {
                    spotButton.textContent = spot.getValue();
                }
                boardDiv.appendChild(spotButton);
                spotButton.addEventListener('click', clickHandlerBoard);
            });
            
        });
    }

    function clickHandlerBoard(e) {
        const target = e.target;
        const selectedRow = target.dataset.row;
        const selectedCol = target.dataset.column;

        if (selectedCol === false || selectedRow === false) return;

        game.playRound(selectedRow, selectedCol);
        updateScreen();
    }

  
    // Remove the old event listener, if any
    //spotButton.removeEventListener('click', clickHandlerBoard);
    // Add the new event listener
    
  

    updateScreen();
}

function handleWin(winner) {
    const mainDiv = document.querySelector('.main');
    const winnerDiv = document.createElement('h1');
    
    
    const restartButton = document.createElement('button');
    restartButton.setAttribute('id', 'restart');

    winnerDiv.textContent = `${winner} wins`;
    mainDiv.appendChild(winnerDiv);
    mainDiv.appendChild(restartButton);
    restartButton.addEventListener('click',() => {
        Gameboard();
        StartMenu();
        mainDiv.removeChild(winnerDiv);
        mainDiv.removeChild(restartButton);
    });
    document.querySelector('#restart').textContent = 'RESTART';
}
function handleTie() {
    const mainDiv = document.querySelector('.main');
    const tieDiv = document.createElement('h1');
    
    
    const restartButton = document.createElement('button');
    restartButton.setAttribute('id', 'restart');

    tieDiv.textContent = "It's a tie"

    mainDiv.appendChild(tieDiv);
    mainDiv.appendChild(restartButton);

    restartButton.addEventListener('click',() => {
        Gameboard();
        StartMenu();
        mainDiv.removeChild(tieDiv);
        mainDiv.removeChild(restartButton);
    });
    document.querySelector('#restart').textContent = 'RESTART';

}
function StartMenu(){
    const mainDiv = document.querySelector('.main');
    const playerOneInput = document.createElement('input');
    const playerTwoInput = document.createElement('input');
    const startButton = document.createElement('button');

    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.gameboard');

    mainDiv.removeChild(boardDiv);
    mainDiv.removeChild(playerTurnDiv);

    startButton.setAttribute('id', 'start');
    startButton.textContent = 'START';

    playerOneInput.setAttribute('id', 'p1');
    playerOneInput.setAttribute('value', 'Nahu');
    
    playerTwoInput.setAttribute('id', 'p2');
    playerTwoInput.setAttribute('value','Tami');
    
    startButton.addEventListener('click', () => {
        mainDiv.removeChild(playerOneInput);
        mainDiv.removeChild(playerTwoInput);
        mainDiv.removeChild(startButton);
        mainDiv.appendChild(boardDiv);
        mainDiv.appendChild(playerTurnDiv);
        ScreenController(playerOneInput.value, playerTwoInput.value);
    })

    mainDiv.appendChild(playerOneInput);
    mainDiv.appendChild(playerTwoInput);
    mainDiv.appendChild(startButton);

}
StartMenu();
