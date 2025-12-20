let zIndex = 100;
let maximizedStates = {};

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

    // Restore if minimized
    if (win.style.transform === 'scale(0)' || win.classList.contains('minimized')) {
        win.style.transform = 'scale(1)';
        win.style.opacity = '1';
        win.classList.remove('minimized');
        const rect = win.getBoundingClientRect();
        win.style.transition = "transform 0.3s cubic-bezier(0.1, 0.9, 0.2, 1), opacity 0.3s";
        setTimeout(() => { win.style.transition = ""; }, 300);
    }

    win.classList.remove('window-closing');
    win.style.display = 'flex';
    focusApp(appId);
    document.getElementById('ind-' + appId)?.classList.add('active');
}

function closeApp(appId) {
    const win = document.getElementById(appId + '-window');
    if (!win) return;
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

function dragElement(header) {
    const win = header.parentElement;
    header.onmousedown = (e) => {
        focusApp(win.id.replace('-window', ''));
        let p3 = e.clientX, p4 = e.clientY;
        document.onmousemove = (e) => {
            let p1 = p3 - e.clientX, p2 = p4 - e.clientY;
            p3 = e.clientX; p4 = e.clientY;
            win.style.top = (win.offsetTop - p2) + "px"; win.style.left = (win.offsetLeft - p1) + "px";
        };
        document.onmouseup = () => { document.onmousemove = null; document.onmouseup = null; };
    };
}
