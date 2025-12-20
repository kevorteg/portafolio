let calcInput = "";

function renderCalculator() {
    const win = document.createElement('div');
    win.id = 'calculator-window';
    win.className = 'window';
    win.style.width = '280px';
    win.style.height = '380px';
    win.style.top = '100px';
    win.style.left = '300px';
    win.setAttribute('onmousedown', "focusApp('calculator')");

    win.innerHTML = `
        <div class="window-header" onmousedown="dragElement(this.parentElement)">
            <div class="traffic-lights">
                <div class="light light-close" onclick="closeApp('calculator')"><i class="fas fa-times"></i></div>
                <div class="light light-min" onclick="minimizeApp('calculator')"><i class="fas fa-minus"></i></div>
                <div class="light light-max" onclick="maximizeApp('calculator')"><i class="fas fa-expand"></i></div>
            </div>
        </div>
        <div class="calc-content">
            <div class="calc-display" id="calc-display">0</div>
            <div class="calc-grid">
                <button class="calc-btn btn-grey" onclick="calcCmd('C')">AC</button>
                <button class="calc-btn btn-grey" onclick="calcCmd('+/-')">+/-</button>
                <button class="calc-btn btn-grey" onclick="calcCmd('%')">%</button>
                <button class="calc-btn btn-orange" onclick="calcCmd('/')">÷</button>
                
                <button class="calc-btn" onclick="calcCmd('7')">7</button>
                <button class="calc-btn" onclick="calcCmd('8')">8</button>
                <button class="calc-btn" onclick="calcCmd('9')">9</button>
                <button class="calc-btn btn-orange" onclick="calcCmd('*')">×</button>
                
                <button class="calc-btn" onclick="calcCmd('4')">4</button>
                <button class="calc-btn" onclick="calcCmd('5')">5</button>
                <button class="calc-btn" onclick="calcCmd('6')">6</button>
                <button class="calc-btn btn-orange" onclick="calcCmd('-')">-</button>
                
                <button class="calc-btn" onclick="calcCmd('1')">1</button>
                <button class="calc-btn" onclick="calcCmd('2')">2</button>
                <button class="calc-btn" onclick="calcCmd('3')">3</button>
                <button class="calc-btn btn-orange" onclick="calcCmd('+')">+</button>
                
                <button class="calc-btn btn-zero" onclick="calcCmd('0')">0</button>
                <button class="calc-btn" onclick="calcCmd('.')">.</button>
                <button class="calc-btn btn-orange" onclick="calcCmd('=')">=</button>
            </div>
        </div>
    `;

    document.getElementById('windows-container').appendChild(win);
    dragElement(win.querySelector('.window-header'));
}

function calcCmd(cmd) {
    const display = document.getElementById('calc-display');

    if (cmd === 'C') {
        calcInput = "";
        display.innerText = "0";
        return;
    }

    if (cmd === '=') {
        try {
            // Safe eval using Function
            calcInput = new Function('return ' + calcInput)().toString();
            display.innerText = calcInput;
        } catch {
            display.innerText = "Error";
            calcInput = "";
        }
        return;
    }

    if (cmd === '+/-') { return; } // TODO
    if (cmd === '%') { calcInput += "/100"; }
    else if (['+', '-', '*', '/'].includes(cmd)) { calcInput += cmd; }
    else { calcInput += cmd; }

    display.innerText = calcInput;
}

function openCalculator() {
    if (!document.getElementById('calculator-window')) {
        renderCalculator();
    }
    openApp('calculator');
}
