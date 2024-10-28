//your JS code here. If required.
let currentPlayer = 1;
let board = ['', '', '', '', '', '', '', '', ''];
let player1, player2;

document.getElementById('submit').addEventListener('click', () => {
    player1 = document.getElementById('player-1').value || 'Player 1';
    player2 = document.getElementById('player-2').value || 'Player 2';
    
    document.querySelector('.player-names').style.display = 'none';
    document.querySelector('.game').style.display = 'block';
    document.querySelector('.message').innerText = `${player1}, you're up!`;

    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });
});

function handleCellClick(index) {
    if (board[index] !== '') return; // Ignore already filled cells

    board[index] = currentPlayer === 1 ? 'X' : 'O';
    document.getElementById(index + 1).innerText = board[index];

    if (checkWin()) {
        document.querySelector('.message').innerText = `${currentPlayer === 1 ? player1 : player2}, congratulations you won!`;
        document.querySelectorAll('.cell').forEach(cell => cell.style.pointerEvents = 'none'); // Disable further clicks
    } else if (board.every(cell => cell)) {
        document.querySelector('.message').innerText = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        document.querySelector('.message').innerText = `${currentPlayer === 1 ? player1 : player2}, you're up!`;
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]            // diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}