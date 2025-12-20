const apiKey = "";

async function sendChatMessage() {
    const inp = document.getElementById('ai-input');
    const box = document.getElementById('ai-messages');
    if (!inp || !inp.value) return;
    const txt = inp.value; inp.value = "";
    box.innerHTML += `<div class="chat-msg msg-user">${txt}</div>`;
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: `Responde breve como Kevin el dev: ${txt}` }] }] })
        });
        const data = await res.json();
        box.innerHTML += `<div class="chat-msg msg-bot shadow-sm">${data.candidates[0].content.parts[0].text}</div>`;
    } catch { box.innerHTML += `<div class="chat-msg msg-bot shadow-sm">Servidor ocupado.</div>`; }
    box.scrollTop = box.scrollHeight;
}
