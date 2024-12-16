const tossButton = document.getElementById('tossButton');
const resultDisplay = document.getElementById('result');
const headsCountDisplay = document.getElementById('headsCount');
const tailsCountDisplay = document.getElementById('tailsCount');
const correctCountDisplay = document.getElementById('correctCount');
const alertContainer = document.getElementById('alertContainer');

let headsCount = 0;
let tailsCount = 0;
let correctCount = 0;

tossButton.addEventListener('click', () => {
    const userChoice = document.querySelector('input[name="choice"]:checked').value;
    const result = Math.random() < 0.5 ? 'cara' : 'cruz';
    resultDisplay.textContent = `Resultado: ${result}`;
    
    if (result === 'cara') {
        headsCount++;
        headsCountDisplay.textContent = headsCount;
    } else {
        tailsCount++;
        tailsCountDisplay.textContent = tailsCount;
    }

    if (userChoice === result) {
        correctCount++;
        correctCountDisplay.textContent = correctCount;
        showAlert('¡Ganaste!', 'success');
    } else {
        showAlert('Perdiste. Intenta de nuevo.', 'danger');
    }

    animateResult(result);
});

function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alertContainer.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function animateResult(result) {
    const animationClass = result === 'cara' ? 'win-animation' : 'lose-animation';
    resultDisplay.classList.add(animationClass);
    setTimeout(() => {
        resultDisplay.classList.remove(animationClass);
    }, 1000);
}
