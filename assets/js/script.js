// Event listener to ensure DOM is loaded before initialising game.
document.addEventListener('DOMContentLoaded', function() {
    let gameState = {
        playerScore: 0,
        computerScore: 0,
        draws: 0,
        gameMode: null,
        username: 'Player'
    }; 

    // Sets the game choices available in each mode.
    let choicesConfig = {
        classic: ['rock', 'paper', 'scissors'],
        spock: ['rock', 'paper', 'scissors', 'lizard', 'spock']
    };
 

    // Sets the game up based on the mode the user selects 
    window.setupGame = function(mode) {
        gameState.gameMode = mode;
        document.getElementById('selectionScreen').classList.add('hidden');
        document.getElementById('usernameScreen').classList.remove('hidden');
    };

    // Allows for username submission and hides the username screen
    window.enterUsername = function() {
        let usernameInput = document.getElementById('usernameInput');
        gameState.username = usernameInput.value.trim() || "Player";
        document.getElementById('usernameScreen').classList.add('hidden');
        document.getElementById('gamePlayArea').classList.remove('hidden');
        updateGreeting();
        populateChoices(gameState.gameMode);
    };

    // Function to allow the user to return to the game mode selection screen.
    window.returnToGameSelection = function() {
        document.getElementById('usernameScreen').classList.add('hidden');
        document.getElementById('selectionScreen').classList.remove('hidden');
    };

    // Function to allow the user to navigate back to the main home screen.
    window.returnToHome = function() {
        document.getElementById('gamePlayArea').classList.add('hidden');
        document.getElementById('selectionScreen').classList.remove('hidden');
    };

    // Function to allow user to reset the game scores.
    window.resetGame = function() {
        gameState.playerScore = 0;
        gameState.computerScore = 0;
        gameState.draws = 0;
        updateScoreDisplay();
        let buttons = document.querySelectorAll('#choices button');
        buttons.forEach(button => button.disabled = false);
        document.getElementById('result').textContent = '';
        document.getElementById('gameEndModal').style.display = 'none';
        populateChoices(gameState.gameMode);
    };

    // Created the choice buttons.
    function populateChoices(mode) {
        let choicesContainer = document.getElementById('choices');
        choicesContainer.innerHTML = '';
        choicesConfig[mode].forEach(choice => {
            let button = document.createElement('button');
            button.textContent = choice.charAt(0).toUpperCase() + choice.slice(1);
            button.addEventListener('click', function() { playRound(choice); });
            choicesContainer.appendChild(button);
        });
    };

    // Simulates a game round and calculates result
    function playRound(playerSelection) {
        let computerSelection = computerPlay();
        let result = determineWinner(playerSelection, computerSelection);
        updateScore(result);
        displayResults(playerSelection, computerSelection, result);
    };

    // Selects a random choice for the computer.
    function computerPlay() {
        let choices = choicesConfig[gameState.gameMode];
        return choices[Math.floor(Math.random() * choices.length)];
    };

    // Determines the winner of the round using the game rules.
    function determineWinner(player, computer) {
        if (player === computer) {
            return 'draw';
        }
        let wins = {
            rock: ['scissors', 'lizard'],
            paper: ['rock', 'spock'],
            scissors: ['paper', 'lizard'],
            lizard: ['spock', 'paper'],
            spock: ['scissors', 'rock']
        };
        return wins[player].includes(computer) ? 'player' : 'computer';
    };

    // Updates the results of the game and checks if winning conditions have been met.
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


    // Updates the user interface to the current scores.
    function updateScoreDisplay() {
        document.getElementById('score').textContent = `Player: ${gameState.playerScore}, Computer: ${gameState.computerScore}, Draws: ${gameState.draws}`;
    };

    // Displays the winner.
    function displayResults(player, computer, result) {
        let message = `You chose ${player}, Computer chose ${computer}. ` +
                        (result === 'draw' ? "It's a draw!" :
                         result === 'player' ? "You win!" : "Computer wins!");
        document.getElementById('result').textContent = message;
    };

    // Displays the final winner and disables any more input.
    function endGame(winner) {
        let gameEndMessage = document.getElementById('gameEndMessage');
        gameEndMessage.textContent = `${winner} wins the match! Congratulations!`;
        document.getElementById('gameEndModal').style.display = 'block';
        let buttons = document.querySelectorAll('#choices button');
        buttons.forEach(button => button.disabled = true);
    };

    // Greeting message updates based on the users input.
    function updateGreeting() {
        document.getElementById('greeting').textContent = `Hello, ${gameState.username}! Choose your move:`;
    };

    // Close the modal when the x button is clicked
    window.closeModal = function() {
        document.getElementById('rulesModal').style.display = 'none';
    };

    window.closeGameEndModal = function() {
        document.getElementById('gameEndModal').style.display = 'none';
    };

    
    let rulesModal = document.getElementById('rulesModal');
    let showRulesBtn = document.getElementById('showRulesBtn');
    let closeModalButton = document.querySelector('.modal .close');

    showRulesBtn.addEventListener('click', function() {
        rulesModal.style.display = 'block'; // Open the modal
    });

    closeModalButton.addEventListener('click', function() {
        closeModal(); // Close the modal
    });
});