// Custom Wallpapers from local folder
const wallies = [
    'image/wallpaper/1.jpg',
    'image/wallpaper/2.jpg',
    'image/wallpaper/3.jpg',
    'image/wallpaper/4.jpg',
    'image/wallpaper/5.jpg'
];

let activeTab = 'general';

function renderSettings() {
    let win = document.getElementById('settings-window');
    if (!win) {
        win = document.createElement('div');
        win.id = 'settings-window';
        win.className = 'window';
        // Force basic styles
        win.style.width = '650px';
        win.style.height = '450px';
        win.style.top = '100px';
        win.style.left = '200px';
        win.style.backgroundColor = '#1e1e1e'; // Force background color
        win.style.display = 'flex';
        win.style.flexDirection = 'column';
        win.setAttribute('onmousedown', "focusApp('settings')");
        document.getElementById('windows-container').appendChild(win);
        dragElement(win.querySelector('.window-header'));
    }

    // Ensure display is flex column
    win.style.display = 'flex';
    win.style.flexDirection = 'column';

    // Header (Fixed height)
    const headerHtml = `
        <div class="window-header" style="flex: 0 0 30px; min-height: 30px;" onmousedown="dragElement(this.parentElement)">
            <div class="traffic-lights">
                <div class="light light-close" onclick="closeApp('settings')"><i class="fas fa-times"></i></div>
                <div class="light light-min" onclick="minimizeApp('settings')"><i class="fas fa-minus"></i></div>
                <div class="light light-max" onclick="maximizeApp('settings')"><i class="fas fa-expand"></i></div>
            </div>
            <span style="color:white; font-size:12px; margin-left:10px;">Ajustes del Sistema</span>
        </div>
    `;

    // Content (Fills rest)
    // using Grid for Sidebar + Content
    const contentHtml = `
        <div style="flex: 1; display: grid; grid-template-columns: 180px 1fr; height: 100%; overflow: hidden;">
            <!-- Sidebar -->
            <div style="background: rgba(255,255,255,0.05); border-right: 1px solid rgba(255,255,255,0.1); padding: 15px; overflow-y: auto;">
                 <div style="display: flex; flex-direction: column; gap: 5px;">
                    ${renderSidebarItem('general', 'General', 'user')}
                    ${renderSidebarItem('wallpapers', 'Fondo', 'image')}
                    ${renderSidebarItem('storage', 'Almacenamiento', 'hdd')}
                    ${renderSidebarItem('system', 'Sistema', 'cogs')}
                </div>
            </div>
            
            <!-- Main View -->
            <div style="padding: 20px; overflow-y: auto; background: #1e1e1e; color: white;">
                ${renderTabContent()}
            </div>
        </div>
    `;

    win.innerHTML = headerHtml + contentHtml;

    // Re-bind drag just in case
    const newHeader = win.querySelector('.window-header');
    if (newHeader) newHeader.onmousedown = (e) => dragElement(win);
}

function renderSidebarItem(id, label, icon) {
    const activeClass = activeTab === id ? 'bg-blue-600' : 'hover:bg-white/10';
    return `
        <div onclick="switchSettingsTab('${id}')" 
             class="cursor-pointer px-3 py-2 rounded-md flex items-center gap-3 text-sm transition-colors ${activeClass}">
            <i class="fas fa-${icon} w-5 text-center"></i> ${label}
        </div>
    `;
}

function switchSettingsTab(tab) {
    activeTab = tab;
    renderSettings();
}

function renderTabContent() {
    switch (activeTab) {
        case 'general':
            const currentName = localStorage.getItem('kevinos-username') || 'Kevin';
            return `
                <h2 class="text-xl font-bold mb-6">General</h2>
                <div class="flex flex-col gap-4">
                    <div>
                        <label class="block text-xs uppercase opacity-50 mb-1">Nombre de Usuario</label>
                        <input type="text" value="${currentName}" id="settings-username"
                            class="w-full bg-white/10 border border-white/20 rounded px-3 py-2 outline-none focus:border-blue-500"
                            onchange="saveUsername(this.value)">
                    </div>
                </div>
            `;
        case 'wallpapers':
            const gridHTML = wallies.map((url) => `
                <div class="wallpaper-thumb h-24 bg-cover bg-center rounded-lg cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all" 
                     style="background-image: url('${url}')" 
                     onclick="setWallpaper('${url}')"></div>
            `).join('');

            return `
                <h2 class="text-xl font-bold mb-6">Fondo de Pantalla</h2>
                <div class="flex flex-col gap-6">
                    <div class="grid grid-cols-2 gap-4">
                        ${gridHTML}
                    </div>
                    
                    <div class="h-[1px] bg-white/10 w-full"></div>

                    <div class="bg-white/5 border border-dashed border-white/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition"
                         onclick="document.getElementById('wall-upload').click()">
                        <i class="fas fa-cloud-upload-alt text-2xl mb-2 opacity-50"></i>
                        <span class="text-xs font-bold">Subir otra imagen</span>
                    </div>
                    <input type="file" id="wall-upload" hidden accept="image/*" onchange="uploadWallpaper(this)">
                </div>
            `;
        case 'storage':
            return `
                <h2 class="text-xl font-bold mb-6">Almacenamiento</h2>
                <div class="bg-white/5 p-6 rounded-xl text-center">
                    <i class="fas fa-hdd text-4xl mb-4 text-gray-400"></i>
                    <div class="text-lg font-bold">Macintosh HD</div>
                    <div class="text-sm opacity-50 mb-4">245 GB disponibles de 512 GB</div>
                    
                    <div class="w-full h-4 bg-white/10 rounded-full overflow-hidden flex">
                        <div class="h-full bg-blue-500 w-[40%]"></div>
                        <div class="h-full bg-yellow-500 w-[15%]"></div>
                        <div class="h-full bg-green-500 w-[10%]"></div>
                    </div>
                    <div class="flex justify-between text-[10px] mt-2 opacity-60">
                        <span>Apps</span>
                        <span>Docs</span>
                        <span>Sistema</span>
                        <span>Libre</span>
                    </div>
                </div>
            `;
        case 'system':
            return `
                <h2 class="text-xl font-bold mb-6">Sistema</h2>
                <div class="flex flex-col gap-4">
                    <button onclick="localStorage.clear(); window.location.reload();" 
                            class="bg-red-500/20 text-red-400 border border-red-500/50 px-4 py-3 rounded-lg font-bold flex items-center gap-3 hover:bg-red-500 hover:text-white transition">
                        <i class="fas fa-trash-alt"></i> Restaurar de Fabrica
                    </button>
                    <button onclick="Desktop.logout()" 
                            class="bg-white/5 px-4 py-3 rounded-lg font-bold flex items-center gap-3 hover:bg-white/10 transition">
                        <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
                    </button>
                    <div class="text-[10px] opacity-30 text-center mt-8">
                        KevinOS v4.0 (Build 2025)<br>
                        Designed by Kevin & Antigravity AI
                    </div>
                </div>
            `;
    }
}

function setWallpaper(url) {
    document.getElementById('desktop').style.backgroundImage = `url('${url}')`;
    document.getElementById('lock-screen').style.backgroundImage = `url('${url}')`;
    localStorage.setItem('kevinos-wallpaper', url);
}

// Initial cleanup of old wallies if needed
(function () {
    const current = localStorage.getItem('kevinos-wallpaper');
    // Force reset if it's an old Unsplash URL or empty
    if (!current || current.includes('unsplash') || current.includes('http')) {
        const defaultWall = 'image/wallpaper/princiapl.png';
        localStorage.setItem('kevinos-wallpaper', defaultWall);
        if (document.getElementById('desktop')) {
            document.getElementById('desktop').style.backgroundImage = `url('${defaultWall}')`;
        }
    }
})();

function uploadWallpaper(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            setWallpaper(e.target.result);
            if (window.Notify) window.Notify.show('Fondo Actualizado', 'Tu nueva imagen ha sido establecida.', 'fa-image');
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function saveUsername(name) {
    localStorage.setItem('kevinos-username', name);
    // Update lock screen immediately if visible/exists
    const lockName = document.getElementById('lock-username');
    if (lockName) lockName.innerText = name;
}

function loadSettings() {
    const saved = localStorage.getItem('kevinos-wallpaper');
    if (saved) {
        document.getElementById('desktop').style.backgroundImage = `url('${saved}')`;
        const lock = document.getElementById('lock-screen');
        if (lock) lock.style.backgroundImage = `url('${saved}')`;
    } else {
        // Default Local
        const defaultWall = 'image/wallpaper/princiapl.png';
        document.getElementById('desktop').style.backgroundImage = `url('${defaultWall}')`;
        const lock = document.getElementById('lock-screen');
        if (lock) lock.style.backgroundImage = `url('${defaultWall}')`;
    }

    // Load Username
    const savedName = localStorage.getItem('kevinos-username');
    if (savedName) {
        const lockName = document.getElementById('lock-username');
        if (lockName) lockName.innerText = savedName;
    }
}

function openSettings() {
    if (!document.getElementById('settings-window')) {
        renderSettings();
    }
    openApp('settings');
}
