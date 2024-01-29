document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const playerXScoreElement = document.getElementById('playerXScore');
    const playerOScoreElement = document.getElementById('playerOScore');
    const resetButton = document.getElementById('reset-button');

    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let playerXScore = 0;
    let playerOScore = 0;
    function createBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }
    function handleCellClick(event) {
        const clickedCellIndex = event.target.getAttribute('data-index');

        if (boardState[clickedCellIndex] === '' && gameActive) {
            boardState[clickedCellIndex] = currentPlayer;
            event.target.textContent = currentPlayer;

            if (checkForWinner()) {
                alert(`Player ${currentPlayer} wins!`);
                updateScore();
                resetGame();
            } else if (boardState.every(cell => cell !== '')) {
                alert('It\'s a tie!');
                resetGame();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }
    function checkForWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.some(pattern =>
            pattern.every(index => boardState[index] === currentPlayer)
        );
    }
    function updateScore() {
        if (currentPlayer === 'X') {
            playerXScore++;
            playerXScoreElement.textContent = playerXScore;
        } else {
            playerOScore++;
            playerOScoreElement.textContent = playerOScore;
        }
    }
    function resetGame() {
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
        });
    }
    resetButton.addEventListener('click', resetGame);
    createBoard();
});
