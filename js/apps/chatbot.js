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
        return "¡Hola! ¿En qué puedo ayudarte hoy? 😊";
    }
    if (msg.includes('quien eres') || msg.includes('qué eres')) {
        return "Soy KevinBot, una inteligencia artificial (bueno, un script muy listo) diseñada para guiarte por este portafolio.";
    }
    if (msg.includes('skills') || msg.includes('habilidades') || msg.includes('sabe')) {
        return "Kevin es experto en: <b>JavaScript, React, Node.js, Python y AWS</b>. Además le encanta el diseño UI/UX. 🎨💻";
    }
    if (msg.includes('contacto') || msg.includes('email') || msg.includes('correo')) {
        return "Puedes contactar a Kevin en: <a href='mailto:contact@kevinos.dev' class='text-blue-400 hover:underline'>contact@kevinos.dev</a> o vía LinkedIn.";
    }
    if (msg.includes('proyectos') || msg.includes('trabajos')) {
        return "Tienes varios proyectos instalados aquí. Abre la app <b>Safari</b> o <b>Finder</b> para verlos en detalle. 📂";
    }
    if (msg.includes('hack') || msg.includes('hackear')) {
        return "¡Oye! No intentes hackearme... aunque si escribes <code>hackme</code> en la terminal, puede que encuentres una sorpresa. 🤡";
    }
    if (msg.includes('rick') || msg.includes('video')) {
        return "Never gonna give you up... 🎵 (Prueba 'ls' en la terminal)";
    }
    if (msg.includes('adios') || msg.includes('chao')) {
        return "¡Hasta luego! Disfruta explorando KevinOS. 👋";
    }

    // Default
    return "Mmm, no estoy seguro de cómo responder a eso. Prueba preguntando por mis **habilidades**, **proyectos** o **contacto**. 🤔";
}

// Init when page loads
document.addEventListener('DOMContentLoaded', initChatbot);
