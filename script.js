particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 6, direction: "none", random: false }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

let runningTotal = 0
let buffer = "0";
let previousOperator

const screen = document.querySelector(".screen");

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
        buffer = '0';
        runningTotal = 0;
        break;
        case '=':
        if(previousOperator === null){
            return
        }
        flushOperation(parseInt(buffer));
        previousOperator = null;
        buffer = runningTotal;
        runningTotal = 0;
        break;
        case '←':
        if(buffer.length ===1){
            buffer = '0';
        }else{
            buffer = buffer.toString(0, buffer.length-1);
        }
        break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}


function handleMath(symbol){
    if(buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);
    if(runningTotal === 0){
        runningTotal = intBuffer
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

    function flushOperation(intBuffer){
        if(previousOperator === '+'){
            runningTotal += intBuffer;
        }else if(previousOperator === "−"){
            runningTotal -= intBuffer;
        }else if (previousOperator === '×'){
            runningTotal *= intBuffer;
        }else if(previousOperator === '÷'){
            runningTotal /= intBuffer;
        }
    }

    function handleNumber(numberString){
        if(buffer === "0"){
            buffer = numberString;
        }else{
            buffer +=numberString;
        }
    }
    function init(){
        document.querySelector('.calc-buttons').addEventListener('click', function(event){
            buttonClick(event.target.innerText);
        })
    }

    init();