class NotificationManager {
    constructor() {
        // We will create the container if it doesn't exist
        this.container = document.getElementById('notification-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'notification-container';
            document.body.appendChild(this.container);
        }
    }

    show(title, message, icon = 'fa-bell') {
        const notif = document.createElement('div');
        notif.className = 'notification-toast';
        notif.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="text-2xl text-white/90">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="font-bold text-[13px] text-white leading-tight mb-0.5">${title}</div>
                    <div class="text-[11px] text-white/70 leading-tight truncate">${message}</div>
                </div>
            </div>
        `;

        this.container.appendChild(notif);

        // Slide In
        requestAnimationFrame(() => {
            notif.classList.add('show');
        });

        // Play Sound (Optional - silent for now)

        // Dismiss
        setTimeout(() => {
            notif.classList.remove('show');
            setTimeout(() => {
                notif.remove();
            }, 300);
        }, 4000);
    }
}

// Global Instance
window.Notify = new NotificationManager();
