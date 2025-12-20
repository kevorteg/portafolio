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
    const fill = document.getElementById('boot-fill');

    // Start animation
    setTimeout(() => { fill.style.width = '100%'; }, 100);

    // Fade out
    setTimeout(() => {
        boot.style.opacity = '0';
        setTimeout(() => { boot.style.display = 'none'; }, 1000);
    }, 2800);
}

function updateClock() {
    const now = new Date();
    const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const clockEl = document.getElementById('clock');
    if (clockEl) clockEl.innerText = `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]}  ${now.getHours()}:${now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()}`;
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

function handleSpotlight(e) {
    if (e.key === 'Enter') {
        const val = e.target.value.toLowerCase();
        if (val.includes('ia')) openApp('ai');
        else if (val.includes('word')) openApp('word');
        else if (val.includes('safari')) openApp('safari');
        toggleSpotlight();
        e.target.value = "";
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
    const pass = document.getElementById('lock-password');
    const container = document.getElementById('lock-container');
    if (!pass || pass.value.trim() === "") return;
    if (unlockAttempts === 0) {
        container.classList.add('shaking');
        document.getElementById('lock-error-msg').style.opacity = '1';
        setTimeout(() => { container.classList.remove('shaking'); unlockAttempts++; }, 500);
    } else {
        // HACK SUCCESS MODE
        document.getElementById('lock-error-msg').style.opacity = '0';
        pass.style.color = '#4ade80'; // Green text
        pass.value = "ACCESO CONCEDIDO";
        const msg = document.createElement('div');
        msg.innerText = "¡Has hackeado el sistema! Felicidades 🔓";
        msg.className = "text-green-400 font-bold mt-4 animate-pulse";
        container.appendChild(msg);

        setTimeout(() => {
            document.getElementById('lock-screen').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('lock-screen').style.display = 'none';
                msg.remove(); // Cleanup
                pass.value = "";
                pass.style.color = "";
                window.dispatchEvent(new CustomEvent('system:unlocked'));
                Desktop.login(); // Save Auth
            }, 500);
        }, 1500);
    }
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
