function initChatbot() {
    const input = document.getElementById('chatbot-input');
    if (!input) return;

    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            handleChatSend();
        }
    });
}

function handleChatSend() {
    const input = document.getElementById('chatbot-input');
    const msg = input.value.trim();
    if (msg === '') return;

    // User Message
    addMessage(msg, 'user');
    input.value = '';

    // Simulate thinking delay
    setTimeout(() => {
        const response = getBotResponse(msg);
        addMessage(response, 'bot');
        document.getElementById('chatbot-messages').scrollTop = document.getElementById('chatbot-messages').scrollHeight;
    }, 600);
}

function addMessage(text, sender) {
    const container = document.getElementById('chatbot-messages');
    const div = document.createElement('div');
    div.className = 'flex items-end gap-2 ' + (sender === 'user' ? 'justify-end' : '');

    // Icon
    const icon = sender === 'bot'
        ? `<div class="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs">🤖</div>`
        : '';

    // Bubble
    const bubbleClass = sender === 'bot'
        ? 'bg-gray-700/50 p-3 rounded-2xl rounded-bl-none text-sm max-w-[80%]'
        : 'bg-blue-600 p-3 rounded-2xl rounded-br-none text-sm max-w-[80%]';

    div.innerHTML = `
        ${sender === 'bot' ? icon : ''}
        <div class="${bubbleClass}">${text}</div>
    `;

    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function getBotResponse(input) {
    const msg = input.toLowerCase();

    // Knowledge Base
    if (msg.includes('hola') || msg.includes('buenos') || msg.includes('hey')) {
        return "¡Hola! 👋 Soy el asistente de Kevin Ortega. ¿En qué puedo ayudarte?";
    }
    // Identity
    if (msg.includes('quien eres') || msg.includes('qué eres') || msg.includes('que eres')) {
        return "Soy KevinBot. Represento a <b>Kevin Ortega</b>: un creativo digital, investigador y desarrollador colombiano apasionado por integrar propósito, estética y funcionalidad. 🚀";
    }

    // Skills
    if (msg.includes('skills') || msg.includes('habilidades') || msg.includes('sabe')) {
        return "Kevin es un <b>Creativo Digital y Desarrollador</b>.<br>• ⚙️ <b>Tech</b>: HTML, CSS, JS, Python.<br>• 🎨 <b>Diseño</b>: Branding, 3D, Producción Digital.<br>• 🧠 <b>Estrategia</b>: Investigación, Copywriting y Comunicación.";
    }

    // Contact
    if (msg.includes('contacto') || msg.includes('email') || msg.includes('correo')) {
        return "¡Contáctalo! 📬<br>Email: <b>milife.ortega2000@gmail.com</b><br>📱 Tel: 315 049 9783<br>📍 Colombia";
    }

    // Projects
    if (msg.includes('proyectos') || msg.includes('trabajos')) {
        return "Kevin ha trabajado con <b>KRE-ACTIVA</b> (Desarrollo/Diseño) y <b>Misión Juvenil</b> (Redes). Abre la app 'Perfil' (antes Preview) para ver su CV completo. 📂";
    }

    // Fun
    if (msg.includes('hack') || msg.includes('hackear')) {
        return "¡Oye! No intentes hackearme... aunque si escribes <code>hackme</code> en la terminal, puede que encuentres una sorpresa. 🤡";
    }
    if (msg.includes('rick') || msg.includes('video')) {
        return "Never gonna give you up... 🎵 (Prueba 'ls' en la terminal)";
    }
    if (msg.includes('adios') || msg.includes('chao')) {
        return "¡Hasta luego! Disfruta explorando KevinOS. 👋";
    }

    // COMMANDS / OS CONTROL

    // OPEN CV / PROFILE
    if (msg.includes('cv') || msg.includes('hoja de vida') || msg.includes('perfil') || msg.includes('sobre ti')) {
        setTimeout(() => { if (window.PreviewApp) window.PreviewApp.open(); }, 800);
        return "¡Claro! Abriendo mi Perfil Profesional ahora mismo... 📄";
    }

    // OPEN TERMINAL
    if (msg.includes('terminal') || msg.includes('consola') || msg.includes('cmd')) {
        setTimeout(() => openApp('terminal'), 800);
        return "Accediendo al sistema... abriendo Terminal. 💻";
    }

    // GAMES
    // Direct Game Commands
    if (msg.includes('pong')) {
        setTimeout(() => window.openPong(), 800);
        return "¡Pong! Preparando la mesa... 🏓";
    }
    if (msg.includes('tetris')) {
        setTimeout(() => openApp('tetris'), 800);
        return "¡Tetris! Acomodando bloques... 🧱";
    }
    if (msg.includes('snake') || msg.includes('culebrita')) {
        setTimeout(() => openApp('tetris'), 800);
        return "Snake se jubiló, pero te abro Tetris que está genial. 🧱";
    }

    // Generic Game Request
    if (msg.includes('jugar') || msg.includes('game') || msg.includes('juego')) {
        return "¡Diversión! Escribe **'Pong'** o **'Tetris'** para empezar. 🎮";
    }

    // MAIL
    if (msg.includes('escribir') || msg.includes('mensaje') || msg.includes('mail') || msg.includes('correo')) {
        setTimeout(() => openApp('mail'), 800);
        return "Abriendo el cliente de correo... Escríbeme. 📧";
    }

    // UTILS / TIME / DATE
    if (msg.includes('hora') || msg.includes('time')) {
        let options = { hour: '2-digit', minute: '2-digit' };
        let zone = 'local';
        let place = '';

        if (msg.includes('españa') || msg.includes('madrid') || msg.includes('europa')) {
            options.timeZone = 'Europe/Madrid';
            place = ' en España';
        } else if (msg.includes('mexico') || msg.includes('cdmx')) {
            options.timeZone = 'America/Mexico_City';
            place = ' en México';
        } else if (msg.includes('argentina') || msg.includes('buenos aires')) {
            options.timeZone = 'America/Argentina/Buenos_Aires';
            place = ' en Argentina';
        } else if (msg.includes('colombia') || msg.includes('bogota')) {
            options.timeZone = 'America/Bogota';
            place = ' en Colombia';
        }

        try {
            const timeString = new Date().toLocaleTimeString('es-CO', options);
            return `Son las ${timeString}${place}. ⌚`;
        } catch (e) {
            return "Son las " + new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }) + ". ⌚";
        }
    }
    if (msg.includes('fecha') || msg.includes('dia') || msg.includes('día')) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return "Hoy es " + new Date().toLocaleDateString('es-CO', options) + ". 📅";
    }

    // MUSIC CONTROL
    if (msg.includes('musica') || msg.includes('música') || msg.includes('cancion') || msg.includes('reproducir')) {
        if (typeof window.togglePlay === 'function') {
            window.togglePlay();
            return "¡Música maestro! 🎵 (Reproductor actualizado)";
        }
        return "Intenté poner música, pero no encontré el reproductor. Abre la app de Música primero. 🎧";
    }
    if (msg.includes('siguiente') || msg.includes('cambia') || msg.includes('next')) {
        if (typeof window.nextTrack === 'function') {
            window.nextTrack();
            return "Cambiando de pista... ⏭️";
        }
    }

    // SYSTEM ADMIN
    if (msg.includes('cerrar todo') || msg.includes('cerrar ventanas') || msg.includes('limpiar escritorio')) {
        setTimeout(closeAllApps, 1000);
        return "Entendido. Cerrando todas las aplicaciones activas... 🧹";
    }

    if (msg.includes('apagar') || msg.includes('shutdown') || msg.includes('reiniciar') || msg.includes('cerrar sesion')) {
        setTimeout(shutdownSystem, 1500);
        return "Iniciando secuencia de apagado... Fue un placer servirle. 👋🌑";
    }

    // THANOS SNAP
    if (msg.includes('thanos') || msg.includes('snap') || msg.includes('inevitable')) {
        setTimeout(() => {
            document.body.style.transition = "all 2s ease";
            document.body.style.filter = "grayscale(100%) blur(5px)";
            document.body.style.opacity = "0";
            document.body.style.transform = "scale(0.9)";
            setTimeout(() => window.location.reload(), 3000);
        }, 2000);
        return "Yo soy... inevitable. 🫰 (Chasquido)";
    }

    // Default
    return "Mmm, no estoy seguro. Pero puedo abrir aplicaciones (CV, Terminal, Mail), decirte la hora ⌚, controlar la música 🎵 o incluso invocar a Thanos 🫰. ¡Pruébame! 🤖";
}

// HELPERS
function closeAllApps() {
    const windows = document.querySelectorAll('.window');
    windows.forEach(win => {
        if (win.style.display !== 'none') {
            const appId = win.id.replace('-window', '');
            if (window.closeApp) window.closeApp(appId);
        }
    });
}

function shutdownSystem() {
    const cover = document.createElement('div');
    cover.className = 'fixed inset-0 bg-black z-[100000] flex flex-col items-center justify-center text-white';
    cover.innerHTML = `
        <i class="fas fa-power-off text-4xl mb-4 text-red-500 animate-pulse"></i>
        <div class="text-xl font-mono">System Halted</div>
        <div class="text-sm text-gray-500 mt-2">KevinOS shut down successfully.</div>
        <button onclick="location.reload()" class="mt-8 px-4 py-2 border border-gray-700 hover:bg-white/10 rounded transition">Reiniciar</button>
    `;
    document.body.appendChild(cover);
}

// Init when page loads
document.addEventListener('DOMContentLoaded', initChatbot);
