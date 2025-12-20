const Desktop = {
    init: () => {
        Desktop.checkAuth();
        Desktop.checkAuth();
        // Desktop.initDragAndDrop(); // Disabled as requested
        Desktop.setupContextMenu();
        Desktop.setupContextMenu();

        // Global Right Click
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const menu = document.getElementById('context-menu');
            if (!menu) return;

            // Reset menu
            menu.innerHTML = '';

            // Check if clicked on a Launchpad or Desktop item
            const item = e.target.closest('.launchpad-item, .desktop-icon');

            if (item) {
                // Determine Name
                const name = item.querySelector('span')?.innerText || 'App';

                // Add Item Options
                menu.innerHTML += `
                    <div class="menu-item font-bold disable-select">${name}</div>
                    <div class="h-[0.5px] bg-white/10 my-1 mx-2"></div>
                    <div class="menu-item" onclick="window.Notify.show('Acceso Directo', 'Se ha guardado en el escritorio.', 'fa-check')"><i class="fas fa-desktop"></i> Llevar al Escritorio</div>
                    <div class="menu-item" onclick="window.Notify.show('Dock', 'Se ha fijado en el Dock.', 'fa-thumbtack')"><i class="fas fa-thumbtack"></i> Fijar en Dock</div>
                    <div class="h-[0.5px] bg-white/10 my-1 mx-2"></div>
                    <div class="menu-item text-xs opacity-50 pl-8">Hecho por Kevin & Antigravity AI</div>
                `;
            } else {
                // Desktop / Default Options
                menu.innerHTML += `
                    <div class="menu-item" onclick="nextWallpaper()"><i class="fas fa-image"></i> Cambiar Fondo</div>
                    <div class="h-[0.5px] bg-white/10 my-1 mx-2"></div>
                    <div class="menu-item text-red-400" onclick="Desktop.logout()"><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</div>
                `;
            }

            menu.style.display = 'block';
            menu.style.left = e.pageX + 'px';
            menu.style.top = e.pageY + 'px';
        });
    },

    // --- AUTH ---
    checkAuth: () => {
        const isAuthed = localStorage.getItem('kevinos-auth');
        if (isAuthed === 'true') {
            const lock = document.getElementById('lock-screen');
            if (lock) {
                lock.style.display = 'none';
                // We might need to dispatch unlocked event manually if logic depends on it
                setTimeout(() => window.dispatchEvent(new CustomEvent('system:unlocked')), 100);
            }
        }
    },

    login: () => {
        localStorage.setItem('kevinos-auth', 'true');
    },

    logout: () => {
        localStorage.removeItem('kevinos-auth');
        window.location.reload();
    },

    // --- DRAG & DROP ---
    initDragAndDrop: () => {
        const icons = document.querySelectorAll('#desktop-icons > div');
        const container = document.getElementById('desktop-icons');

        // Restore positions
        const savedPositions = JSON.parse(localStorage.getItem('kevinos-icons') || '{}');

        icons.forEach((icon, index) => {
            // Identifier based on text content or index
            const id = icon.querySelector('span').innerText;

            // Make sure parent is capable of absolute positioning children effectively
            // But we are dragging within a flex container initially. 
            // We need to switch to absolute positioning for drag to work freely.
            // For this simple implementation, let's keep it simple.

            icon.onmousedown = (e) => Desktop.dragIcon(e, icon, id);

            if (savedPositions[id]) {
                icon.style.position = 'absolute';
                icon.style.left = savedPositions[id].x + 'px';
                icon.style.top = savedPositions[id].y + 'px';
            }
        });
    },

    dragIcon: (e, icon, id) => {
        e.stopPropagation(); // Don't trigger desktop click

        let shiftX = e.clientX - icon.getBoundingClientRect().left;
        let shiftY = e.clientY - icon.getBoundingClientRect().top;

        icon.style.position = 'absolute';

        function moveAt(pageX, pageY) {
            let x = pageX - shiftX;
            let y = pageY - shiftY;
            icon.style.left = x + 'px';
            icon.style.top = y + 'px';
        }

        // moveAt(e.pageX, e.pageY);

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        icon.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            icon.onmouseup = null;

            // Save position
            const saved = JSON.parse(localStorage.getItem('kevinos-icons') || '{}');
            saved[id] = {
                x: parseInt(icon.style.left),
                y: parseInt(icon.style.top)
            };
            localStorage.setItem('kevinos-icons', JSON.stringify(saved));
        };

        // Also catch mouseup on document in case user releases outside icon
        document.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            document.onmouseup = null;
        };

        icon.ondragstart = function () {
            return false;
        };
    },

    setupContextMenu: () => {
        const menu = document.getElementById('context-menu');

        // Hide on click elsewhere
        document.addEventListener('click', () => {
            if (menu) menu.style.display = 'none';
        });

        // Icon Context Menu
        const icons = document.querySelectorAll('.desktop-icon, .launchpad-item'); // Catch generic
        // Actually better to bind contextmenu to specific containers to be safe

        // Desktop Icons logic already binds contextmenu via HTML or main listener?
        // Let's rely on event bubbling.
    }
};

// Global for Info Popup
function openInfo(title, desc, iconName) {
    toggleLaunchpad(); // Close launchpad

    setTimeout(() => {
        openApp('info');
        const win = document.getElementById('info-window');
        if (!win) return;

        win.querySelector('#info-title').innerText = title;
        win.querySelector('#info-desc').innerText = desc;

        // Handle vector vs image icons
        const iconImg = win.querySelector('#info-icon');

        // Try to match icon logic or pass full url
        if (iconName.includes('http')) {
            iconImg.src = iconName;
        } else {
            // Assume icons8
            iconImg.src = `https://img.icons8.com/fluency/96/${iconName}.png`;
            // For fontawesome we'd need a different structure, let's stick to images for skills for now
            if (iconName.includes('text-')) {
                // It's a color class? Mock for now
                iconImg.src = 'https://img.icons8.com/fluency/96/info.png';
            }
        }
    }, 200);
}
