const PreviewApp = {
    open: (type = 'profile') => {
        openApp('preview');
        const content = document.getElementById('preview-content');
        if (!content) return;

        // Reset container styles to avoid conflicts (remove flex center)
        content.className = "w-full h-full bg-gray-50";

        if (type === 'setup') {
            const titleEl = document.querySelector('#preview-window .window-header .flex-1');
            if (titleEl) titleEl.innerText = "Mi Setup - KevinOS";

            content.className = "w-full h-full bg-black flex items-center justify-center";
            content.innerHTML = `
                <div class="relative w-full h-full">
                    <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80" class="w-full h-full object-cover opacity-80">
                    <div class="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black to-transparent w-full">
                        <h2 class="text-3xl font-bold text-white mb-2">Mi Espacio de Trabajo</h2>
                        <p class="text-gray-300">Donde ocurre la magia. VS Code, Café y buena música.</p>
                    </div>
                </div>
             `;
            return;
        }

        // Default: PROFILE
        const titleEl = document.querySelector('#preview-window .window-header .flex-1');
        if (titleEl) titleEl.innerText = "Perfil Profesional - Kevin Ortega";

        content.innerHTML = `
            <div class="w-full h-full overflow-y-auto custom-scrollbar bg-gray-50 text-gray-800 font-sans">
                <!-- Header / Hero -->
                <div class="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 pb-12">
                    <div class="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-6">
                        <div class="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/30 bg-white/10 flex items-center justify-center text-4xl shadow-xl overflow-hidden">
                            <!-- User Image -->
                            <img src="image/perfil/perfil.jpg" onerror="this.src='https://ui-avatars.com/api/?name=Kevin+Ortega&background=random&size=128'" alt="Kevin" class="w-full h-full object-cover">
                        </div>
                        <div class="text-center md:text-left">
                            <h1 class="text-3xl md:text-4xl font-bold">Kevin Ortega</h1>
                            <p class="text-blue-100 text-lg mt-1">Diseñador Multimedia & Desarrollador Web (IA Specialist)</p>
                            <div class="flex flex-wrap gap-3 justify-center md:justify-start mt-4 text-sm opacity-90">
                                <span class="bg-white/20 px-3 py-1 rounded-full"><i class="fas fa-map-marker-alt mr-1"></i> Colombia</span>
                                <a href="mailto:milife.ortega2000@gmail.com" class="bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition"><i class="fas fa-envelope mr-1"></i> Email</a>
                                <span class="bg-white/20 px-3 py-1 rounded-full"><i class="fas fa-phone mr-1"></i> 315 049 9783</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Quote -->
                    <div class="absolute bottom-0 left-0 w-full transform translate-y-1/2 px-4">
                        <div class="max-w-2xl mx-auto bg-white text-gray-600 p-4 rounded-xl shadow-lg text-center text-sm italic border-l-4 border-indigo-500">
                            "Cada uno según el don que ha recibido, minístrelo a los otros, como buenos administradores de la multiforme gracia de Dios." - 1 Pedro 4:10
                        </div>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="max-w-3xl mx-auto px-6 pt-16 pb-12 grid grid-cols-1 gap-8">
                    
                    <!-- Perfil -->
                    <section>
                        <h2 class="text-xl font-bold text-gray-800 mb-3 border-b pb-2 border-gray-200"><i class="fas fa-user-circle text-indigo-600 mr-2"></i> Perfil Profesional</h2>
                        <p class="text-gray-600 leading-relaxed text-sm text-justify">
                            Diseñador Multimedia y Desarrollador Web con una sólida especialización en Inteligencia Artificial aplicada, prompt engineering y flujos avanzados de optimización digital. Combino de manera única la creatividad visual y el pensamiento técnico de código para construir productos interactivos, automatizar flujos complejos y optimizar la creación de contenido de alto impacto multimedia. Me caracterizo por mi rapidez de aprendizaje estratégico, proactividad y enfoque en la innovación visual para transformar ideas complejas en experiencias web interactivas y escalables.
                        </p>
                    </section>

                    <!-- Habilidades -->
                    <section>
                        <h2 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200"><i class="fas fa-tools text-indigo-600 mr-2"></i> Habilidades Técnicas & Especialización en IA</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <h3 class="font-bold text-indigo-600 mb-2 text-sm">Desarrollo Web & Creatividad</h3>
                                <div class="flex flex-wrap gap-2 mb-3">
                                    <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Diseño Web</span>
                                    <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">HTML5 / CSS3</span>
                                    <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">JavaScript</span>
                                    <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">UI/UX Design</span>
                                    <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Diseño Multimedia</span>
                                </div>
                                <ul class="text-xs text-gray-600 space-y-1">
                                    <li>• Creación de portafolios interactivos y e-commerce</li>
                                    <li>• Automatización y flujos digitales de optimización</li>
                                    <li>• Combinación única de creatividad visual y código técnico</li>
                                </ul>
                            </div>
                            <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <h3 class="font-bold text-purple-600 mb-2 text-sm">Prompt Engineering & Workflows</h3>
                                <div class="flex flex-wrap gap-2 mb-3">
                                    <span class="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded">Prompt Engineering</span>
                                    <span class="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded">AI Workflows</span>
                                    <span class="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded">Claude Code</span>
                                    <span class="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded">Agentic AI</span>
                                </div>
                                <ul class="text-xs text-gray-600 space-y-1">
                                    <li>• **Claude Code & Agentic AI**: Desarrollo acelerado, scripts automatizados y flujos complejos con Claude.</li>
                                    <li>• **Análisis y Síntesis**: Investigación en profundidad y estructuración cognitiva mediante Gemini y NotebookLM.</li>
                                </ul>
                            </div>
                            <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 md:col-span-2">
                                <h3 class="font-bold text-pink-600 mb-2 text-sm">Producción Multimedia Asistida por IA</h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-600">
                                    <div>
                                        <p class="font-semibold text-gray-700">• Generación de Video IA</p>
                                        <p class="text-[11px] mb-2 text-gray-500">Dominio avanzado de motores cinematográficos: Higgsfield AI, Runway ML, Kling AI y Pika Labs.</p>
                                        <p class="font-semibold text-gray-700">• Avatares & Locución</p>
                                        <p class="text-[11px] mb-2 text-gray-500">Generación de voceros y presentadores virtuales con HeyGen, y clonación de audio con ElevenLabs.</p>
                                    </div>
                                    <div>
                                        <p class="font-semibold text-gray-700">• Generación Gráfica</p>
                                        <p class="text-[11px] mb-2 text-gray-500">Dirección de arte con Midjourney, DALL·E y Photoshop Generative Fill para branding.</p>
                                        <p class="font-semibold text-gray-700">• Suno & Audio Generativo</p>
                                        <p class="text-[11px] text-gray-500">Composición musical inteligente y creación de paisajes sonoros para multimedia.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Experiencia -->
                    <section>
                        <h2 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200"><i class="fas fa-briefcase text-indigo-600 mr-2"></i> Experiencia Laboral</h2>
                        <div class="space-y-6">
                            <div class="flex gap-4">
                                <div class="w-12 h-12 rounded bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0"><i class="fas fa-bullhorn"></i></div>
                                <div>
                                    <h3 class="font-bold text-gray-800 text-sm">Auxiliar en Marketing y Comunicación</h3>
                                    <p class="text-xs text-indigo-600 font-bold mb-1">ASCEP — Cali, Colombia (2024)</p>
                                    <ul class="text-xs text-gray-500 list-disc list-inside space-y-1">
                                        <li>Diseño y desarrollo de sitios web y canales de comunicación digital para la comunidad.</li>
                                        <li>Liderazgo en la campaña multimedia "Somos Voces que Inspiran" para empoderamiento juvenil.</li>
                                        <li>Integración de workflows de IA para acelerar en un 40% la creación de contenido visual e informativo.</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="flex gap-4">
                                <div class="w-12 h-12 rounded bg-pink-100 flex items-center justify-center text-pink-600 shrink-0"><i class="fas fa-laptop-code"></i></div>
                                <div>
                                    <h3 class="font-bold text-gray-800 text-sm">Creativo & Desarrollador Web Freelance</h3>
                                    <p class="text-xs text-pink-600 font-bold mb-1">KRE-ACTIVA — Cali, Colombia (2023 – Actual)</p>
                                    <ul class="text-xs text-gray-500 list-disc list-inside space-y-1">
                                        <li>Creación y despliegue de portafolios interactivos y e-commerce a la medida (ej: kadajim.online, jstenis.com).</li>
                                        <li>Concepción, diseño y desarrollo completo de KevinOS (portafolio interactivo estilo macOS).</li>
                                        <li>Automatización de procesos de desarrollo y maquetación web asistida con Claude Code.</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="flex gap-4">
                                <div class="w-12 h-12 rounded bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"><i class="fas fa-users"></i></div>
                                <div>
                                    <h3 class="font-bold text-gray-800 text-sm">Gestor de Redes Sociales & Diseño</h3>
                                    <p class="text-xs text-blue-600 font-bold mb-1">Misión Juvenil IPUC — Cali, Colombia (2023 – Actual)</p>
                                    <ul class="text-xs text-gray-500 list-disc list-inside space-y-1">
                                        <li>Creación de piezas gráficas, campañas visuales y edición de video multiplataforma.</li>
                                        <li>Diseño estratégico de identidad de marca juvenil y producción de contenido de alto alcance.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <!-- Principios -->
                    <section>
                         <h2 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200"><i class="fas fa-seedling text-indigo-600 mr-2"></i> Principios Personales</h2>
                         <div class="flex flex-wrap gap-2 justify-center">
                             <span class="px-3 py-1 border border-indigo-200 text-indigo-700 rounded-full text-xs font-medium">Ética y responsabilidad</span>
                             <span class="px-3 py-1 border border-indigo-200 text-indigo-700 rounded-full text-xs font-medium">Curiosidad intelectual</span>
                             <span class="px-3 py-1 border border-indigo-200 text-indigo-700 rounded-full text-xs font-medium">Discernimiento</span>
                             <span class="px-3 py-1 border border-indigo-200 text-indigo-700 rounded-full text-xs font-medium">Creatividad con propósito</span>
                             <span class="px-3 py-1 border border-indigo-200 text-indigo-700 rounded-full text-xs font-medium">Trabajo bien hecho</span>
                         </div>
                    </section>
                    
                    <!-- Footer -->
                    <div class="mt-8 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
                        <p>Diseñado y desarrollado en KevinOS.</p>
                    </div>
                </div>
            </div>
        `;
    },

    openCV: () => {
        PreviewApp.open();
    },

    openImage: (src) => {
        openApp('preview');
        const content = document.getElementById('preview-content');
        if (!content) return;
        const titleEl = document.querySelector('#preview-window .window-header .flex-1');
        if (titleEl) titleEl.innerText = src.split('/').pop();
        
        content.className = "w-full h-full bg-[#1e1e1e] flex items-center justify-center p-4";
        content.innerHTML = `<img src="${src}" class="max-w-full max-h-full object-contain shadow-2xl rounded-lg">`;
    },

    openVideo: (src) => {
        openApp('preview');
        const content = document.getElementById('preview-content');
        if (!content) return;
        const titleEl = document.querySelector('#preview-window .window-header .flex-1');
        if (titleEl) titleEl.innerText = src.split('/').pop();
        
        content.className = "w-full h-full bg-black flex items-center justify-center";
        content.innerHTML = `<video src="${src}" controls autoplay class="max-w-full max-h-full"></video>`;
    },

    openInfo: (name) => {
        // Search for item in folderData
        let item = null;
        Object.values(folderData).forEach(folder => {
            const found = folder.items.find(i => i.name === name);
            if (found) item = found;
        });

        if (!item || item.level === undefined) return;

        openApp('info');
        const win = document.getElementById('info-window');
        if (!win) return;

        const iconEl = document.getElementById('info-icon');
        if (iconEl) iconEl.src = item.img;

        const titleEl = document.getElementById('info-title');
        if (titleEl) titleEl.innerText = `${item.name} (${item.level}%)`;

        const descEl = document.getElementById('info-desc');
        if (descEl) descEl.innerText = item.desc || `Dominio y aplicación avanzada de ${item.name} en proyectos profesionales.`;

        const lvlContainer = document.getElementById('info-level-container');
        if (lvlContainer) lvlContainer.classList.remove('hidden');

        // Reset and animate bar
        const bar = document.getElementById('info-level-bar');
        if (bar) {
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = item.level + '%';
            }, 100);
        }
    }
};

window.PreviewApp = PreviewApp;
