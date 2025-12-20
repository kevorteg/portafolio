function initControlCenter() {
    setupSliders();
}

function setupSliders() {
    const brightness = document.querySelector('.cc-slider-brightness');
    const volume = document.querySelector('.cc-slider-volume');
    const overlay = document.getElementById('brightness-overlay');

    if (brightness) {
        brightness.addEventListener('input', (e) => {
            // Value 0-100. 100 is max brightness (opacity 0). 0 is black (opacity 0.8)
            const val = e.target.value;
            const opacity = 0.9 - (val / 100 * 0.9);
            if (overlay) overlay.style.opacity = opacity;
        });
    }

    if (volume) {
        volume.addEventListener('input', (e) => {
            if (window.Notify) {
                // Throttle notifications? Or just update icon
                // For now, no action, just visual
            }
        });

        volume.addEventListener('change', (e) => {
            if (window.Notify) window.Notify.show('Volumen', `Nivel: ${e.target.value}%`, 'fa-volume-up');
        });
    }
}
