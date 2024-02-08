document.addEventListener("DOMContentLoaded", function () {
    let secretNumber, guessCount, startTime, timerInterval;

    function generateRandomNumber() {
        return Math.floor(Math.random() * 10) + 1;
    }

    function resetGame() {
        secretNumber = generateRandomNumber();
        guessCount = 0;
        startTime = Date.now();
        updateTimer();
        document.getElementById('userGuess').value = '';
        document.getElementById('feedback').innerHTML = '';
        document.getElementById('feedback').classList.remove('correct');
        document.getElementById('guessCountValue').textContent = '0';
        document.getElementById('userGuess').disabled = false;
        document.getElementById('submitGuessButton').disabled = false;
    }

    function checkGuess() {
        const userGuess = parseInt(document.getElementById('userGuess').value);
        guessCount++;

        if (userGuess === secretNumber) {
            document.getElementById('feedback').innerHTML = `Congratulations! You guessed the correct number in ${guessCount} guesses.`;
            document.getElementById('feedback').classList.add('correct');
            disableInput();
            updateHighScore();
            clearInterval(timerInterval);
        } else if (userGuess < secretNumber) {
            document.getElementById('feedback').innerHTML = 'Too low! Try a higher number.';
        } else {
            document.getElementById('feedback').innerHTML = 'Too high! Try a lower number.';
        }

        document.getElementById('guessCountValue').textContent = guessCount;
    }

    function disableInput() {
        document.getElementById('userGuess').disabled = true;
        document.getElementById('submitGuessButton').disabled = true;
    }

    function startTimer() {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 100);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function updateTimer() {
        const elapsedTime = (Date.now() - startTime) / 1000; // in seconds
        document.getElementById('timer').textContent = `Time: ${elapsedTime.toFixed(2)}s`;
    }

    function updateHighScore() {
        const currentScore = parseInt(document.getElementById('guessCountValue').textContent);
        const highScore = parseInt(localStorage.getItem('highScore')) || Infinity;

        if (currentScore < highScore) {
            localStorage.setItem('highScore', currentScore);
            document.getElementById('highScoreValue').textContent = currentScore;
        }
    }

    // Display initial high score on page load
    document.getElementById('highScoreValue').textContent = localStorage.getItem('highScore') || 'N/A';

    document.getElementById('resetButton').addEventListener('click', resetGame);
    document.getElementById('submitGuessButton').addEventListener('click', function() {
        if (guessCount === 0) {
            startTimer();
        }
        checkGuess();
    });

    resetGame(); // Initial game setup
});
