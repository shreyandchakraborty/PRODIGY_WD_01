
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('resetButton');
    const messageElement = document.getElementById('message');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let isGameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const displayMessage = (message) => {
        messageElement.textContent = message;
    }

    const handleCellClick = (event) => {
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute('data-index'));

        if (board[cellIndex] || !isGameActive) {
            return;
        }

        board[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(`player${currentPlayer}`);
        cell.style.pointerEvents = 'none';

        if (checkWin()) {
            displayMessage(`${currentPlayer} wins!`);
            isGameActive = false;
            highlightWinningCells();
            return;
        }

        if (board.every(cell => cell)) {
            displayMessage('Draw!');
            isGameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        displayMessage(`Player ${currentPlayer}'s turn`);
    }

    const checkWin = () => {
        return winningConditions.some(condition => {
            if (condition.every(index => board[index] === currentPlayer)) {
                winningCells = condition;
                return true;
            }
            return false;
        });
    }

    let winningCells = [];
    const highlightWinningCells = () => {
        winningCells.forEach(index => {
            cells[index].style.backgroundColor = '#2ecc71';
        });
    }

    const resetGame = () => {
        board.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('playerX', 'playerO');
            cell.style.backgroundColor = '#ecf0f1';
            cell.style.pointerEvents = 'auto';
        });
        currentPlayer = 'X';
        isGameActive = true;
        displayMessage(`Player ${currentPlayer}'s turn`);
        winningCells = [];
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);

    displayMessage(`Player ${currentPlayer}'s turn`);
});
