// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP — Context Menu mejorado + localStorage para preferencias
// ─────────────────────────────────────────────────────────────────────────────

const Desktop = {
    prefs: {},

    init: () => {
        Desktop.loadPrefs();
        Desktop.checkAuth();
        Desktop.setupContextMenu();
        Desktop.applyPrefs();
    },

    // ── Preferencias (memoria) ──────────────────────────────────────────────
    loadPrefs: () => {
        try {
            Desktop.prefs = JSON.parse(localStorage.getItem('kevinos-prefs') || '{}');
        } catch { Desktop.prefs = {}; }
    },

    savePref: (key, value) => {
        Desktop.prefs[key] = value;
        localStorage.setItem('kevinos-prefs', JSON.stringify(Desktop.prefs));
    },

    applyPrefs: () => {
        // Wallpaper
        if (Desktop.prefs.wallpaperIndex !== undefined && typeof wallpapers !== 'undefined') {
            currentWallpaper = Desktop.prefs.wallpaperIndex;
            const desktop = document.querySelector('.desktop');
            if (desktop) desktop.style.backgroundImage = `url('${wallpapers[currentWallpaper]}')`;
        }
        // Icon size
        if (Desktop.prefs.iconSize) {
            Desktop.applyIconSize(Desktop.prefs.iconSize);
        }
        // Icon sort
        if (Desktop.prefs.iconSort) {
            Desktop.sortIcons(Desktop.prefs.iconSort, false);
        }
    },

    applyIconSize: (size) => {
        const container = document.getElementById('desktop-icons');
        if (!container) return;
        if (size === 'large')  container.style.setProperty('--icon-scale', '1.25');
        if (size === 'medium') container.style.setProperty('--icon-scale', '1');
        if (size === 'small')  container.style.setProperty('--icon-scale', '0.8');
        const icons = container.querySelectorAll(':scope > div');
        icons.forEach(icon => {
            const img = icon.querySelector('.w-16');
            if (!img) return;
            if (size === 'large')  { img.style.width = '72px'; img.style.height = '64px'; }
            if (size === 'medium') { img.style.width = '64px'; img.style.height = '56px'; }
            if (size === 'small')  { img.style.width = '48px'; img.style.height = '40px'; }
        });
        Desktop.savePref('iconSize', size);
    },

    sortIcons: (by, save = true) => {
        const container = document.getElementById('desktop-icons');
        if (!container) return;
        const icons = [...container.querySelectorAll(':scope > div')];
        icons.sort((a, b) => {
            const na = a.querySelector('span')?.innerText || '';
            const nb = b.querySelector('span')?.innerText || '';
            return na.localeCompare(nb);
        });
        if (by === 'desc') icons.reverse();
        icons.forEach(icon => container.appendChild(icon));
        if (save) Desktop.savePref('iconSort', by);
    },

    // ── AUTH ────────────────────────────────────────────────────────────────
    checkAuth: () => {
        const isAuthed = localStorage.getItem('kevinos-auth');
        if (isAuthed === 'true') {
            const lock = document.getElementById('lock-screen');
            if (lock) {
                lock.style.display = 'none';
                setTimeout(() => window.dispatchEvent(new CustomEvent('system:unlocked')), 100);
            }
        }
    },

    login: () => { localStorage.setItem('kevinos-auth', 'true'); },

    logout: () => {
        localStorage.removeItem('kevinos-auth');
        window.location.reload();
    },

    // ── Context Menu ────────────────────────────────────────────────────────
    setupContextMenu: () => {
        const menu = document.getElementById('context-menu');
        document.addEventListener('click', () => { if (menu) menu.style.display = 'none'; });

        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if (!menu) return;
            menu.innerHTML = '';

            const isDesktopIcon = e.target.closest('#desktop-icons > div');

            if (isDesktopIcon) {
                // Icon context menu
                const name = isDesktopIcon.querySelector('span')?.innerText || 'Carpeta';
                menu.innerHTML = `
                    <div class="menu-item font-bold opacity-60 text-xs">${name}</div>
                    <div class="h-[0.5px] bg-white/10 my-1 mx-2"></div>
                    <div class="menu-item" onclick="openApp('info'); PreviewApp.openInfo('${name}')">
                        <i class="fas fa-info-circle w-4"></i> Obtener Información
                    </div>
                    <div class="menu-item" onclick="window.Notify && Notify.show('Fijado', '${name} fijado al Dock.', 'fa-thumbtack')">
                        <i class="fas fa-thumbtack w-4"></i> Fijar en Dock
                    </div>
                    <div class="h-[0.5px] bg-white/10 my-1 mx-2"></div>
                    <div class="menu-item text-red-400" onclick="this.parentElement.style.display='none'; window.Notify && Notify.show('Papelera', 'No tienes permisos para borrar archivos del sistema.', 'fa-trash')">
                        <i class="fas fa-trash w-4 text-xs"></i> Mover a la Papelera
                    </div>
                `;
            } else {
                // Desktop context menu
                menu.innerHTML = `
                    <div class="menu-item" onclick="window.Notify && Notify.show('Sistema', 'Nueva carpeta creada.', 'fa-folder-plus')">
                        <i class="fas fa-folder-plus w-4 text-blue-400"></i> Nueva Carpeta
                    </div>
                    <div class="h-[0.5px] bg-white/10 my-1 mx-2"></div>
                    
                    <div class="menu-item menu-item-sub">
                        <i class="fas fa-eye w-4"></i> Ver
                        <i class="fas fa-chevron-right ml-auto text-[10px] opacity-40"></i>
                        <div class="submenu">
                            <div class="menu-item" onclick="Desktop.applyIconSize('large')"><i class="fas fa-th-large w-4"></i> Íconos Grandes</div>
                            <div class="menu-item" onclick="Desktop.applyIconSize('medium')"><i class="fas fa-th w-4"></i> Íconos Medianos</div>
                            <div class="menu-item" onclick="Desktop.applyIconSize('small')"><i class="fas fa-th-list w-4"></i> Íconos Pequeños</div>
                        </div>
                    </div>

                    <div class="menu-item menu-item-sub">
                        <i class="fas fa-sort-amount-down w-4"></i> Ordenar por
                        <i class="fas fa-chevron-right ml-auto text-[10px] opacity-40"></i>
                        <div class="submenu">
                            <div class="menu-item" onclick="Desktop.sortIcons('asc')">Nombre</div>
                            <div class="menu-item" onclick="Desktop.sortIcons('kind')">Clase</div>
                            <div class="menu-item" onclick="Desktop.sortIcons('date')">Fecha de creación</div>
                        </div>
                    </div>

                    <div class="menu-item" onclick="window.location.reload()">
                        <i class="fas fa-sync-alt w-4"></i> Actualizar
                    </div>

                    <div class="h-[0.5px] bg-white/10 my-1 mx-2"></div>

                    <div class="menu-item" onclick="nextWallpaper(); Desktop.savePref('wallpaperIndex', currentWallpaper)">
                        <i class="fas fa-image w-4"></i> Cambiar Fondo
                    </div>

                    <div class="menu-item menu-item-sub">
                        <i class="fas fa-window-restore w-4"></i> Ventanas
                        <i class="fas fa-chevron-right ml-auto text-[10px] opacity-40"></i>
                        <div class="submenu">
                            <div class="menu-item" onclick="arrangeWindowsCascade()"><i class="fas fa-layer-group w-4"></i> Cascada</div>
                            <div class="menu-item" onclick="arrangeWindowsTile()"><i class="fas fa-border-all w-4"></i> Mosaico</div>
                            <div class="menu-item" onclick="closeAllWindows()"><i class="fas fa-times-circle w-4"></i> Cerrar todas</div>
                        </div>
                    </div>

                    <div class="h-[0.5px] bg-white/10 my-1 mx-2"></div>

                    <div class="menu-item" onclick="openApp('terminal')">
                        <i class="fas fa-terminal w-4"></i> Terminal
                    </div>
                    <div class="menu-item" onclick="openFolder('projects')">
                        <i class="fab fa-github w-4"></i> Proyectos GitHub
                    </div>
                    <div class="menu-item" onclick="openSpotlight()">
                        <i class="fas fa-search w-4"></i> Buscar
                        <span class="ml-auto text-[10px] opacity-40">Ctrl+K</span>
                    </div>

                    <div class="h-[0.5px] bg-white/10 my-1 mx-2"></div>

                    <div class="menu-item" onclick="openApp('about')">
                        <i class="fas fa-info-circle w-4"></i> Información del Sistema
                    </div>

                    <div class="menu-item text-red-400" onclick="Desktop.logout()">
                        <i class="fas fa-sign-out-alt w-4"></i> Cerrar Sesión
                    </div>
                `;
            }

            // Position menu (avoid overflow)
            menu.style.display = 'block';
            let x = e.pageX, y = e.pageY;
            setTimeout(() => {
                if (x + menu.offsetWidth > window.innerWidth) x -= menu.offsetWidth;
                if (y + menu.offsetHeight > window.innerHeight) y -= menu.offsetHeight;
                menu.style.left = x + 'px';
                menu.style.top  = y + 'px';
            }, 0);
        });
    },

    // ── Drag & Drop ─────────────────────────────────────────────────────────
    initDragAndDrop: () => {
        const icons = document.querySelectorAll('#desktop-icons > div');
        const savedPositions = JSON.parse(localStorage.getItem('kevinos-icons') || '{}');
        icons.forEach(icon => {
            const id = icon.querySelector('span')?.innerText;
            icon.onmousedown = (e) => Desktop.dragIcon(e, icon, id);
            if (savedPositions[id]) {
                icon.style.position = 'absolute';
                icon.style.left = savedPositions[id].x + 'px';
                icon.style.top  = savedPositions[id].y + 'px';
            }
        });
    },

    dragIcon: (e, icon, id) => {
        e.stopPropagation();
        let shiftX = e.clientX - icon.getBoundingClientRect().left;
        let shiftY = e.clientY - icon.getBoundingClientRect().top;
        icon.style.position = 'absolute';
        const onMouseMove = (ev) => {
            icon.style.left = (ev.pageX - shiftX) + 'px';
            icon.style.top  = (ev.pageY - shiftY) + 'px';
        };
        document.addEventListener('mousemove', onMouseMove);
        icon.onmouseup = document.onmouseup = () => {
            document.removeEventListener('mousemove', onMouseMove);
            icon.onmouseup = document.onmouseup = null;
            const saved = JSON.parse(localStorage.getItem('kevinos-icons') || '{}');
            saved[id] = { x: parseInt(icon.style.left), y: parseInt(icon.style.top) };
            localStorage.setItem('kevinos-icons', JSON.stringify(saved));
        };
        icon.ondragstart = () => false;
    }
};

// ─── Window Arrangement helpers ──────────────────────────────────────────────
function arrangeWindowsCascade() {
    const wins = [...document.querySelectorAll('.window')].filter(w => w.style.display === 'flex' && !w.classList.contains('maximized'));
    wins.forEach((win, i) => {
        win.style.transition = 'all 0.3s ease';
        win.style.left = (80 + i * 30) + 'px';
        win.style.top  = (60 + i * 30) + 'px';
        win.style.width  = '700px';
        win.style.height = '480px';
        setTimeout(() => { win.style.transition = ''; }, 300);
    });
}

function arrangeWindowsTile() {
    const wins = [...document.querySelectorAll('.window')].filter(w => w.style.display === 'flex' && !w.classList.contains('maximized'));
    const count = wins.length;
    if (count === 0) return;
    const cols = count <= 2 ? count : Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / cols);
    const W = Math.floor((window.innerWidth) / cols);
    const H = Math.floor((window.innerHeight - 32) / rows);
    wins.forEach((win, i) => {
        const col = i % cols, row = Math.floor(i / cols);
        win.style.transition = 'all 0.3s ease';
        win.style.left   = (col * W + 4) + 'px';
        win.style.top    = (32 + row * H + 4) + 'px';
        win.style.width  = (W - 8) + 'px';
        win.style.height = (H - 8) + 'px';
        setTimeout(() => { win.style.transition = ''; }, 300);
    });
}

function closeAllWindows() {
    document.querySelectorAll('.window').forEach(win => {
        const appId = win.id.replace('-window', '');
        closeApp(appId);
    });
}

// ─── Global Info Popup ───────────────────────────────────────────────────────
function openInfo(title, desc, iconName) {
    toggleLaunchpad();
    setTimeout(() => {
        openApp('info');
        const win = document.getElementById('info-window');
        if (!win) return;
        win.querySelector('#info-title').innerText = title;
        win.querySelector('#info-desc').innerText = desc;
        const iconImg = win.querySelector('#info-icon');
        if (iconImg) iconImg.src = iconName.includes('http') ? iconName : `https://img.icons8.com/fluency/96/${iconName}.png`;
    }, 200);
}
