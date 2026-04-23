const Safari = {
    currentUrl: 'https://kevin.dev',
    // These could be your real projects
    favorites: [
        { name: 'Github', url: 'https://github.com', icon: 'fa-github' },
        { name: 'Portfolio', url: 'index.html', icon: 'fa-user' },
        { name: 'Google', url: 'https://google.com', icon: 'fa-google' },
        { name: 'Dribbble', url: 'https://dribbble.com', icon: 'fa-basketball-ball' }
    ],

    open: (url) => {
        openApp('safari');
        const display = document.getElementById('safari-url-display');
        const favicon = document.getElementById('safari-favicon');
        const content = document.querySelector('#safari-window .safari-content');

        if (url) {
            // Update display URL (Professional look)
            if (display) {
                let displayUrl = url.replace('https://', '').replace('http://', '').split('/')[0];
                
                // Specific mapping for portfolio projects
                if (url.includes('kadajim')) displayUrl = 'kevinos.dev/kadajim';
                else if (url.includes('jstenis')) displayUrl = 'kevinos.dev/jstenis';
                else if (url.includes('ascep')) displayUrl = 'kevinos.dev/ascep';
                else if (url.includes('bible-verbo')) displayUrl = 'kevinos.dev/bible-verbo';
                else if (url.includes('misionjuvenild5')) displayUrl = 'kevinos.dev/misionjuvenil';
                
                display.innerText = displayUrl;
                display.classList.remove('text-white/50');
                display.classList.add('text-white');
            }

            // Update Favicon
            if (favicon) {
                favicon.src = `https://www.google.com/s2/favicons?domain=${url}&sz=32`;
                favicon.classList.remove('hidden');
            }

            if (content) {
                content.innerHTML = `<iframe src="${url}" class="w-full h-full border-none bg-white"></iframe>`;
            }
        } else {
            if (display) {
                display.innerText = 'kevinos.dev';
                display.classList.add('text-white/50');
            }
            if (favicon) favicon.classList.add('hidden');
            Safari.renderHome();
        }
    },

    go: () => {
        const input = document.getElementById('safari-url-input');
        if (input) Safari.open(input.value);
    },

    renderHome: () => {
        // We will target the correct container. Note: index.html usually has 'safari-content' class or id.
        // Let's assume the simpler selector logic or user modifies index.html later.
        // For now, based on previous file reads, it seems 'safari-window' has '.safari-content'.
        const content = document.querySelector('#safari-window .safari-content');
        if (!content) return;

        content.innerHTML = `
            <div class="relative w-full h-full bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center font-sans text-white">
                
                <!-- Animated Background -->
                <div class="absolute inset-0 z-0 opacity-40">
                    <div class="absolute w-96 h-96 bg-blue-600 rounded-full blur-[100px] top-[-10%] left-[-10%] animate-pulse"></div>
                    <div class="absolute w-96 h-96 bg-purple-600 rounded-full blur-[100px] bottom-[-10%] right-[-10%] animate-pulse" style="animation-delay: 2s;"></div>
                </div>

                <!-- Content -->
                <div class="relative z-10 text-center space-y-8 animate-fade-in-up">
                    
                    <div class="mb-8">
                        <div class="w-20 h-20 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4 text-4xl transform hover:rotate-12 transition">
                            🧭
                        </div>
                        <h1 class="text-5xl font-black tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Safari
                        </h1>
                        <p class="text-gray-400 text-lg">Explora el universo de KevinOS</p>
                    </div>

                    <!-- Search Mock -->
                    <div class="w-[600px] max-w-[90vw] mx-auto relative group">
                        <div class="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 transition blur"></div>
                        <input type="text" 
                            placeholder="Buscar en la web o ingresar URL..." 
                            class="relative w-full bg-[#151515] border border-white/10 text-white rounded-full py-4 px-6 focus:outline-none focus:ring-0 placeholder-gray-600 shadow-xl"
                            onkeydown="if(event.key === 'Enter') Safari.open(this.value)">
                        <i class="fas fa-search absolute right-6 top-1/2 -translate-y-1/2 text-gray-500"></i>
                    </div>

                    <!-- Grid -->
                    <div class="grid grid-cols-4 gap-4 mt-12 max-w-2xl mx-auto">
                        ${Safari.favorites.map(f => `
                            <div onclick="Safari.open('${f.url}')" class="group flex flex-col items-center gap-3 cursor-pointer p-4 rounded-xl hover:bg-white/5 transition border border-transparent hover:border-white/5">
                                <div class="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center text-xl text-gray-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">
                                    <i class="fab ${f.icon}"></i>
                                </div>
                                <span class="text-xs font-medium text-gray-500 group-hover:text-white transition">${f.name}</span>
                            </div>
                        `).join('')}
                    </div>

                </div>
                
                <div class="absolute bottom-8 text-xs text-gray-600">
                    <p>Designed by Antigravity AI</p>
                </div>
            </div>
        `;
    }
};
