function showNotification(title, message, icon = 'fas fa-bell') {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
        // --- MOBILE: DYNAMIC ISLAND STYLE ---
        let island = document.getElementById('dynamic-island');
        if (!island) {
            island = document.createElement('div');
            island.id = 'dynamic-island';
            // Increased Z-index to max, Changed BG to Dark Gray for contrast, Added Border
            island.className = 'fixed top-4 left-1/2 -translate-x-1/2 z-[100000] bg-[#252525] border border-white/20 text-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] flex items-center justify-center overflow-hidden shadow-2xl shadow-black/50';
            island.style.width = '0px';
            island.style.height = '0px';
            island.style.opacity = '0';
            document.body.appendChild(island);
        }

        // Clean content for mobile
        // 1. Remove newlines/hyphens
        let cleanMsg = message.replace(/\n|—/g, ' ').trim();
        // 2. Truncate if too long (fix "too much text" issue)
        if (cleanMsg.length > 55) {
            cleanMsg = cleanMsg.substring(0, 52) + "...";
        }

        // Update Content
        island.innerHTML = `<span class="text-xs font-bold px-5 whitespace-nowrap">${cleanMsg}</span>`;

        // Ensure visible before animating
        island.style.display = 'flex';
        island.style.width = '0px';

        // Animate Opening (Use fit-content technique)
        requestAnimationFrame(() => {
            island.style.width = 'fit-content'; // Better than auto for transitions
            island.style.minWidth = '140px';
            island.style.maxWidth = '90vw';
            island.style.height = '40px';
            island.style.opacity = '1';
        });

        // Close after 4s
        setTimeout(() => {
            island.style.width = '0px';
            island.style.minWidth = '0px';
            island.style.opacity = '0';
            island.style.padding = '0'; // Remove padding to fully collapse
        }, 4000);

    } else {
        // --- DESKTOP: GLASS TOAST STYLE ---
        let container = document.getElementById('notification-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notification-container';
            container.className = 'fixed top-16 right-5 z-[70000] flex flex-col items-end pointer-events-none gap-3';
            document.body.appendChild(container);
        }

        const notif = document.createElement('div');
        notif.className = "pointer-events-auto flex items-start gap-4 p-4 rounded-2xl bg-[#1c1c1e]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transform transition-all duration-500 translate-x-20 opacity-0 w-80 hover:bg-[#2c2c2e]/90";

        notif.innerHTML = `
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg ring-2 ring-white/5">
                <i class="${icon} text-white text-lg"></i>
            </div>
            <div class="flex-1 min-w-0">
                <h4 class="text-white font-bold text-sm mb-1 tracking-wide">${title}</h4>
                <p class="text-gray-300 text-xs leading-relaxed">${message}</p>
            </div>
            <button onclick="this.parentElement.classList.add('opacity-0','translate-x-20'); setTimeout(()=>this.parentElement.remove(),500)" class="text-gray-500 hover:text-white transition shrink-0">
                <i class="fas fa-times"></i>
            </button>
        `;

        container.appendChild(notif);

        requestAnimationFrame(() => {
            notif.classList.remove('translate-x-20', 'opacity-0');
        });

        setTimeout(() => {
            if (notif.parentElement) {
                notif.classList.add('translate-x-20', 'opacity-0');
                setTimeout(() => notif.remove(), 500);
            }
        }, 10000);
    }
}

function startVerseScheduler() {
    console.log("Verse Scheduler Started ✝️");

    // Initial welcome notification
    setTimeout(() => {
        if (window.getRandomVerse) {
            const v = window.getRandomVerse('paz');
            showNotification("Promesa para ti", `"${v.text}"`, "fas fa-dove");
        }
    }, 2000);

    // Periodic notifications (Every 30 seconds as requested)
    setInterval(() => {
        if (window.getRandomVerse) {
            const v = window.getRandomVerse();
            showNotification("Versículo del momento", `"${v.text}"\n— ${v.ref}`, "fas fa-bible");
        }
    }, 30000);
}

window.testNotif = () => showNotification("Test", "Esto es una prueba de notificación.", "fas fa-vial");

document.addEventListener('DOMContentLoaded', startVerseScheduler);
