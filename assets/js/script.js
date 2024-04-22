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