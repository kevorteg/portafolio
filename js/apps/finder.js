const projectsData = {
    'portfolio': {
        title: "Portafolio Personal",
        desc: "Este mismo sitio web. Una emulación de macOS construida con HTML, CSS, y Vanilla JS.",
        tech: ["HTML5", "TailwindCSS", "JavaScript"],
        link: "www.kevinOS.dev"
    },
    'game': {
        title: "Space Adventure Game",
        desc: "Juego de naves espaciales en 2D utilizando Canvas API.",
        tech: ["Canvas API", "JS Classes", "Game Loop"],
        link: "www.space-game.demo"
    },
    'ecommerce': {
        title: "ShopAPI Rest",
        desc: "API completa para e-commerce con autenticación JWT y pasarela de pagos.",
        tech: ["Node.js", "Express", "MongoDB"],
        link: "api.shop-demo.com"
    },
    'ai': {
        title: "ChatBot Assistant",
        desc: "Asistente virtual integrado que responde preguntas sobre mí utilizando Gemini API.",
        tech: ["Gemini API", "Fetch", "Async/Await"],
        link: "ai.kevin-assistant.com"
    }
};

const folderData = {
    'about': {
        title: "Sobre Mí",
        items: [
            { name: "Mi Perfil.cv", img: "https://img.icons8.com/fluency/96/resume-website.png", action: "PreviewApp.open('profile')" },
            { name: "Mi Setup.jpg", img: "https://img.icons8.com/fluency/96/monitor.png", action: "PreviewApp.open('setup')" },
            { name: "Playlist.mp3", img: "https://img.icons8.com/fluency/96/spotify.png", action: "openApp('music')" },
            { name: "Contactame.msg", img: "https://img.icons8.com/fluency/96/mail.png", action: "openApp('mail')" }
        ]
    },
    'design': {
        title: "Diseño y Creatividad",
        items: [
            { name: "Photoshop", img: "https://img.icons8.com/fluency/96/adobe-photoshop.png" },
            { name: "Illustrator", img: "https://img.icons8.com/fluency/96/adobe-illustrator.png" },
            { name: "Blender", img: "https://img.icons8.com/fluency/96/blender-3d.png" },
            { name: "Premiere", img: "https://img.icons8.com/fluency/96/adobe-premiere-pro.png" },
            { name: "DaVinci", img: "https://img.icons8.com/fluency/96/video-editing.png" },
            { name: "Canva", img: "https://img.icons8.com/fluency/96/canva.png" }
        ]
    },
    'programming': {
        title: "Desarrollo y Código",
        items: [
            { name: "HTML5", img: "https://img.icons8.com/color/96/html-5--v1.png" },
            { name: "CSS3", img: "https://img.icons8.com/color/96/css3.png" },
            { name: "JavaScript", img: "https://img.icons8.com/color/96/javascript--v1.png" },
            { name: "Python", img: "https://img.icons8.com/color/96/python--v1.png" },
            { name: "VS Code", img: "https://img.icons8.com/fluency/96/visual-studio-code-2019.png" },
            { name: "Git", img: "https://img.icons8.com/color/96/git.png" }
        ]
    },
    'ai': {
        title: "Inteligencia Artificial",
        items: [
            { name: "ChatGPT", img: "https://img.icons8.com/fluency/96/chatgpt.png" },
            { name: "Gemini", img: "https://img.icons8.com/fluency/96/google-logo.png" }, // Fallback for Gemini
            { name: "Claude", img: "https://img.icons8.com/fluency/96/brain.png" }, // Fallback
            { name: "Copilot", img: "https://img.icons8.com/fluency/96/microsoft-copilot.png" },
            { name: "Midjourney", img: "https://img.icons8.com/fluency/96/midjourney.png" }
        ]
    }
};

// Ensure we export or expose these if needed, but for now they are global
// Initial render reference
let currentFolder = 'about';

function openFolder(folderId) {
    if (!folderData[folderId]) return;

    currentFolder = folderId;
    openApp('finder');
    renderFinderWindow();
}

function renderFinderWindow() {
    const sidebarList = document.getElementById('finder-sidebar-list');
    const contentGrid = document.getElementById('finder-content-grid');

    // Render Sidebar
    if (sidebarList) {
        sidebarList.innerHTML = Object.keys(folderData).map(key => {
            const folder = folderData[key];
            const isActive = key === currentFolder;
            const bgClass = isActive ? 'bg-blue-500 text-white shadow-sm' : 'hover:bg-black/5 text-gray-700';
            const iconClass = isActive ? 'text-white' : 'text-blue-500';

            // Map keys to specific icons if desired, or generic
            let icon = 'fa-folder';
            if (key === 'design') icon = 'fa-palette';
            if (key === 'programming') icon = 'fa-code';
            if (key === 'ai') icon = 'fa-brain';
            if (key === 'about') icon = 'fa-user-circle';
            if (key === 'projects') icon = 'fa-briefcase';

            return `
                <div onclick="openFolder('${key}')" class="flex items-center gap-2 p-2 rounded-md cursor-pointer transition-all ${bgClass}">
                    <i class="fas ${icon} ${isActive ? '' : 'text-blue-500'}"></i> 
                    <span class="capitalize">${folder.title.split(' ')[0]}</span>
                </div>
            `;
        }).join('');
    }

    // Render Content
    if (contentGrid && folderData[currentFolder]) {
        contentGrid.innerHTML = folderData[currentFolder].items.map(item => `
            <div class="flex flex-col items-center gap-3 group cursor-pointer p-4 hover:bg-black/5 rounded-xl transition-all"
                ${item.action ? `ondblclick="${item.action}"` : ''}>
                <div class="w-16 h-16 flex items-center justify-center bg-white rounded-2xl shadow-sm group-hover:shadow-md transition-all p-2">
                    <img src="${item.img}" class="w-full h-full object-contain" onerror="this.src='https://img.icons8.com/color/96/image.png'">
                </div>
                <span class="text-xs font-medium text-center text-gray-700 group-hover:text-black w-full truncate px-1">${item.name}</span>
            </div>
        `).join('');
    }
}

function openProject(id) {
    const project = projectsData[id];
    if (!project) return;

    openApp('safari');

    const urlBar = document.querySelector('#safari-window .bg-white\\/10');
    if (urlBar) urlBar.innerText = project.link;

    const content = document.querySelector('.safari-content');
    if (content) {
        content.innerHTML = `
            <div class="p-10 flex flex-col items-center text-center animate-fade-in">
                <div class="w-full max-w-2xl bg-gray-50 rounded-2xl p-10 shadow-sm border border-gray-100">
                    <div class="mb-6 flex justify-center">
                        <div class="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center text-white text-4xl shadow-lg">
                            <i class="fas fa-cube"></i>
                        </div>
                    </div>
                    <h1 class="text-4xl font-bold mb-4 text-gray-900">${project.title}</h1>
                    <p class="text-gray-500 mb-8 text-lg leading-relaxed">${project.desc}</p>
                    
                    <div class="flex gap-4 justify-center mb-10 flex-wrap">
                        ${project.tech.map(t => `<span class="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 shadow-sm">${t}</span>`).join('')}
                    </div>
                    
                    <button class="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30">
                        Ver Demo
                    </button>
                </div>
            </div>
        `;
    }
}
