// Initial data

let board = {
    a1: '', a2: '', a3:'',
    b1: '', b2: '', b3:'',
    c1: '', c2: '', c3: ''
};

let playerTurn = '';
let message = '';
let playing = false;

reset();

// Events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

//Functions
function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if (playing && board[item] === '') {
        board[item] = playerTurn;
        renderBoard();
        togglePlayer();
    }
}

function reset() {
    message = '';

    let random = Math.floor(Math.random() * 2);
    playerTurn = (random === 0) ? 'X' : 'O';

    for (let i in board) {
        board[i] = '';
    }

    playing = true;

    renderBoard();
    renderInfo();
}

function togglePlayer() {
    playerTurn = (playerTurn === 'X') ? 'O' : 'X';
    renderInfo();
}

function renderBoard() {
    for (let i in board) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = board[i];
    }

    checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = playerTurn;
    document.querySelector('.resultado').innerHTML = message;
}

function checkGame() {
    if (checkWinner('X')) {
        message = 'X é o vencedor!';
        playing = false;
    } else if (checkWinner('O')) {
        message = 'O é o vencedor!';
        playing = false;
    } else if(isFull()) {
        message = 'EMPATE';
        playing = false;
    }
}

function checkWinner(playerTurn) {
    let possibleVictory = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',
        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',
        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for (let j in possibleVictory) {
        let array = possibleVictory[j].split(',');
        let hasWinner = array.every(option => board[option] === playerTurn);
        if (hasWinner) {
            return true;
        }
    }

    return false;
}

function isFull() {
    for (let i in board) {
        if (board[i] === '') {
            return false;
        }
    }
    return true;
}