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