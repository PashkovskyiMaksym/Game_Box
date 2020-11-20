const gameBoardRef = document.getElementById('gameBoard');
const counterRef = document.getElementById('counter');
const startGameButtonRef = document.getElementById('startGameButton');
const scoreRef = document.getElementById('score');
const yourScoreRef = document.getElementById('yourScore');

let isGameRunning = false;
let boardWidth = gameBoardRef.offsetWidth;
let boardHeight = gameBoardRef.offsetHeight;

let intervalRef = null;
let timeoutRef = null;

window.addEventListener("resize", function () {
    boardWidth = gameBoardRef.offsetWidth;
    boardHeight = gameBoardRef.offsetHeight;
});

let score = 0;

const startGame = () => {
    if (isGameRunning) {
        stopGame({showModal: true});
        return;
    }

    score = 0;
    isGameRunning = true;
    startGameButtonRef.innerText = 'Stop Game';

    let currentCounterValue = 60;
    counterRef.innerHTML = '01:00';
    currentCounterValue--;
    intervalRef = setInterval(() => {
        for (let i = 0; i < 1; i++) {
            const box = document.createElement('div');
            box.classList.add('box');
            box.style.top = getRandomInt(0, boardHeight - 30) + "px";
            box.style.left = getRandomInt(0, boardWidth - 30) + "px";
            box.addEventListener("click", deleteBlock);
            gameBoardRef.appendChild(box);
        }
        scoreRef.innerHTML = `${score}`;
        yourScoreRef.innerHTML = `Your score ${score}`;
        counterRef.innerHTML = `00:${currentCounterValue}`;
        currentCounterValue--;
    }, 1000);

    timeoutRef = setTimeout(() => {
        clearInterval(intervalRef);
        $('#myModal').modal('show');
    }, 60000);
};


function newGame() {
    stopGame({showModal: false});
    startGame();
}

function stopGame({showModal}) {
    isGameRunning = false;
    clearInterval(intervalRef);
    clearTimeout(timeoutRef);
    gameBoardRef.innerHTML = ''
    startGameButtonRef.innerText = 'Start Game';
    scoreRef.innerHTML = '0';

    if (showModal) {
        $('#myModal').modal('show');
    }
}

function saveResult() {
    const userName = document.getElementById('name').value;
    const resultTableRef = document.getElementById('resultTable');
    const winner = document.createElement('p');
    winner.innerHTML = userName + ' ' + score;
    resultTableRef.appendChild(winner);
    $('#myModal').modal('hide');
    document.getElementById('name').value = '';
    gameBoardRef.innerHTML = '';
    scoreRef.innerHTML = '0';
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function deleteBlock(event) {
    event.target.remove();
    score++;
}