document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submit");
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
    const nameInputSection = document.getElementById("name-input-section");
    const gameBoard = document.getElementById("game-board");
    const message = document.querySelector(".message");
    const cells = document.querySelectorAll(".cell");

    let player1Name = '';
    let player2Name = '';
    let currentPlayer = 'player1';
    let gameBoardState = Array(9).fill(null);  // Array to store board state

    // Submit Button Click Event
    submitButton.addEventListener('click', () => {
        player1Name = player1Input.value.trim();
        player2Name = player2Input.value.trim();

        if (player1Name && player2Name) {
            // Hide the name input section and show the game board
            nameInputSection.style.display = "none";  
            gameBoard.style.display = "block";       

            // Initialize the message to Player 1's turn
            message.textContent = `${player1Name}, you're up!`;
        } else {
            alert("Please enter names for both players.");
        }
    });

    // Cell Click Event
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const cellId = parseInt(cell.id) - 1;

            // If the cell is already filled or the game is over, do nothing
            if (gameBoardState[cellId] !== null || message.textContent.includes("congratulations")) return;

            // Mark the cell for the current player
            if (currentPlayer === 'player1') {
                cell.textContent = 'X';
                gameBoardState[cellId] = 'X';
                message.textContent = `${player2Name}, you're up!`;
                currentPlayer = 'player2';
            } else {
                cell.textContent = 'O';
                gameBoardState[cellId] = 'O';
                message.textContent = `${player1Name}, you're up!`;
                currentPlayer = 'player1';
            }

            // Check for a winner after each move
            checkWinner();
        });
    });

    // Function to Check for a Winner
    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameBoardState[a] && gameBoardState[a] === gameBoardState[b] && gameBoardState[a] === gameBoardState[c]) {
                // Winner found
                const winner = gameBoardState[a] === 'X' ? player1Name : player2Name;
                message.textContent = `${winner}, congratulations you won!`;
                return;
            }
        }

        // Check for a draw (no empty cells left)
        if (!gameBoardState.includes(null)) {
            message.textContent = "It's a draw!";
        }
    }
});
