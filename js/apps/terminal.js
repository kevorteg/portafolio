const termData = {
    history: [],
    historyIndex: -1,
    commands: {
        help: "Comandos Disponibles:<br>- about: Sobre mí<br>- skills: Habilidades<br>- projects: Mis Proyectos<br>- contact: Contacto<br>- matrix: ???<br>- hack: Simular hackeo<br>- clear: Limpiar terminal<br>- date: Fecha actual<br>- whoami: Usuario actual",
        about: "Soy Kevin Ortega, desarrollador full-stack creativo.",
        skills: "JS, Python, React, Node, SQL, AWS.",
        projects: "Mis repos: https://github.com/kevorteg",
        contact: "Usa la app Mail o revisa mi GitHub.",
        date: new Date().toString(),
        whoami: "guest@kevinos",
        sudo: "Permiso denegado: no eres admin (aun).",
        clear: "CLEAR_ACTION",
        matrix: "MATRIX_ACTION",
        hack: "HACK_ACTION"
    }
};

function initTerminal() {
    // Retry if DOM not ready
    const input = document.getElementById('terminal-input');
    if (!input) {
        setTimeout(initTerminal, 500);
        return;
    }

    // Remove old listeners to avoid dupes
    const content = input.parentElement;
    const newContent = content.cloneNode(true);
    content.parentNode.replaceChild(newContent, content);

    // Re-select
    const freshInput = document.getElementById('terminal-input');

    freshInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const val = this.value.trim();
            if (val === '') return;

            // Historial
            termData.history.push(val);
            termData.historyIndex = termData.history.length;

            const log = document.getElementById('terminal-log');
            log.innerHTML += `<div class="mb-1"><span class="text-blue-400 font-bold">kevin@mac ~ %</span> <span class="text-white">${val}</span></div>`;

            // Process
            const cmd = val.toLowerCase().split(' ')[0];
            if (termData.commands[cmd]) {
                const action = termData.commands[cmd];
                if (action === 'CLEAR_ACTION') {
                    log.innerHTML = '';
                } else if (action === 'MATRIX_ACTION') {
                    startMatrixEffect();
                    log.innerHTML += `<div class="mb-4 text-green-400">Entrando a la matrix...</div>`;
                } else if (action === 'HACK_ACTION') {
                    simulateHack(log);
                } else {
                    log.innerHTML += `<div class="mb-4 text-green-400 opacity-90">${action}</div>`;
                }
            } else {
                log.innerHTML += `<div class="mb-4 text-red-400">command not found: ${cmd}</div>`;
            }

            this.value = '';
            document.getElementById('terminal-output').scrollTop = document.getElementById('terminal-output').scrollHeight;
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (termData.historyIndex > 0) {
                termData.historyIndex--;
                this.value = termData.history[termData.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (termData.historyIndex < termData.history.length - 1) {
                termData.historyIndex++;
                this.value = termData.history[termData.historyIndex];
            } else {
                this.value = '';
                termData.historyIndex = termData.history.length;
            }
        }
    });
}

function startMatrixEffect() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.style.display = 'block';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }

    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };

    const interval = setInterval(draw, 30);

    // Stop after 5 seconds
    setTimeout(() => {
        clearInterval(interval);
        canvas.style.display = 'none';
    }, 5000);
}

function simulateHack(logElement) {
    const steps = [
        "Iniciando ataque de fuerza bruta...",
        "Bypassing firewall...",
        "Accediendo al mainframe...",
        "Descifrando contraseñas...",
        "Descargando datos confidenciales...",
        "Eliminando rastros...",
        "¡ACCESO CONCEDIDO! 🔓"
    ];

    let i = 0;
    const interval = setInterval(() => {
        if (i < steps.length) {
            logElement.innerHTML += `<div class="text-green-500 font-mono text-xs">> ${steps[i]}</div>`;
            document.getElementById('terminal-output').scrollTop = document.getElementById('terminal-output').scrollHeight;
            i++;
        } else {
            clearInterval(interval);
        }
    }, 800);
}
