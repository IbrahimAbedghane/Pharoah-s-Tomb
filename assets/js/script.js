document.addEventListener('DOMContentLoaded',function() {
    const gameState = {
        playerScore: 0,
        computerScore: 0,
        draws: 0,
        gameMode: null,
        username: 'Player'
    }; 
});

const choicesConfig = {
    classic: ['rock', 'paper', 'scissors'],
    spock: ['rock', 'paper', 'scissors', 'lizard', 'spock']
};

window.setupGame = function() {
    gameState.gameMode = mode;
    document.getElementById('selectionScreen').classList.add('hidden');
    document.getElementById('usernameScreen').classList.remove('hidden');
};

window.enterUsername = function() {
    const usernameInput = document.getElementById('usernameInput');
    gameState.username = usernameInput.value.trim() || "Player";
    document.getElementById('usernameScreen').classList.add('hidden');
    document.getElementById('gamePlayArea').classList.remove('hidden');
    updateGreeting();
    populateChoices(gameState.gameMode);
};

window.returnToGameSelection = function() {
    document.getElementById('usernameScreen').classList.add('hidden');
    document.getElementById('selectionScreen').classList.remove('hidden');
};

window.returnToHome = function() {
    document.getElementById('gamePlayArea').classList.add('hidden');
    document.getElementById('selectionScreen').classList.remove('hidden');
};

window.resetGame = function() {
    gameState.playerScore = 0;
    gameState.computerScore = 0;
    gameState.draws = 0;
    updateScoreDisplay();
    const button = document.querySelectorAll('#choices button');
    button.forEach(button => button.disabled = false);
    document.getElementById('result').textContent ='';
    document.getElementById('gameEndModal').style.display= 'none';
    populateChoices(gameState.gameMode);
};

function populateChoices(mode) {
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML='';
    choicesConfig[mode].forEach(choice=> {
        const button = document.createElement('button');
        button.textContent = choice.charAt(0).toUpperCase() + choice.slice(1);
        button.addEventListener('click', function() { playRound(choice); });
        choicesContainer.appendChild(button);
    });
};

function playRound(playerSelection) {
    const computerSelection = computerPlay();
    const result = determineWinner(playerSelection, computerSelection);
    updateScore(result);
    displayResults(playerSelection, computerSelection, result);
};

function computerPlay() {
    const choices = choicesConfig[gameState.gameMode];
    return choices[Math.floor(Math.random() * choices.length)];
};

function determineWinner(player, computer) {
    if (player===computer) {
        return 'draw';
    }
    const wins = {
        rock: ['scissors', 'lizard'],
        paper: ['rock', 'spock'],
        scissors: ['paper', 'lizard'],
        lizard: ['spock', 'paper'],
        spock: ['scissors', 'rock']
    };
    return wins[player].includes(computer) ? 'player' : 'computer''
};

function updateScore(result) {
    if (result === 'player') {
        gameState.playerScore++;
        if (gameState.playerScore === 5) {
            endGame("Player");
        }
    } else if (result === 'computer') {
        gameState.computerScore++;
        if (gameState.computerScore === 5) {
            endGame("Computer");
        }
    } else {
        gameState.draws++;
    }
    updateScoreDisplay();
};