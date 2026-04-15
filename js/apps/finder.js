// ─────────────────────────────────────────────────────────────────────────────
// FINDER — Tabs + Toolbar (Sort / View / Filter) + localStorage
// ─────────────────────────────────────────────────────────────────────────────

const projectsData = {
    'portafolio': {
        title: "KevinOS — Portafolio Interactivo",
        desc: "Este mismo portafolio. Una emulación de macOS completa construida con HTML, TailwindCSS y Vanilla JS puro. Incluye sistema de ventanas, dock, terminal, juegos, reproductor de música y un chatbot con Gemini API.",
        tech: ["HTML5", "TailwindCSS", "JavaScript", "Canvas API"],
        link: "https://github.com/kevorteg/portafolio",
        demo: "https://kevorteg.github.io/portafolio/",
        lang: "JavaScript", stars: 1, langColor: "#f1e05a"
    },
    'cinegram-Bot': {
        title: "Cinegram Bot",
        desc: "Bot de Telegram para la gestión inteligente de películas. Permite buscar, registrar y recibir recomendaciones de películas directamente desde Telegram usando la API de TMDB.",
        tech: ["Python", "python-telegram-bot", "TMDB API", "Async"],
        link: "https://github.com/kevorteg/cinegram-Bot",
        demo: null, lang: "Python", stars: 1, langColor: "#3572A5"
    },
    'ecommerce-catalog-scraper': {
        title: "E-commerce Catalog Scraper",
        desc: "Herramienta de scraping para extracción de catálogos de tiendas e-commerce. Automatiza la recolección masiva de datos de productos, precios e imágenes desde múltiples fuentes.",
        tech: ["Python", "BeautifulSoup", "Requests", "CSV/JSON"],
        link: "https://github.com/kevorteg/ecommerce-catalog-scraper",
        demo: null, lang: "Python", stars: 0, langColor: "#3572A5"
    },
    'misionjuvenild5': {
        title: "Mision Juvenil D5",
        desc: "Sitio web oficial para Misión Juvenil Distrito 5. Plataforma de comunicación para la comunidad juvenil cristiana, con información de eventos, noticias y recursos digitales.",
        tech: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
        link: "https://github.com/kevorteg/misionjuvenild5",
        demo: "https://kevorteg.github.io/misionjuvenild5/",
        lang: "HTML", stars: 0, langColor: "#e34c26"
    },
    'telegram-media-downloader': {
        title: "Telegram Media Downloader",
        desc: "Bot y script para descarga masiva de medios desde canales y grupos de Telegram. Soporta videos, fotos, documentos y audio con gestión de errores y reintentos automáticos.",
        tech: ["Python", "Telethon", "asyncio", "MIT License"],
        link: "https://github.com/kevorteg/telegram-media-downloader",
        demo: null, lang: "Python", stars: 0, langColor: "#3572A5"
    },
    'Universal-Downloader-Pro': {
        title: "Universal Downloader Pro",
        desc: "Aplicación descargadora multi-plataforma profesional. Soporta YouTube, Spotify, y múltiples fuentes. Interfaz moderna con Next.js y backend con soporte de formatos de alta calidad.",
        tech: ["TypeScript", "Next.js", "yt-dlp", "Vercel"],
        link: "https://github.com/kevorteg/Universal-Downloader-Pro",
        demo: "https://universal-downloader-pro.vercel.app",
        lang: "TypeScript", stars: 0, langColor: "#2b73af"
    },
    'universal-media-bot': {
        title: "UMO-Core — Media Orchestrator",
        desc: "Orquestador Monolítico Avanzado para el ciclo de vida de activos digitales. Integra descubrimiento heurístico con TMDB API, descarga P2P, y automatización de bibliotecas multimedia vía Flask-SocketIO.",
        tech: ["Python", "Flask-SocketIO", "TMDB API", "qBittorrent API"],
        link: "https://github.com/kevorteg/universal-media-bot",
        demo: null, lang: "Python", stars: 0, langColor: "#3572A5"
    },
    'wp-api-protection': {
        title: "WP API Protection",
        desc: "Suite de seguridad profesional para WordPress. Protege la REST API, bloquea enumeración de usuarios, implementa Geo-Blocking real, cabeceras de seguridad y registros detallados de intrusiones. Listo para WordPress.org.",
        tech: ["PHP 8", "WordPress Plugin", "REST API", "Security Headers"],
        link: "https://github.com/kevorteg/wp-api-protection",
        demo: null, lang: "PHP", stars: 1, langColor: "#4F5D95"
    }
};

const folderData = {
    'about': {
        title: "Sobre Mí", icon: 'fa-user-circle',
        items: [
            { name: "Mi Perfil.cv",    img: "https://img.icons8.com/fluency/96/resume-website.png", action: "PreviewApp.open('profile')", type: 'doc' },
            { name: "Mi Setup.jpg",    img: "https://img.icons8.com/fluency/96/monitor.png",        action: "PreviewApp.open('setup')", type: 'img' },
            { name: "Playlist.mp3",    img: "https://img.icons8.com/fluency/96/spotify.png",        action: "openApp('music')", type: 'audio' },
            { name: "Contactame.msg",  img: "https://img.icons8.com/fluency/96/mail.png",           action: "openApp('mail')", type: 'msg' }
        ]
    },
    'design': {
        title: "Diseño y Creatividad", icon: 'fa-palette',
        items: [
            { name: "Photoshop",   img: "https://img.icons8.com/fluency/96/adobe-photoshop.png",   type: 'tool' },
            { name: "Illustrator", img: "https://img.icons8.com/fluency/96/adobe-illustrator.png", type: 'tool' },
            { name: "Blender",     img: "https://img.icons8.com/fluency/96/blender-3d.png",        type: 'tool' },
            { name: "Premiere",    img: "https://img.icons8.com/fluency/96/adobe-premiere-pro.png",type: 'tool' },
            { name: "DaVinci",     img: "https://img.icons8.com/fluency/96/video-editing.png",     type: 'tool' },
            { name: "Canva",       img: "https://img.icons8.com/fluency/96/canva.png",             type: 'tool' }
        ]
    },
    'programming': {
        title: "Desarrollo y Código", icon: 'fa-code',
        items: [
            { name: "HTML5",       img: "https://img.icons8.com/color/96/html-5--v1.png",          type: 'code' },
            { name: "CSS3",        img: "https://img.icons8.com/color/96/css3.png",                type: 'code' },
            { name: "JavaScript",  img: "https://img.icons8.com/color/96/javascript--v1.png",      type: 'code' },
            { name: "Python",      img: "https://img.icons8.com/color/96/python--v1.png",          type: 'code' },
            { name: "VS Code",     img: "https://img.icons8.com/fluency/96/visual-studio-code-2019.png", type: 'tool' },
            { name: "Git",         img: "https://img.icons8.com/color/96/git.png",                 type: 'tool' }
        ]
    },
    'ai': {
        title: "Inteligencia Artificial", icon: 'fa-brain',
        items: [
            { name: "ChatGPT",   img: "https://img.icons8.com/fluency/96/chatgpt.png",          type: 'tool' },
            { name: "Gemini",    img: "https://img.icons8.com/fluency/96/google-logo.png",      type: 'tool' },
            { name: "Claude",    img: "https://img.icons8.com/fluency/96/brain.png",            type: 'tool' },
            { name: "Copilot",   img: "https://img.icons8.com/fluency/96/microsoft-copilot.png",type: 'tool' },
            { name: "Midjourney",img: "https://img.icons8.com/fluency/96/midjourney.png",       type: 'tool' }
        ]
    },
    'projects': {
        title: "Proyectos GitHub", icon: 'fa-brands fa-github',
        items: Object.keys(projectsData).map(key => ({
            name: projectsData[key].title.replace(/[^\x00-\x7F]+$/, '').trim(),
            img: _getProjectIcon(key),
            action: `openProject('${key}')`,
            type: 'project',
            lang: projectsData[key].lang
        }))
    }
};

function _getProjectIcon(key) {
    const icons = { JavaScript:'https://img.icons8.com/color/96/javascript--v1.png', TypeScript:'https://img.icons8.com/color/96/typescript.png', Python:'https://img.icons8.com/color/96/python--v1.png', PHP:'https://img.icons8.com/offices/96/php-logo.png', HTML:'https://img.icons8.com/color/96/html-5--v1.png' };
    return icons[projectsData[key].lang] || 'https://img.icons8.com/fluency/96/source-code.png';
}

// ─── Tab State ────────────────────────────────────────────────────────────────
let finderTabs = [];       // [{id, folderId, label}]
let finderActiveTab = 0;
let finderHistory = [[]];  // per-tab history
let finderHistIdx  = [0];
let finderViewMode = localStorage.getItem('finder-view') || 'grid'; // grid|list|small
let finderSortMode = localStorage.getItem('finder-sort') || 'none';
let finderFilterMode = 'all';
let currentFolder = 'projects';

// ─── Open / Bootstrap ─────────────────────────────────────────────────────────
function openFolder(folderId) {
    if (!folderData[folderId]) return;
    currentFolder = folderId;
    openApp('finder');

    if (finderTabs.length === 0) {
        finderTabs.push({ id: Date.now(), folderId, label: folderData[folderId].title });
        finderHistory  = [[folderId]];
        finderHistIdx  = [0];
        finderActiveTab = 0;
    } else {
        // Navigate current tab to folder
        finderNavigateTo(folderId);
    }
    renderFinderWindow();
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function finderNavigateTo(folderId) {
    const i = finderActiveTab;
    finderHistory[i] = finderHistory[i].slice(0, finderHistIdx[i] + 1);
    finderHistory[i].push(folderId);
    finderHistIdx[i] = finderHistory[i].length - 1;
    currentFolder = folderId;
    finderTabs[i].folderId = folderId;
    finderTabs[i].label = folderData[folderId]?.title || folderId;
    renderFinderWindow();
}
function finderNavBack() {
    const i = finderActiveTab;
    if (finderHistIdx[i] > 0) { finderHistIdx[i]--; currentFolder = finderHistory[i][finderHistIdx[i]]; finderTabs[i].folderId = currentFolder; renderFinderWindow(); }
}
function finderNavForward() {
    const i = finderActiveTab;
    if (finderHistIdx[i] < finderHistory[i].length - 1) { finderHistIdx[i]++; currentFolder = finderHistory[i][finderHistIdx[i]]; finderTabs[i].folderId = currentFolder; renderFinderWindow(); }
}
function finderNavUp() { openFolder('about'); } // Go to root

// ─── New Tab ──────────────────────────────────────────────────────────────────
function finderNewTab(folderId = 'projects') {
    const f = folderData[folderId];
    finderTabs.push({ id: Date.now(), folderId, label: f?.title || 'Nueva pestaña' });
    finderHistory.push([folderId]);
    finderHistIdx.push(0);
    finderActiveTab = finderTabs.length - 1;
    currentFolder = folderId;
    renderFinderWindow();
}
function finderCloseTab(idx, e) {
    e.stopPropagation();
    finderTabs.splice(idx, 1);
    finderHistory.splice(idx, 1);
    finderHistIdx.splice(idx, 1);
    if (finderTabs.length === 0) { closeApp('finder'); return; }
    finderActiveTab = Math.min(finderActiveTab, finderTabs.length - 1);
    currentFolder = finderTabs[finderActiveTab].folderId;
    renderFinderWindow();
}
function finderSelectTab(idx) {
    finderActiveTab = idx;
    currentFolder = finderTabs[idx].folderId;
    renderFinderWindow();
}

// ─── Sort / View / Filter ─────────────────────────────────────────────────────
function finderSort(mode) {
    finderSortMode = mode;
    localStorage.setItem('finder-sort', mode);
    closeAllDropdowns();
    renderFinderContent();
}
function finderSetView(mode) {
    finderViewMode = mode;
    localStorage.setItem('finder-view', mode);
    closeAllDropdowns();
    renderFinderContent();
}
function finderFilter(mode) {
    finderFilterMode = mode;
    closeAllDropdowns();
    renderFinderContent();
}
function finderSearch(query) {
    finderFilterMode = query ? '_search_' + query.toLowerCase() : 'all';
    renderFinderContent();
}
function toggleDropdown(id) {
    closeAllDropdowns();
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden');
    event.stopPropagation();
}
function closeAllDropdowns() {
    document.querySelectorAll('.finder-dropdown').forEach(d => d.classList.add('hidden'));
}
document.addEventListener('click', closeAllDropdowns);

// ─── Render ───────────────────────────────────────────────────────────────────
function renderFinderWindow() {
    renderFinderTabs();
    renderFinderBreadcrumb();
    renderFinderSidebar();
    renderFinderContent();
}

function renderFinderTabs() {
    const strip = document.getElementById('finder-tabs');
    if (!strip) return;
    strip.innerHTML = finderTabs.map((tab, i) => `
        <div class="finder-tab ${i === finderActiveTab ? 'active' : ''}" onclick="finderSelectTab(${i})">
            <i class="fas ${folderData[tab.folderId]?.icon || 'fa-folder'}" style="font-size:10px;opacity:0.6"></i>
            ${tab.label.split(' ')[0]}
            <span class="finder-tab-close" onclick="finderCloseTab(${i}, event)">✕</span>
        </div>
    `).join('');
}

function renderFinderBreadcrumb() {
    const bc = document.getElementById('finder-breadcrumb');
    if (bc) bc.textContent = folderData[currentFolder]?.title || currentFolder;
}

function renderFinderSidebar() {
    const sidebarList = document.getElementById('finder-sidebar-list');
    if (!sidebarList) return;
    sidebarList.innerHTML = Object.keys(folderData).map(key => {
        const folder = folderData[key];
        const isActive = key === currentFolder;
        return `<div onclick="finderNavigateTo('${key}')"
            class="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-all ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-black/5 text-gray-600'}">
            <i class="fas ${folder.icon || 'fa-folder'}" style="font-size:11px"></i>
            <span class="truncate">${folder.title.split(' ')[0]}</span>
        </div>`;
    }).join('');
}

function renderFinderContent() {
    const grid = document.getElementById('finder-content-grid');
    const statusbar = document.getElementById('finder-item-count');
    if (!grid || !folderData[currentFolder]) return;

    let items = [...folderData[currentFolder].items];

    // Filter
    if (finderFilterMode === 'code')   items = items.filter(i => ['JavaScript','TypeScript','PHP','HTML','code'].some(t => (i.type||'').includes(t.toLowerCase()) || (i.lang||'').includes(t)));
    if (finderFilterMode === 'design') items = items.filter(i => (i.type||'').includes('tool') || (i.name||'').match(/photo|illus|blend|prem|canva/i));
    if (finderFilterMode === 'python') items = items.filter(i => (i.lang||'') === 'Python' || (i.name||'').match(/python/i));
    if (finderFilterMode.startsWith('_search_')) {
        const q = finderFilterMode.replace('_search_', '');
        items = items.filter(i => (i.name||'').toLowerCase().includes(q) || (i.lang||'').toLowerCase().includes(q));
    }

    // Sort
    if (finderSortMode === 'name') items.sort((a,b) => a.name.localeCompare(b.name));
    if (finderSortMode === 'type') items.sort((a,b) => (a.type||'').localeCompare(b.type||''));

    if (statusbar) statusbar.textContent = `${items.length} elemento${items.length !== 1 ? 's' : ''}`;

    // View
    if (finderViewMode === 'list') {
        grid.className = 'p-4 overflow-auto custom-scrollbar flex-1 finder-list-view';
        grid.innerHTML = `
            <div class="finder-list-item font-bold text-gray-400 text-[10px] uppercase tracking-wider border-b border-gray-100 pb-1 mb-1">
                <div style="width:24px"></div>
                <div class="finder-list-col">Nombre</div>
                <div class="finder-list-col lang">Lenguaje</div>
            </div>` +
            items.map(item => `
                <div class="finder-list-item" ${item.action ? `ondblclick="${item.action}"` : ''}>
                    <img src="${item.img}" onerror="this.src='https://img.icons8.com/color/96/image.png'">
                    <div class="finder-list-col">${item.name}</div>
                    <div class="finder-list-col lang">${item.lang || item.type || '—'}</div>
                </div>
            `).join('');
        return;
    }

    const cols = finderViewMode === 'small' ? 'grid-cols-6 gap-2' : 'grid-cols-4 gap-4';
    const iconSize = finderViewMode === 'small' ? 'w-10 h-10' : 'w-16 h-16';
    const textSize = finderViewMode === 'small' ? 'text-[10px]' : 'text-xs';

    grid.className = `p-6 overflow-auto custom-scrollbar grid ${cols} content-start flex-1`;
    grid.innerHTML = items.map(item => `
        <div class="flex flex-col items-center gap-2 group cursor-pointer p-3 hover:bg-black/5 rounded-xl transition-all"
            ${item.action ? `ondblclick="${item.action}"` : ''}>
            <div class="${iconSize} flex items-center justify-center bg-white rounded-2xl shadow-sm group-hover:shadow-md transition-all p-1.5">
                <img src="${item.img}" class="w-full h-full object-contain" onerror="this.src='https://img.icons8.com/color/96/image.png'">
            </div>
            <span class="${textSize} font-medium text-center text-gray-700 w-full truncate px-1">${item.name}</span>
        </div>
    `).join('');
}

// ─── Open Project in Safari ───────────────────────────────────────────────────
function openProject(id) {
    const project = projectsData[id];
    if (!project) return;
    openApp('safari');
    const urlBar = document.querySelector('#safari-window .bg-white\\/10');
    if (urlBar) urlBar.innerText = project.link.replace('https://', '');
    const content = document.querySelector('.safari-content');
    if (!content) return;
    const langBadge = `<span class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm"><span class="w-2.5 h-2.5 rounded-full inline-block" style="background:${project.langColor}"></span>${project.lang}</span>`;
    const starBadge = project.stars > 0 ? `<span class="inline-flex items-center gap-1 text-xs font-medium text-amber-600 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full shadow-sm"><i class="fas fa-star text-amber-400"></i> ${project.stars} star${project.stars > 1 ? 's' : ''}</span>` : '';
    const demoBtn = project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-500/20 text-sm"><i class="fas fa-external-link-alt text-xs"></i> Ver Demo en Vivo</a>` : '';
    content.innerHTML = `<div class="p-8 flex flex-col items-center text-center w-full"><div class="w-full max-w-2xl"><div class="mb-6 flex justify-center"><div class="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center text-white text-4xl shadow-xl shadow-gray-900/20"><i class="fab fa-github"></i></div></div><h1 class="text-3xl font-bold mb-3 text-gray-900">${project.title}</h1><div class="flex items-center justify-center gap-2 mb-6 flex-wrap">${langBadge}${starBadge}</div><p class="text-gray-500 mb-8 text-base leading-relaxed text-left bg-gray-50 rounded-xl p-4 border border-gray-100">${project.desc}</p><div class="mb-8"><h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Tecnologías</h3><div class="flex gap-2 justify-center flex-wrap">${project.tech.map(t=>`<span class="px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-xs font-semibold text-blue-700">${t}</span>`).join('')}</div></div><div class="flex gap-3 justify-center flex-wrap"><a href="${project.link}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-gray-700 transition-colors shadow-lg shadow-gray-900/20 text-sm"><i class="fab fa-github"></i> Ver en GitHub</a>${demoBtn}</div></div></div>`;
}
