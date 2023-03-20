let runningTotal = 0;
let buffer = "0";
let antesOperador;

const screen = document.querySelector('.screen');

function buttonClick(valor) {
    if (isNaN(valor)) {
        handleSymbol(valor);
    } else {
        handleNumber(valor);
    }
    screen.innerText = buffer;
}

function handleSymbol(simbolo) {
    switch (simbolo) {
        case 'C':
            buffer = '0'
            runningTotal = 0;
            break;
        case '=':
            if (antesOperador === null) {
                return
            }
            flushOperation(parseInt(buffer));
            antesOperador = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(simbolo);
            break;
    }
}

function handleMath(simbolo) {
    if (buffer === '0') {
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    antesOperador = simbolo;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (antesOperador === '+') {
        runningTotal += intBuffer;
    } else if (antesOperador === '-') {
        runningTotal -= intBuffer;
    } else if (antesOperador === '×') {
        runningTotal *= intBuffer;
    } else if (antesOperador === '÷') {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numString) {
    if (buffer === "0") {
        buffer = numString;
    } else {
        buffer += numString;
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        buttonClick(event.currentTarget.innerText);
    })
}

init();