let zIndex = 100;
let maximizedStates = {};

// ─────────────────────────────────────────────────────────────────────────────
// FOCUS / OPEN / CLOSE / MINIMIZE / MAXIMIZE
// ─────────────────────────────────────────────────────────────────────────────
function focusApp(appId) {
    const win = document.getElementById(appId + '-window');
    if (win) {
        zIndex++;
        win.style.zIndex = zIndex;
    }
}

function openApp(appId) {
    const lp = document.getElementById('launchpad');
    if (lp && lp.style.display === 'flex') {
        lp.style.opacity = '0';
        setTimeout(() => lp.style.display = 'none', 300);
    }

    const win = document.getElementById(appId + '-window');
    if (!win) return;

    if (win.style.transform === 'scale(0)' || win.classList.contains('minimized')) {
        win.style.transform = 'scale(1)';
        win.style.opacity = '1';
        win.classList.remove('minimized');
        win.style.transition = "transform 0.3s cubic-bezier(0.1, 0.9, 0.2, 1), opacity 0.3s";
        setTimeout(() => { win.style.transition = ""; }, 300);
    }

    win.classList.remove('window-closing');
    win.style.display = 'flex';
    focusApp(appId);
    document.getElementById('ind-' + appId)?.classList.add('active');

    // Inject resize handles if not present
    if (!win.querySelector('.resize-handle')) {
        injectResizeHandles(win);
    }
}

function closeApp(appId) {
    const win = document.getElementById(appId + '-window');
    if (!win) return;
    // Hide snap zones in case they appear
    hideSnapZones();
    win.classList.add('window-closing');
    setTimeout(() => {
        win.style.display = 'none';
        win.classList.remove('window-closing');
        document.getElementById('ind-' + appId)?.classList.remove('active');
    }, 400);
}

function minimizeApp(appId) {
    const win = document.getElementById(appId + '-window');
    if (!win) return;
    win.style.transition = "transform 0.5s cubic-bezier(0.1, 0.9, 0.2, 1), opacity 0.5s, top 0.5s, left 0.5s";
    win.style.transform = "scale(0) translateY(500px)";
    win.style.opacity = "0";
    win.classList.add('minimized');
    setTimeout(() => {
        win.style.display = 'none';
        win.style.transition = "";
    }, 500);
}

function maximizeApp(appId) {
    const win = document.getElementById(appId + '-window');
    if (!win) return;

    win.style.transition = "all 0.3s ease";

    if (win.classList.contains('maximized')) {
        const state = maximizedStates[appId];
        if (state) {
            win.style.width = state.width;
            win.style.height = state.height;
            win.style.top = state.top;
            win.style.left = state.left;
        }
        win.classList.remove('maximized');
        win.style.borderRadius = "12px";
    } else {
        maximizedStates[appId] = {
            width: win.style.width,
            height: win.style.height,
            top: win.style.top,
            left: win.style.left
        };
        win.style.width = "100vw";
        win.style.height = "calc(100vh - 32px)";
        win.style.top = "32px";
        win.style.left = "0";
        win.classList.add('maximized');
        win.style.borderRadius = "0";
    }

    setTimeout(() => { win.style.transition = ""; }, 300);
}

// ─────────────────────────────────────────────────────────────────────────────
// DRAG — con Snap Zones tipo Windows 11
// ─────────────────────────────────────────────────────────────────────────────
const SNAP_THRESHOLD = 30; // px desde el borde de la pantalla

function showSnapZones(x) {
    let zone = document.getElementById('snap-zones');
    if (!zone) {
        zone = document.createElement('div');
        zone.id = 'snap-zones';
        zone.innerHTML = `
            <div class="snap-zone" id="snap-left" title="Mitad Izquierda"></div>
            <div class="snap-zone" id="snap-right" title="Mitad Derecha"></div>
            <div class="snap-zone" id="snap-top" title="Pantalla Completa"></div>
        `;
        document.body.appendChild(zone);
    }
    zone.style.display = 'block';

    const left = document.getElementById('snap-left');
    const right = document.getElementById('snap-right');
    const top = document.getElementById('snap-top');

    left.classList.toggle('snap-zone-active', x < SNAP_THRESHOLD);
    right.classList.toggle('snap-zone-active', x > window.innerWidth - SNAP_THRESHOLD);
    top.classList.toggle('snap-zone-active', false); // only show on hover top bar later
}

function hideSnapZones() {
    const zone = document.getElementById('snap-zones');
    if (zone) zone.style.display = 'none';
}

function applySnap(win, x, y) {
    const padding = 4;
    const topBarH = 32;

    if (x < SNAP_THRESHOLD) {
        // Snap Left
        win.style.transition = 'all 0.2s ease';
        win.style.left = padding + 'px';
        win.style.top = (topBarH + padding) + 'px';
        win.style.width = 'calc(50% - ' + (padding * 2) + 'px)';
        win.style.height = 'calc(100vh - ' + (topBarH + padding * 2) + 'px)';
        win.style.borderRadius = '8px';
        setTimeout(() => { win.style.transition = ''; }, 200);
        return true;
    } else if (x > window.innerWidth - SNAP_THRESHOLD) {
        // Snap Right
        win.style.transition = 'all 0.2s ease';
        win.style.left = 'calc(50% + ' + padding + 'px)';
        win.style.top = (topBarH + padding) + 'px';
        win.style.width = 'calc(50% - ' + (padding * 2) + 'px)';
        win.style.height = 'calc(100vh - ' + (topBarH + padding * 2) + 'px)';
        win.style.borderRadius = '8px';
        setTimeout(() => { win.style.transition = ''; }, 200);
        return true;
    }
    return false;
}

function dragElement(target, event) {
    const win = target.classList.contains('window') ? target : target.parentElement;
    if (!win || win.classList.contains('maximized')) return;

    focusApp(win.id.replace('-window', ''));

    const e = event || window.event;
    if (e && e.type === 'mousedown') {
        e.preventDefault();
        let p3 = e.clientX, p4 = e.clientY;
        let isDragging = false;

        const moveHandler = (moveEvent) => {
            let p1 = p3 - moveEvent.clientX, p2 = p4 - moveEvent.clientY;
            p3 = moveEvent.clientX; p4 = moveEvent.clientY;

            isDragging = true;

            let newTop = win.offsetTop - p2;
            let newLeft = win.offsetLeft - p1;
            if (newTop < 32) newTop = 32;

            win.style.top = newTop + "px";
            win.style.left = newLeft + "px";

            // Show snap zone hints
            showSnapZones(moveEvent.clientX);
        };

        const upHandler = (upEvent) => {
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mouseup', upHandler);
            hideSnapZones();

            if (isDragging) {
                // Try to snap on release
                applySnap(win, upEvent.clientX, upEvent.clientY);
            }
        };

        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', upHandler);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// RESIZE — handles en 8 direcciones
// ─────────────────────────────────────────────────────────────────────────────
const RESIZE_DIRS = ['n','ne','e','se','s','sw','w','nw'];
const MIN_W = 280, MIN_H = 200;

function injectResizeHandles(win) {
    RESIZE_DIRS.forEach(dir => {
        const h = document.createElement('div');
        h.className = `resize-handle resize-${dir}`;
        h.dataset.dir = dir;
        h.addEventListener('mousedown', (e) => startResize(e, win, dir));
        win.appendChild(h);
    });
}

function startResize(e, win, dir) {
    if (win.classList.contains('maximized')) return;
    e.preventDefault();
    e.stopPropagation();

    focusApp(win.id.replace('-window', ''));

    const startX = e.clientX;
    const startY = e.clientY;
    const startW = win.offsetWidth;
    const startH = win.offsetHeight;
    const startTop = win.offsetTop;
    const startLeft = win.offsetLeft;

    const onMove = (mv) => {
        const dx = mv.clientX - startX;
        const dy = mv.clientY - startY;

        let newW = startW, newH = startH, newTop = startTop, newLeft = startLeft;

        if (dir.includes('e')) newW = Math.max(MIN_W, startW + dx);
        if (dir.includes('s')) newH = Math.max(MIN_H, startH + dy);
        if (dir.includes('w')) {
            newW = Math.max(MIN_W, startW - dx);
            newLeft = startLeft + (startW - newW);
        }
        if (dir.includes('n')) {
            newH = Math.max(MIN_H, startH - dy);
            newTop = Math.max(32, startTop + (startH - newH));
        }

        win.style.width = newW + 'px';
        win.style.height = newH + 'px';
        win.style.top = newTop + 'px';
        win.style.left = newLeft + 'px';
    };

    const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
}

// Inject resize handles to all windows on init
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.window').forEach(win => {
        injectResizeHandles(win);
    });
});
