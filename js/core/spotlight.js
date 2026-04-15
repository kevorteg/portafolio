// ─────────────────────────────────────────────────────────────────────────────
// SPOTLIGHT SEARCH ENGINE — KevinOS
// Busca en: apps, proyectos GitHub, skills/herramientas
// Atajo: Cmd+K / Ctrl+K  o  Cmd+Space / Ctrl+Space
// ─────────────────────────────────────────────────────────────────────────────

// ── Índice de búsqueda ──────────────────────────────────────────────────────
const SPOTLIGHT_INDEX = [
    // Apps del sistema
    { type: 'app', id: 'terminal', title: 'Terminal',   sub: 'Shell · Bash commands',        icon: '💻', color: '#1c1c1e', action: () => openApp('terminal') },
    { type: 'app', id: 'safari',   title: 'Safari',     sub: 'Navegador web',                 icon: '🌐', color: '#006AFF', action: () => openApp('safari') },
    { type: 'app', id: 'mail',     title: 'Mail',       sub: 'Enviar correo a Kevin',         icon: '✉️', color: '#1e78ff', action: () => openApp('mail') },
    { type: 'app', id: 'notes',    title: 'Notas',      sub: 'Notas personales',              icon: '📝', color: '#FFD60A', action: () => openApp('notes') },
    { type: 'app', id: 'music',    title: 'Música',     sub: 'Reproductor de audio',          icon: '🎵', color: '#FC3C44', action: () => openApp('music') },
    { type: 'app', id: 'tetris',   title: 'Tetris',     sub: 'Juego — GameOS',               icon: '🎮', color: '#30D158', action: () => openApp('tetris') },
    { type: 'app', id: 'calculator', title: 'Calculadora', sub: 'Cálculos rápidos',          icon: '🔢', color: '#FF9F0A', action: () => openApp('calculator') },
    { type: 'app', id: 'chatbot',  title: 'KevinBot',   sub: 'Chatbot con Gemini AI',         icon: '🤖', color: '#6E40C9', action: () => openApp('chatbot') },
    { type: 'app', id: 'finder',   title: 'Finder',     sub: 'Explorador de archivos',        icon: '📁', color: '#2D7FF9', action: () => openApp('finder') },
    { type: 'app', id: 'about',    title: 'Sobre Mí',   sub: 'Información sobre Kevin',       icon: '👤', color: '#666', action: () => openFolder('about') },

    // Links externos útiles
    { type: 'link', title: 'GitHub de Kevin',   sub: 'github.com/kevorteg', icon: '🐙', color: '#24292e', action: () => window.open('https://github.com/kevorteg', '_blank') },
    { type: 'link', title: 'LinkedIn',          sub: 'Perfil profesional', icon: '💼', color: '#0077b5', action: () => window.open('https://linkedin.com', '_blank') },

    // Skills / tecnologías (abren la carpeta correspondiente)
    { type: 'skill', title: 'HTML & CSS',     sub: 'Habilidad → Desarrollo', icon: '🎨', color: '#E34C26', action: () => openFolder('programming') },
    { type: 'skill', title: 'JavaScript',     sub: 'Habilidad → Desarrollo', icon: '⚡', color: '#F7DF1E', action: () => openFolder('programming') },
    { type: 'skill', title: 'Python',         sub: 'Habilidad → Desarrollo', icon: '🐍', color: '#3572A5', action: () => openFolder('programming') },
    { type: 'skill', title: 'TypeScript',     sub: 'Habilidad → Desarrollo', icon: '🔷', color: '#2b73af', action: () => openFolder('programming') },
    { type: 'skill', title: 'PHP',            sub: 'Habilidad → Desarrollo', icon: '🐘', color: '#4F5D95', action: () => openFolder('programming') },
    { type: 'skill', title: 'Diseño Gráfico', sub: 'Habilidad → Diseño',     icon: '🖌️', color: '#FF2D55', action: () => openFolder('design') },
    { type: 'skill', title: 'Photoshop',      sub: 'Herramienta → Diseño',   icon: '🅿️', color: '#001e36', action: () => openFolder('design') },
    { type: 'skill', title: 'Blender',        sub: 'Herramienta → Diseño 3D',icon: '🍊', color: '#ea7600', action: () => openFolder('design') },
    { type: 'skill', title: 'Inteligencia Artificial', sub: 'IA → ChatGPT, Gemini, Claude', icon: '🧠', color: '#6E40C9', action: () => openFolder('ai') },
    { type: 'skill', title: 'WordPress',      sub: 'CMS → Desarrollo web',   icon: '🌐', color: '#21759b', action: () => openFolder('programming') },
];

// Agregar todos los proyectos de GitHub al índice
function buildProjectIndex() {
    if (typeof projectsData === 'undefined') return;
    Object.keys(projectsData).forEach(key => {
        const p = projectsData[key];
        SPOTLIGHT_INDEX.push({
            type: 'project',
            title: p.title,
            sub: `${p.lang} · ${p.tech.slice(0, 2).join(', ')}`,
            icon: '📦',
            color: p.langColor,
            action: () => openProject(key)
        });
    });
}

// ── Lógica del buscador ──────────────────────────────────────────────────────
let spotlightResults = [];
let spotlightActive  = -1;

function openSpotlight() {
    buildProjectIndex(); // asegura que projectsData esté cargada
    const sp = document.getElementById('spotlight');
    const input = document.getElementById('spotlight-input');
    sp.style.display = 'flex';
    input.value = '';
    handleSpotlightSearch('');
    setTimeout(() => input.focus(), 50);
}

function closeSpotlight() {
    const sp = document.getElementById('spotlight');
    sp.style.display = 'none';
    document.getElementById('spotlight-results').classList.add('hidden');
    document.getElementById('spotlight-results').innerHTML = '';
}

function handleSpotlightSearch(query) {
    const resultsEl = document.getElementById('spotlight-results');
    query = query.trim().toLowerCase();
    spotlightActive = -1;

    if (!query) {
        // Mostrar atajos rápidos cuando no hay query
        renderSpotlightResults([
            { category: '⚡ Acceso Rápido', items: SPOTLIGHT_INDEX.filter(i => i.type === 'app').slice(0, 5) }
        ]);
        return;
    }

    // Búsqueda fuzzy simple
    const scored = SPOTLIGHT_INDEX
        .map(item => {
            const haystack = (item.title + ' ' + item.sub + ' ' + (item.type)).toLowerCase();
            let score = 0;
            if (item.title.toLowerCase().startsWith(query)) score = 10;
            else if (item.title.toLowerCase().includes(query)) score = 7;
            else if (haystack.includes(query)) score = 4;
            return { ...item, score };
        })
        .filter(i => i.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 12);

    if (scored.length === 0) {
        resultsEl.innerHTML = `<div class="text-center text-white/30 py-6 text-sm">Sin resultados para "<em>${query}</em>"</div>`;
        resultsEl.classList.remove('hidden');
        return;
    }

    // Agrupar por tipo
    const groups = {};
    const typeNames = { app: '🖥 Aplicaciones', project: '📦 Proyectos GitHub', skill: '🛠 Habilidades', link: '🔗 Links' };
    scored.forEach(item => {
        const cat = typeNames[item.type] || 'Otros';
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(item);
    });

    renderSpotlightResults(
        Object.keys(groups).map(cat => ({ category: cat, items: groups[cat] }))
    );
}

function renderSpotlightResults(groups) {
    const resultsEl = document.getElementById('spotlight-results');
    spotlightResults = [];
    let html = '';

    groups.forEach(g => {
        html += `<div class="spotlight-category">${g.category}</div>`;
        g.items.forEach(item => {
            const idx = spotlightResults.length;
            spotlightResults.push(item);
            html += `
                <div class="spotlight-item" id="spot-item-${idx}" onclick="runSpotlightAction(${idx})">
                    <div class="spotlight-item-icon" style="background:${item.color}20; color:${item.color}">
                        ${item.icon}
                    </div>
                    <div class="spotlight-item-text">
                        <div class="spotlight-item-title">${item.title}</div>
                        <div class="spotlight-item-sub">${item.sub}</div>
                    </div>
                    <i class="fas fa-arrow-right text-white/20 text-xs"></i>
                </div>`;
        });
    });

    resultsEl.innerHTML = html;
    resultsEl.classList.remove('hidden');
}

function runSpotlightAction(idx) {
    const item = spotlightResults[idx];
    if (!item) return;
    closeSpotlight();
    item.action();
}

function handleSpotlightKey(e) {
    if (e.key === 'Escape') { closeSpotlight(); return; }

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSpotlightActive(spotlightActive + 1);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSpotlightActive(spotlightActive - 1);
    } else if (e.key === 'Enter') {
        if (spotlightActive >= 0) runSpotlightAction(spotlightActive);
        else if (spotlightResults.length > 0) runSpotlightAction(0);
    }
}

function setSpotlightActive(idx) {
    const total = spotlightResults.length;
    if (total === 0) return;
    spotlightActive = ((idx % total) + total) % total;
    document.querySelectorAll('.spotlight-item').forEach((el, i) => {
        el.classList.toggle('spotlight-active', i === spotlightActive);
    });
    document.getElementById(`spot-item-${spotlightActive}`)?.scrollIntoView({ block: 'nearest' });
}

// ── Atajo de teclado: Cmd+K / Ctrl+K ────────────────────────────────────────
document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === ' ')) {
        e.preventDefault();
        const sp = document.getElementById('spotlight');
        if (sp.style.display === 'flex') closeSpotlight();
        else openSpotlight();
    }
    if (e.key === 'Escape') closeSpotlight();
});
