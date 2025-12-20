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
    const typingId = addTypingIndicator();

    setTimeout(() => {
        removeTypingIndicator(typingId);
        const response = getBotResponse(msg);
        addMessage(response, 'bot');
        document.getElementById('chatbot-messages').scrollTop = document.getElementById('chatbot-messages').scrollHeight;
    }, 800);
}

function addMessage(text, sender) {
    const container = document.getElementById('chatbot-messages');
    const div = document.createElement('div');
    div.className = 'flex items-end gap-2 ' + (sender === 'user' ? 'justify-end' : '');

    const icon = sender === 'bot'
        ? `<div class="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs">🤖</div>`
        : '';

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

function addTypingIndicator() {
    const container = document.getElementById('chatbot-messages');
    const id = 'typing-' + Date.now();
    const div = document.createElement('div');
    div.id = id;
    div.className = 'flex items-end gap-2';
    div.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs">🤖</div>
        <div class="bg-gray-700/50 p-4 rounded-2xl rounded-bl-none flex gap-1">
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
        </div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return id;
}

function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function getBotResponse(input) {
    const msg = input.toLowerCase();

    // Expanded Knowledge Base (Local Intelligence)

    // Identity
    if (msg.includes('quien eres') || msg.includes('qué eres') || msg.includes('que eres')) {
        return "Soy KevinBot, tu asistente virtual en este sistema operativo. 🤖 Estoy programado para guiarte por el portafolio de Kevin.";
    }

    // Skills
    if (msg.includes('skill') || msg.includes('habilidad') || msg.includes('sabe') || msg.includes('tecnología') || msg.includes('stack')) {
        return "Kevin domina el stack moderno:<br>• <b>Frontend</b>: React, TailwindCSS, HTML5, CSS3.<br>• <b>Backend</b>: Node.js, Python, SQL.<br>• <b>Cloud</b>: AWS, Docker.<br>• <b>Tools</b>: Git, VS Code, Figma.";
    }

    // Contact
    if (msg.includes('contact') || msg.includes('correo') || msg.includes('email') || msg.includes('linkedin') || msg.includes('llamar')) {
        return "¡Hablemos! 📬<br>Email: <b>contact@kevinos.dev</b><br>GitHub: <a href='https://github.com/kevorteg' target='_blank' class='text-blue-400 underline'>kevorteg</a><br>También puedes usar la app 'Mail' en el dock.";
    }

    // Projects
    if (msg.includes('proyecto') || msg.includes('trabajo') || msg.includes('portafolio') || msg.includes('experiencia')) {
        return "Puedes ver los proyectos destacados en el <b>Launchpad</b> o usando el explorador de archivos 'Finder'. He trabajado en desarrollo web, bots de IA y aplicaciones móviles.";
    }

    // OS Features
    if (msg.includes('musica') || msg.includes('music') || msg.includes('cancion')) {
        return "Tenemos un reproductor estilo Winamp. Ábrelo desde el dock 🎵 y disfruta de lofi beats mientras navegas.";
    }
    if (msg.includes('juego') || msg.includes('game') || msg.includes('aburrido')) {
        return "¡Hora de recreo! 🕹️ Tienes instalado <b>Tetris</b>, <b>Snake</b> y <b>Pong</b>. Búscalos en el Launchpad o en el Dock.";
    }
    if (msg.includes('terminal') || msg.includes('comando')) {
        return "La terminal es poderosa. Prueba comandos como <code>hackme</code>, <code>matrix</code> o el clásico <code>ls</code> (bajo tu propio riesgo 🤡).";
    }

    // Easter Eggs & Fun
    if (msg.includes('hola') || msg.includes('buenos') || msg.includes('hey')) {
        return "¡Hola! 👋 ¿Listo para explorar el sistema?";
    }
    if (msg.includes('gracias')) {
        return "¡De nada! Aquí sigo si necesitas más ram... digo, ayuda. 😉";
    }
    if (msg.includes('chiste') || msg.includes('broma')) {
        return "¿Qué le dice un bit al otro? Nos vemos en el bus. 🚌";
    }
    if (msg.includes('amor') || msg.includes('love') || msg.includes('novia')) {
        return "Mi único amor es el código limpio y la cafeína. ☕❤️";
    }
    if (msg.includes('hack') || msg.includes('password')) {
        return "Acceso denegado. 👮‍♂️ (Mentira, prueba escribir <code>hackme</code> en la terminal).";
    }
    if (msg.includes('rick') || msg.includes('never')) {
        return "Never gonna give you up... 🕺🎵";
    }

    // Default Fallback
    return "Mmm, mis bases de datos locales no tienen respuesta para eso. 🤯 Prueba preguntar por <b>Experiencia</b>, <b>Proyectos</b>, <b>Contacto</b> o simplemente di 'Hola'.";
}

// Init when page loads
document.addEventListener('DOMContentLoaded', initChatbot);
