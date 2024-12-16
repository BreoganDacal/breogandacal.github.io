let balance = 20;
let winnings = 0;
let losses = 0;

document.getElementById('spinButton').addEventListener('click', () => {
    if (balance < 2) {
        alert('No tienes suficientes créditos para jugar.');
        return;
    }

    balance -= 2;
    document.getElementById('balance').textContent = balance;

    const result = spinReels();
    document.getElementById('result').textContent = `Resultado: ${result.join(' | ')}`;

    const payout = calculatePayout(result);
    if (payout > 0) {
        winnings += payout;
        document.getElementById('winnings').textContent = winnings;
        alert('¡Ganaste ' + payout + ' créditos!');
    } else {
        losses += 2;
        document.getElementById('losses').textContent = losses;
        alert('Perdiste. Intenta de nuevo.');
    }
});

function spinReels() {
    const symbols = ['🍒', '🍋', '🍊', '🍉', '⭐'];
    return [symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)]];
}

function calculatePayout(result) {
    const uniqueSymbols = new Set(result);
    if (uniqueSymbols.size === 1) {
        return 10; // Ganancia por tres iguales
    } else if (uniqueSymbols.size === 2) {
        return 5; // Ganancia por dos iguales
    }
    return 0; // Sin ganancia
}
