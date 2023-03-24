const statusText = document.querySelector("#statusText");
const restartGame = document.querySelector("#restartGame");
const cell = document.querySelectorAll(".cell");

const winPatterns = [//2 dimensional array for win patterns
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options = ['','','','','','','','',''];

let currentPlayer = 'X';
let running = false;

initializeGame();

function initializeGame(){

   cell.forEach(cell => cell.addEventListener('click', cellClicked))
   restartGame.addEventListener('click',reset)
   statusText.textContent = `${currentPlayer}'s turn`;
   running = true;

}

function cellClicked(){

    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){

        return; //this basically says that, if the cell is empty or the game is not running then dont do anything or else we can update the cell space
    }

    updateCell(this, cellIndex);
    //changePlayer();
    checkWinner();


}

function updateCell(cell, Index){

    options[Index] = currentPlayer;
    cell.textContent = currentPlayer;

}

function changePlayer(){

    currentPlayer = (currentPlayer == 'X') ? "0" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){

    let roundWon = false;

    for(let i = 0; i < winPatterns.length; i++){

        const condition = winPatterns[i];
        
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){

            continue;
        }

        if(cellA == cellB && cellB == cellC){

            roundWon = true;
            break;
        }



    }

    if(roundWon){

        statusText.textContent = `${currentPlayer} Wins`;
        running = false;

    }else if(!options.includes("")){

        statusText.textContent = 'Draw';

    }else{

        changePlayer();
    }

    



}

function reset(){

   currentPlayer = "X";
   options = ['','','','','','','','',''];

   statusText.textContent = `${currentPlayer}'s turn`;
   cell.forEach(cell=>cell.textContent = "");
   running = true;


}





