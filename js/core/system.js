const wallpapers = [
    'image/wallpaper/1.jpg',
    'image/wallpaper/2.jpg',
    'image/wallpaper/3.jpg',
    'image/wallpaper/4.jpg',
    'image/wallpaper/5.jpg'
];
let currentWP = 0;
let unlockAttempts = 0;

function runBootSequence() {
    const boot = document.getElementById('boot-screen');
    // The loading bar inside boot screen uses an animation keyframe directly in HTML
    // We just handle the fade out after 2.8s
    setTimeout(() => {
        boot.style.opacity = '0';
        setTimeout(() => { boot.style.display = 'none'; }, 1000);
    }, 2800);
}

function updateClock() {
    const now = new Date();
    const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const pad = n => n < 10 ? '0' + n : n;
    const clockEl = document.getElementById('clock');
    if (clockEl) clockEl.innerText = `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]}  ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    const wd = document.getElementById('widget-day');
    const d = document.getElementById('widget-date');
    if (wd) wd.innerText = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][now.getDay()];
    if (d) d.innerText = now.getDate();
}

function hideAllModals() {
    const m = document.getElementById('context-menu');
    if (m) m.style.display = 'none';
    const s = document.getElementById('spotlight');
    if (s) s.style.display = 'none';
    const cc = document.getElementById('control-center');
    if (cc) cc.style.display = 'none';
}

function toggleSpotlight() {
    const s = document.getElementById('spotlight');
    if (s) {
        const isVisible = s.style.display === 'flex';
        hideAllModals();
        s.style.display = isVisible ? 'none' : 'flex';
        if (!isVisible) document.getElementById('spotlight-input').focus();
    }
}

function toggleControlCenter() {
    const cc = document.getElementById('control-center');
    if (cc) {
        const isVisible = cc.style.display === 'flex';
        hideAllModals();
        cc.style.display = isVisible ? 'none' : 'flex';
    }
}

function toggleLaunchpad(force) {
    const lp = document.getElementById('launchpad');
    if (!lp) return;
    const isVisible = typeof force === 'boolean' ? force : lp.style.display !== 'flex';
    if (isVisible) { lp.style.display = 'flex'; setTimeout(() => lp.style.opacity = '1', 10); }
    else { lp.style.opacity = '0'; setTimeout(() => lp.style.display = 'none', 300); }
}

// Legacy alias — now handled by spotlight.js
function handleSpotlight(e) {
    if (typeof handleSpotlightKey === 'function') handleSpotlightKey(e);
}

function toggleSpotlight() {
    const sp = document.getElementById('spotlight');
    if (sp.style.display === 'flex') {
        if (typeof closeSpotlight === 'function') closeSpotlight();
    } else {
        if (typeof openSpotlight === 'function') openSpotlight();
    }
}

function showContextMenu(e) {
    e.preventDefault();
    const m = document.getElementById('context-menu');
    if (!m) return;
    m.style.display = 'block';
    let x = e.clientX; let y = e.clientY;
    if (x + 190 > window.innerWidth) x -= 190;
    if (y + 150 > window.innerHeight) y -= 150;
    m.style.left = x + 'px'; m.style.top = y + 'px';
}

function hideContextMenu() { const m = document.getElementById('context-menu'); if (m) m.style.display = 'none'; }

function unlock() {
    const container = document.getElementById('lock-container');
    const lockScreen = document.getElementById('lock-screen');
    const statusText = document.getElementById('lock-password-container');

    if (statusText) {
        statusText.innerText = "ACCESO CONCEDIDO";
        statusText.style.color = "#4ade80";
        statusText.classList.add('bg-green-500/20');
    }

    const msg = document.createElement('div');
    msg.innerText = "Bienvenido de nuevo 🔓";
    msg.className = "text-green-400 font-bold mt-4 animate-pulse";
    container.appendChild(msg);

    setTimeout(() => {
        lockScreen.style.opacity = '0';
        setTimeout(() => {
            lockScreen.style.display = 'none';
            msg.remove();
            window.dispatchEvent(new CustomEvent('system:unlocked'));
            if (typeof Desktop !== 'undefined' && Desktop.login) {
                Desktop.login();
            }
        }, 500);
    }, 800);
}

function lockManual() {
    unlockAttempts = 0;
    document.getElementById('lock-screen').style.display = 'flex';
    document.getElementById('desktop').style.filter = 'blur(45px)';
}

function nextWallpaper() {
    currentWP = (currentWP + 1) % wallpapers.length;
    document.getElementById('desktop').style.backgroundImage = `url('${wallpapers[currentWP]}')`;
}
