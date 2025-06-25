const button = document.getElementById("strtGame");
const playerform = document.getElementById("playerform");
const board = document.getElementById("board");
const messageDiv = document.querySelector(".boardmsg");
let currentPlayer = "X";
let player1name = "";
let player2name = "";
let boardstate = Array(9).fill("");

button.addEventListener("click", () => {
    player1name = document.getElementById("player-1").value.trim();
    player2name = document.getElementById("player-2").value.trim();

    if (player1name === "" || player2name === "") {
        alert("Enter both players' names");
        return;
    }

    playerform.style.display = "none";
    document.getElementById("Gamecontainer").style.display = "block";

    messageDiv.textContent = `${player1name}, you're up!`;
    renderBoard();
});

function renderBoard() {
    board.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);
        cell.addEventListener("click", () => {
            if (cell.textContent !== "") return;

            const currentName = currentPlayer === "X" ? player1name : player2name;
            cell.textContent = currentPlayer;
            boardstate[i] = currentPlayer;

            if (checkWin()) {
                messageDiv.textContent = `${currentName}, congratulations you won!`;
                disableBoard();
                return;
            }

            if (boardstate.every(cell => cell !== "")) {
                messageDiv.textContent = "It's a draw!";
                disableBoard();
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";
            const nextName = currentPlayer === "X" ? player1name : player2name;
            messageDiv.textContent = `${nextName}, you're up!`;
        });

        board.appendChild(cell);
    }
}

function checkWin() {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
        [0, 4, 8], [2, 4, 6]            // diagonals
    ];

    return winCombos.some(combo => {
        const [a, b, c] = combo;
        return boardstate[a] &&
               boardstate[a] === boardstate[b] &&
               boardstate[a] === boardstate[c];
    });
}

function disableBoard() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.style.pointerEvents = "none");
}