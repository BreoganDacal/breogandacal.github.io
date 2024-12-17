let history = [];
let model;

console.log("TensorFlow.js cargado:", tf); // Verificar si TensorFlow.js se ha cargado correctamente

async function createModel() {
    model = tf.sequential();
    model.add(tf.layers.dense({units: 10, activation: 'relu', inputShape: [1]}));
    model.add(tf.layers.dense({units: 1}));
    model.compile({optimizer: 'adam', loss: 'meanSquaredError'});
    console.log("Modelo creado y compilado.");
}

// Función para entrenar el modelo
async function trainModel() {
    const xs = tf.tensor2d(history.map((num) => [num]));
    const ys = tf.tensor2d(history.map((num) => [num])); // Aquí se puede ajustar la lógica de salida
    await model.fit(xs, ys, {epochs: 100});
    console.log("Modelo entrenado con el historial actual.");
}

// Función para hacer predicciones
async function predictNextNumber() {
    const input = tf.tensor2d([history[history.length - 1]], [1, 1]);
    const prediction = model.predict(input);
    const predictedValue = prediction.dataSync()[0];
    return Math.round(predictedValue);
}

// Inicializar el modelo al cargar la página
createModel();

document.getElementById('numberForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const input = document.getElementById('numbers').value;
    const numbers = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    history.push(...numbers);
    console.log("Números agregados al historial:", numbers);
    await trainModel(); // Entrenar el modelo con el historial
    updateHistoryTable();
    const nextPrediction = await predictNextNumber(); // Predecir el siguiente número
    suggestBets(nextPrediction);
});

function updateHistoryTable() {
    const tableBody = document.getElementById('historyTableBody');
    const accumulatedHistoryDiv = document.getElementById('accumulatedHistory');
    
    tableBody.innerHTML = '';
    accumulatedHistoryDiv.innerHTML = history.length > 0 ? history.join(', ') : 'No hay números acumulados'; // Mostrar el historial acumulado
    const totalNumbers = history.length;

    const numberCounts = {};
    history.forEach(num => {
        numberCounts[num] = (numberCounts[num] || 0) + 1;
    });

    for (const [num, count] of Object.entries(numberCounts)) {
        const percentage = ((count / totalNumbers) * 100).toFixed(2);
        const probability = (count / totalNumbers).toFixed(2);
        const row = `<tr><td>${num}</td><td>${percentage}%</td><td>${probability}</td></tr>`;
        tableBody.innerHTML += row;
    }
}

function calculateBetProbabilities() {
    const betCounts = {
        red: 0,
        black: 0,
        even: 0,
        odd: 0,
        column1: 0,
        column2: 0,
        column3: 0
    };

    history.forEach(num => {
        if (num >= 1 && num <= 36) {
            // Rojo y Negro
            if ([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34].includes(num)) {
                betCounts.red++;
            } else {
                betCounts.black++;
            }

            // Par e Impar
            if (num % 2 === 0) {
                betCounts.even++;
            } else {
                betCounts.odd++;
            }

            // Columnas
            if (num % 12 === 1 || num % 12 === 2 || num % 12 === 3) {
                betCounts.column1++;
            } else if (num % 12 === 4 || num % 12 === 5 || num % 12 === 6) {
                betCounts.column2++;
            } else {
                betCounts.column3++;
            }
        }
    });

    return betCounts;
}

function suggestBets(predictedNumber) {
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';

    if (history.length > 0) {
        const betCounts = calculateBetProbabilities();
        const totalBets = history.length;

        suggestions.innerHTML += `<p>Probabilidad de apostar a Rojo: ${(betCounts.red / totalBets * 100).toFixed(2)}%</p>`;
        suggestions.innerHTML += `<p>Probabilidad de apostar a Negro: ${(betCounts.black / totalBets * 100).toFixed(2)}%</p>`;
        suggestions.innerHTML += `<p>Probabilidad de apostar a Par: ${(betCounts.even / totalBets * 100).toFixed(2)}%</p>`;
        suggestions.innerHTML += `<p>Probabilidad de apostar a Impar: ${(betCounts.odd / totalBets * 100).toFixed(2)}%</p>`;
        suggestions.innerHTML += `<p>Probabilidad de apostar a la Primera Columna: ${(betCounts.column1 / totalBets * 100).toFixed(2)}%</p>`;
        suggestions.innerHTML += `<p>Probabilidad de apostar a la Segunda Columna: ${(betCounts.column2 / totalBets * 100).toFixed(2)}%</p>`;
        suggestions.innerHTML += `<p>Probabilidad de apostar a la Tercera Columna: ${(betCounts.column3 / totalBets * 100).toFixed(2)}%</p>`;

        // Análisis de frecuencia
        const numberCounts = {};
        history.forEach(num => {
            numberCounts[num] = (numberCounts[num] || 0) + 1;
        });

        // Encontrar el número más frecuente
        const mostFrequentNumber = Object.keys(numberCounts).reduce((a, b) => numberCounts[a] > numberCounts[b] ? a : b);
        const leastFrequentNumbers = Object.keys(numberCounts).filter(num => numberCounts[num] === Math.min(...Object.values(numberCounts)));

        suggestions.innerHTML += `<p>Mejor apuesta simple: ${mostFrequentNumber}</p>`;
        suggestions.innerHTML += `<p>Números menos frecuentes: ${leastFrequentNumbers.join(', ')}</p>`;
        suggestions.innerHTML += `<p>Predicción del siguiente número: ${predictedNumber}</p>`;
        suggestions.innerHTML += `<p>Mejor apuesta compuesta: ${mostFrequentNumber + 1}, ${mostFrequentNumber - 1}</p>`;
    }
}
