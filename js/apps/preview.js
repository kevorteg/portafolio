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
                            <p class="text-blue-100 text-lg mt-1">Creativo Digital · Investigador · Diseñador & Desarrollador</p>
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
                            Creativo digital e investigador con enfoque en diseño, desarrollo web y comunicación estratégica. Estudiante universitario, con experiencia apoyando proyectos creativos, tecnológicos, sociales y cristianos. Me caracterizo por la curiosidad constante, el pensamiento crítico y la capacidad de integrar propósito, estética y funcionalidad en cada proyecto.
                        </p>
                    </section>

                    <!-- Habilidades -->
                    <section>
                        <h2 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200"><i class="fas fa-tools text-indigo-600 mr-2"></i> Habilidades Técnicas</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <h3 class="font-bold text-indigo-600 mb-2 text-sm">Desarrollo & Programación</h3>
                                <div class="flex flex-wrap gap-2">
                                    <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">HTML</span>
                                    <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">CSS</span>
                                    <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">JavaScript</span>
                                    <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Python</span>
                                </div>
                            </div>
                            <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <h3 class="font-bold text-pink-600 mb-2 text-sm">Diseño & Creatividad</h3>
                                <ul class="text-xs text-gray-600 space-y-1">
                                    <li>• Diseño gráfico</li>
                                    <li>• Branding e identidad visual</li>
                                    <li>• Diseño y conceptualización 3D</li>
                                    <li>• Producción de contenido digital</li>
                                </ul>
                            </div>
                            <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <h3 class="font-bold text-blue-600 mb-2 text-sm">Investigación & Estrategia</h3>
                                <ul class="text-xs text-gray-600 space-y-1">
                                    <li>• Investigación digital y conceptual</li>
                                    <li>• Análisis de ideas y prompts</li>
                                    <li>• Pensamiento crítico</li>
                                </ul>
                            </div>
                            <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <h3 class="font-bold text-green-600 mb-2 text-sm">Comunicación & Digital</h3>
                                <ul class="text-xs text-gray-600 space-y-1">
                                    <li>• Copywriting creativo</li>
                                    <li>• Comunicación visual estratégica</li>
                                    <li>• Apoyo en redes sociales</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <!-- Experiencia -->
                    <section>
                        <h2 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200"><i class="fas fa-briefcase text-indigo-600 mr-2"></i> Experiencia & Colaboraciones</h2>
                        <div class="space-y-4">
                            <div class="flex gap-4">
                                <div class="w-12 h-12 rounded bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0"><i class="fas fa-laptop-code"></i></div>
                                <div>
                                    <h3 class="font-bold text-gray-800 text-sm">Creativo Digital & Desarrollador</h3>
                                    <p class="text-xs text-indigo-600 font-bold mb-1">KRE-ACTIVA</p>
                                    <p class="text-xs text-gray-500">Desarrollo de proyectos creativos, comerciales y digitales. Diseño gráfico, branding y soluciones visuales.</p>
                                </div>
                            </div>
                            <div class="flex gap-4">
                                <div class="w-12 h-12 rounded bg-pink-100 flex items-center justify-center text-pink-600 shrink-0"><i class="fas fa-users"></i></div>
                                <div>
                                    <h3 class="font-bold text-gray-800 text-sm">Apoyo en Redes Sociales</h3>
                                    <p class="text-xs text-pink-600 font-bold mb-1">Misión Juvenil (Distrito 5)</p>
                                    <p class="text-xs text-gray-500">Creación, adaptación y gestión de contenido digital. Diseño de piezas visuales para comunicación juvenil.</p>
                                </div>
                            </div>
                            <div class="flex gap-4">
                                <div class="w-12 h-12 rounded bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"><i class="fas fa-lightbulb"></i></div>
                                <div>
                                    <h3 class="font-bold text-gray-800 text-sm">Investigador Creativo & Tecnológico</h3>
                                    <p class="text-xs text-blue-600 font-bold mb-1">Independiente</p>
                                    <p class="text-xs text-gray-500">Investigación en tecnología, IA y desarrollo. Exploración de soluciones digitales con impacto social y ético.</p>
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

        document.getElementById('info-icon').src = item.img;
        document.getElementById('info-name').innerText = item.name;
        document.getElementById('info-type').innerText = item.type || 'HERRAMIENTA';
        document.getElementById('info-desc').innerText = item.desc || 'Dominio y aplicación avanzada en proyectos profesionales.';
        document.getElementById('info-level-text').innerText = item.level + '%';
        
        // Reset and animate bar
        const bar = document.getElementById('info-level-bar');
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = item.level + '%';
        }, 100);
    }
};

window.PreviewApp = PreviewApp;
