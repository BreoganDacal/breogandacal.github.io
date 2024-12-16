const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const resetButton = document.getElementById('reset');

let currentPlayer = 'x';
let boardState = ['', '', '', '', '', '', '', '', ''];
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

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (boardState[index] !== '' || !isGameActive) {
        return;
    }

    boardState[index] = currentPlayer; // Actualiza el estado del tablero
    cell.classList.add(currentPlayer); // Agrega la clase correspondiente
    cell.textContent = currentPlayer === 'x' ? 'X' : 'O'; // Marca la celda con 'X' o 'O'
    checkResult();

    if (isGameActive) {
        setTimeout(() => {
            machineMove();
        }, 500); // Espera medio segundo antes de que la máquina haga su movimiento
    }
}

function machineMove() {
    let availableCells = boardState.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    if (availableCells.length > 0) {
        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        boardState[randomIndex] = 'o'; // La máquina juega como 'o'
        const cell = cells[randomIndex];
        cell.classList.add('o');
        cell.textContent = 'O';
        checkResult();
    }
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') {
            continue;
        }
        if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        alert(`Jugador ${currentPlayer.toUpperCase()} ha ganado!`);
        isGameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        alert('¡Es un empate!');
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
}

function resetGame() {
    currentPlayer = 'x';
    boardState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
