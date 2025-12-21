const termData = {
    history: [],
    historyIndex: -1,
    commands: {
        help: "Comandos Disponibles:<br>📂 SISTEMA (Admin):<br>- ls: Listar archivos<br>- hackme: Diagnóstico Seguridad<br>- thanos: Optimizar Caché<br>- destroy: Check Disk<br>- hack: Test de Red<br>- cat: System Logs<br>- party: Config. Pantalla<br><br>ℹ️ INFO:<br>- about: Sobre mí<br>- skills: Habilidades<br>- projects: Proyectos<br>- contact: Contacto<br>- social: Redes<br>- clear: Limpiar",
        about: "Kevin Ortega. Creativo digital, Investigador & Desarrollador. 📍 Colombia.",
        skills: "HTML, CSS, JS, Python, Diseño, Branding, Estrategia Digital.",
        projects: "KRE-ACTIVA, Misión Juvenil, Proyectos Independientes. Usa el comando 'open preview' para ver detalles.",
        contact: "📧 milife.ortega2000@gmail.com | 📱 315 049 9783",
        date: new Date().toString(),
        whoami: "guest@kevinos",
        sudo: "root: Permiso denegado. Intenta decir 'por favor' (mentira, no funciona).",
        clear: "CLEAR_ACTION",
        matrix: "MATRIX_ACTION",
        hack: "HACK_ACTION",
        delete: "THANOS_ACTION",
        thanos: "THANOS_ACTION",
        joke: "JOKE_ACTION",
        reboot: "REBOOT_ACTION",
        socials: "SOCIALS_ACTION",
        coffee: "COFFEE_ACTION",
        coinflip: "COIN_ACTION",
        party: "PARTY_ACTION",
        clippy: "CLIPPY_ACTION",
        weather: "WEATHER_ACTION",
        cat: "CAT_ACTION",
        fortune: "FORTUNE_ACTION",
        echo: "ECHO_ACTION",
        shutdown: "SHUTDOWN_ACTION",
        destroy: "DESTROY_ACTION",
        love: "LOVE_ACTION",
        linux: "LINUX_ACTION",
        ping: "PING_ACTION",
        hackme: "HACKME_ACTION",
        ls: "RICK_ACTION",
        dir: "DIR_ACTION",
        touch: "TOUCH_ACTION",
        mkdir: "MKDIR_ACTION",
        rm: "RM_ACTION"
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
            const parts = val.split(' ');
            const cmd = parts[0].toLowerCase();
            const args = parts.slice(1).join(' ');

            if (termData.commands[cmd] || cmd === 'echo') {
                const action = termData.commands[cmd] || (cmd === 'echo' ? 'ECHO_ACTION' : null);

                if (action === 'CLEAR_ACTION') {
                    log.innerHTML = '';
                } else if (action === 'MATRIX_ACTION') {
                    startMatrixEffect();
                    log.innerHTML += `<div class="mb-4 text-green-400">Entrando a la matrix...</div>`;
                } else if (action === 'HACK_ACTION') {
                    simulateHack(log);
                } else if (action === 'THANOS_ACTION') {
                    triggerThanosSnap(log);
                } else if (action === 'REBOOT_ACTION') {
                    log.innerHTML += `<div class="mb-4 text-yellow-400">Reiniciando sistema...</div>`;
                    setTimeout(() => window.location.reload(), 1500);
                } else if (action === 'JOKE_ACTION') {
                    const jokes = [
                        "¿Por qué los programadores prefieren el modo oscuro? Porque la luz atrae a los bugs.",
                        "¡Toc, toc! ¿Quién es? (pausa muy larga)... Java.",
                        "¿Cuántos programadores se necesitan para cambiar una bombilla? Ninguno, es un problema de hardware.",
                        "Un SQL entra a un bar, se acerca a dos mesas y pregunta: '¿Puedo unirme (JOIN)?'",
                        "Hay 10 tipos de personas en el mundo: las que entienden binario y las que no.",
                        "¿Qué es un terapeuta? 1024 gigapeutas."
                    ];
                    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
                    log.innerHTML += `<div class="mb-4 text-cyan-300">"${randomJoke}"</div>`;
                } else if (action === 'SOCIALS_ACTION') {
                    log.innerHTML += `
                            <div class="mb-4 flex flex-col cursor-pointer">
                                <span onclick="window.open('https://github.com/kevorteg')" class="text-blue-400 hover:underline">GitHub</span>
                                <span class="text-purple-400">📧 milife.ortega2000@gmail.com</span>
                                <span class="text-gray-500">📱 315 049 9783</span>
                            </div>
                        `;
                } else if (action === 'COFFEE_ACTION') {
                    log.innerHTML += `
                        <div class="mb-4 text-yellow-500 font-mono whitespace-pre text-xs">
        (  )   (   )  )
        ) (   )  (  (
        ( )  (    ) )
        _____________
        <_____________> ___
        |             |/ _ \\
        |  COFFEE     | | | |
        |   IS LIFE   | |_| |
        |             |\\___/
        \\_____________/[OS]
                        </div>`;
                } else if (action === 'COIN_ACTION') {
                    const result = Math.random() < 0.5 ? "🪙 CARA" : "🪙 CRUZ";
                    log.innerHTML += `<div class="mb-4 text-yellow-300 font-bold text-lg">${result}</div>`;
                } else if (action === 'CLIPPY_ACTION') {
                    log.innerHTML += `
                        <div class="mb-4 text-gray-300 font-mono whitespace-pre text-xs">
    __________________
    /                  \\
    | Parece que estas  |
    | buscando un buen  |
    | desarrollador.    |
    | ¿Necesitas ayuda? |
    \\__________________/
        \\
        \\
            __
            /  \\
            |  |
            |  |
            @  @
            || ||
            || ||
            |\\_/|
            \\___/
                        </div>`;
                } else if (action === 'PARTY_ACTION') {
                    log.innerHTML += `<div class="mb-4 text-2xl animate-pulse">🎉✨ FIESTA INICIADA ✨🎉</div>`;
                    triggerFireworks(log);
                } else if (action === 'WEATHER_ACTION') {
                    const weathers = [
                        "☀️ 25°C - Soleado con probabilidad de código limpio.",
                        "🌧️ 18°C - Lluvia de bugs en producción.",
                        "🌩️ 15°C - Tormenta de reuniones inútiles.",
                        "🌪️ 10°C - Vientos fuertes de Deadline.",
                        "☁️ 20°C - Nublado, como mi entendimiento de Kubernetes."
                    ];
                    const randomWeather = weathers[Math.floor(Math.random() * weathers.length)];
                    log.innerHTML += `<div class="mb-4 text-blue-300">${randomWeather}</div>`;
                } else if (action === 'DIR_ACTION') {
                    const files = window.FileSystem.listFiles();
                    if (files.length === 0) {
                        log.innerHTML += `<div class="mb-4 text-gray-500">Directorio vacío.</div>`;
                    } else {
                        let output = '<div class="mb-4 text-white grid grid-cols-3 gap-4">';
                        files.forEach(f => {
                            const color = f.type === 'dir' ? 'text-blue-400 font-bold' : 'text-gray-300';
                            const icon = f.type === 'dir' ? '📁' : '📄';
                            output += `<div class="${color}">${icon} ${f.name}</div>`;
                        });
                        output += '</div>';
                        log.innerHTML += output;
                    }
                } else if (action === 'TOUCH_ACTION') {
                    if (!args) {
                        log.innerHTML += `<div class="mb-4 text-red-400">Uso: touch &lt;archivo&gt;</div>`;
                    } else {
                        const success = window.FileSystem.createFile(args);
                        if (success) log.innerHTML += `<div class="mb-4 text-green-400">Archivo '${args}' creado.</div>`;
                        else log.innerHTML += `<div class="mb-4 text-red-400">Error: El archivo ya existe.</div>`;
                    }
                } else if (action === 'MKDIR_ACTION') {
                    if (!args) {
                        log.innerHTML += `<div class="mb-4 text-red-400">Uso: mkdir &lt;carpeta&gt;</div>`;
                    } else {
                        const success = window.FileSystem.createFolder(args);
                        if (success) log.innerHTML += `<div class="mb-4 text-green-400">Directorio '${args}' creado.</div>`;
                        else log.innerHTML += `<div class="mb-4 text-red-400">Error: El directorio ya existe.</div>`;
                    }
                } else if (action === 'RM_ACTION') {
                    if (args.includes('-rf') && (args.includes('/') || args.includes('*'))) {
                        triggerSelfDestruct(log);
                    } else if (args) {
                        const item = args.split(' ')[0]; // Simple logic
                        const success = window.FileSystem.deleteItem(item);
                        if (success) log.innerHTML += `<div class="mb-4 text-yellow-400">Item '${item}' eliminado.</div>`;
                        else log.innerHTML += `<div class="mb-4 text-red-400">Error: No encontrado.</div>`;
                    } else {
                        log.innerHTML += `<div class="mb-4 text-red-400">Uso: rm &lt;archivo/carpeta&gt;</div>`;
                    }
                } else if (action === 'CAT_ACTION') {
                    if (args) {
                        // Real File Reading
                        const content = window.FileSystem.readFile(args);
                        if (content !== null) {
                            log.innerHTML += `<div class="mb-4 text-white whitespace-pre-wrap">${content}</div>`;
                        } else {
                            log.innerHTML += `<div class="mb-4 text-red-400">Error: Archivo no encontrado o es un directorio.</div>`;
                        }
                    } else {
                        // Original Funny Cat 
                        const cats = [
                            `
      |\\__/,|   (\`\\
    _.|o o  |_   ) )
-(((---(((----------------`,
                            `
      |\\      _,,,---,,_
ZZZzz /, \`.-'\`'    -.  ;-;;,_
     |,4-  ) )-,_. ,\\ (  \`'-'
    '---''(_/--'  \`-'\\_)`,
                            `
    /\\_/\\
   ( o.o )
    > ^ <`
                        ];
                        const randomCat = cats[Math.floor(Math.random() * cats.length)];
                        log.innerHTML += `<div class="mb-4 text-gray-300 font-mono whitespace-pre text-xs">${randomCat}</div>`;
                    }
                } else if (action === 'FORTUNE_ACTION') {
                    const fortunes = [
                        "🔮 Tendrás un merge conflict hoy.",
                        "🔮 Tu código compilará a la primera (mentira).",
                        "🔮 Alguien borrará la base de datos de producción.",
                        "🔮 Descubrirás una librería nueva que olvidarás mañana.",
                        "🔮 La respuesta está en Stack Overflow."
                    ];
                    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
                    log.innerHTML += `<div class="mb-4 text-purple-400 italic">${randomFortune}</div>`;
                } else if (action === 'ECHO_ACTION') {
                    log.innerHTML += `<div class="mb-4 text-white">${args || "Escribe algo para repetir... (ej: echo hola)"}</div>`;
                } else if (action === 'SHUTDOWN_ACTION') {
                    const cover = document.createElement('div');
                    cover.className = 'fixed inset-0 bg-black z-[100000] flex items-center justify-center cursor-pointer';
                    cover.innerHTML = '<div class="text-gray-800 text-xs text-center">System Halted.<br>(Click to restart)</div>';
                    cover.onclick = () => cover.remove();
                    document.body.appendChild(cover);
                } else if (action === 'DESTROY_ACTION') {
                    triggerSelfDestruct(log);
                } else if (action === 'LOVE_ACTION') {
                    log.innerHTML += `<div class="mb-4 text-pink-500">❤️ sending love to kevin... done.</div>`;
                } else if (action === 'LINUX_ACTION') {
                    log.innerHTML += `<div class="mb-4 text-white">I'd just like to interject for a moment. What you're referring to as Linux, is in fact, GNU/Linux...</div>`;
                } else if (action === 'PING_ACTION') {
                    log.innerHTML += `<div class="mb-4 text-white">pong! time=0.00ms</div>`;
                } else if (action === 'HACKME_ACTION') {
                    triggerHackMeEffect(log);
                } else if (action === 'RICK_ACTION') {
                    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
                    log.innerHTML += `<div class="mb-4 text-pink-500">🕺 Never gonna give you up...</div>`;
                } else {
                    log.innerHTML += `<div class="mb-4 text-green-400 opacity-90">${action}</div>`;
                }
            } else {
                log.innerHTML += `<div class="mb-2 text-red-400">Comando no encontrado: "${cmd}"</div>`;
                log.innerHTML += `<div class="mb-4 text-white">${termData.commands.help}</div>`;
            }

            this.value = '';
            // Auto scroll
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
                termData.historyIndex = termData.history.length;
                this.value = '';
            }
        }
    });
}

function triggerSelfDestruct(log) {
    const messages = [
        "WARNING: ROOT PRIVILEGES DETECTED.",
        "CRITICAL: DELETING SYSTEM32...",
        "DELETING USER DATA...",
        "DELETING KEVIN...",
        "KERNEL PANIC: 0xDEADBEEF"
    ];

    let delay = 0;
    messages.forEach((msg, i) => {
        setTimeout(() => {
            log.innerHTML += `< div class= "mb-1 text-red-600 font-bold font-mono uppercase bg-black/50 p-1" > ${msg}</div > `;
            document.getElementById('terminal-output').scrollTop = document.getElementById('terminal-output').scrollHeight;
        }, delay);
        delay += 800;
    });

    setTimeout(() => {
        const body = document.body;
        body.style.transition = "all 2s ease-in-out";
        body.style.filter = "invert(1) hue-rotate(180deg) blur(2px)";
        body.style.transform = "scale(0.9) rotate(5deg)";
    }, 2000);

    setTimeout(() => {
        document.body.innerHTML = `
    < div style = "height:100vh; background:black; color:#0f0; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:monospace; padding-top:20vh;" >
                <h1 style="font-size:4rem; color:red;">SYSTEM FAILURE</h1>
                <p>Todo ha sido eliminado.</p>
                <p style="margin-top:2rem; color:white;">Es broma. 🤡</p>
                <button onclick="location.reload()" style="margin-top:20px; padding:10px 20px; background:#333; color:white; border:1px solid #555; cursor:pointer;">RESTAURAR SISTEMA</button>
            </div >
        `;
    }, 5000);
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

function triggerFireworks(log) {
    // Flash effect
    const flash = document.createElement('div');
    flash.className = 'fixed inset-0 bg-white z-[9999] opacity-0 pointer-events-none';
    flash.style.transition = 'opacity 0.1s';
    document.body.appendChild(flash);

    // Beat flash loop
    let flashes = 0;
    const beat = setInterval(() => {
        flash.style.opacity = '0.2';
        setTimeout(() => flash.style.opacity = '0', 50);
        flashes++;
        if (flashes > 20) { clearInterval(beat); flash.remove(); }
    }, 468); // ~128 BPM

    // Canvas Fireworks
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '999998';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    function createExplosion(x, y, color) {
        for (let i = 0; i < 30; i++) {
            particles.push({
                x: x, y: y,
                dx: (Math.random() - 0.5) * 15,
                dy: (Math.random() - 0.5) * 15,
                color: color || `hsl(${Math.random() * 360}, 100%, 50%)`,
                life: 100,
                alpha: 1,
                grav: 0.1
            });
        }
    }

    function animate() {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Trails
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'lighter';

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.dx;
            p.y += p.dy;
            p.dy += p.grav;
            p.life--;
            p.alpha -= 0.02;

            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fill();

            if (p.life <= 0 || p.alpha <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }

        if (document.body.contains(canvas)) requestAnimationFrame(animate);
    }

    animate();

    // Launch sequence
    let launches = 0;
    const launchInt = setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * (canvas.height * 0.6);
        createExplosion(x, y);
        launches++;
        if (launches > 15) {
            clearInterval(launchInt);
            setTimeout(() => canvas.remove(), 2000);
        }
    }, 600);
}

function triggerThanosSnap(logElement) {
    logElement.innerHTML += `<div class="mb-2 text-purple-500 font-bold">"Yo soy... inevitable." 🫰</div>`;
    new Audio('https://www.soundjay.com/human/sounds/finger-snap-1.mp3').play();

    setTimeout(() => {
        document.body.style.transition = "all 2s ease";
        document.body.style.filter = "grayscale(100%) blur(5px)";
        document.body.style.opacity = "0";
        document.body.style.transform = "scale(0.9)";

        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }, 1000);
}

function triggerHackMeEffect(logElement) {
    // 1. Ominous initial message
    logElement.innerHTML += `<div class="mb-4 text-red-500 font-bold blinkable">☠️ INICIANDO PROTOCOLO CERO...</div>`;

    // Create Scary Glitch Overlay
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[999999] bg-black flex flex-col items-center justify-center overflow-hidden font-mono';
    overlay.style.transition = 'opacity 0.2s';

    // Scary HUD
    overlay.innerHTML = `
    <div class="absolute inset-0 bg-red-900/20 pointer-events-none" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 0, 0, 0.1) 4px);"></div>
            
            <div class="relative z-10 p-10 border-4 border-red-600 bg-black/90 text-red-500 text-center shadow-[0_0_50px_rgba(255,0,0,0.8)] animate-pulse">
                <i class="fas fa-exclamation-triangle text-6xl mb-6"></i>
                <h1 class="text-6xl font-black tracking-widest mb-4 glitch-text">SYSTEM HACKED</h1>
                <p class="text-xl">TU DIRECCIÓN IP HA SIDO RASTREADA</p>
                <p class="text-sm mt-4 text-red-400">UPLOADING DATA: <span id="hack-percent">0</span>%</p>
            </div>
            
            <div class="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30 text-xs text-red-800 break-all p-4" id="hack-code"></div>
        `;

    document.body.appendChild(overlay);

    // Apply glitch to body
    document.body.classList.add('shaking');

    // Matrix code rain effect in background (red)
    const codeContainer = overlay.querySelector('#hack-code');
    const updateCode = setInterval(() => {
        codeContainer.innerText = Array(2000).fill(0).map(() => Math.random().toString(36).substring(2)).join(' ');
    }, 50);

    // Progress Bar Fake
    const percentEl = overlay.querySelector('#hack-percent');
    let p = 0;
    const progress = setInterval(() => {
        p += Math.floor(Math.random() * 5);
        if (p > 100) p = 100;
        percentEl.innerText = p;

        if (p === 100) {
            clearInterval(progress);
            clearInterval(updateCode);
            setTimeout(() => {
                // The Reveal
                overlay.innerHTML = `
        < div class= "text-center p-10" >
                        <div class="text-8xl mb-4">🤡</div>
                        <h1 class="text-4xl text-green-500 font-bold mb-4">¡CAÍSTE!</h1>
                        <p class="text-white text-xl">Tu sistema está seguro. (Creo).</p>
                        <button id="hack-close-btn" class="mt-8 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-500">Volver a respirar</button>
                    </div >
        `;

                document.getElementById('hack-close-btn').onclick = () => {
                    overlay.style.opacity = '0';
                    document.body.classList.remove('shaking');
                    setTimeout(() => overlay.remove(), 500);
                };
            }, 1000);
        }
    }, 150);
}
