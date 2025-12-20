// Main Initialization
window.onload = () => {
    // Core Init
    // if (typeof runBootSequence === 'function') runBootSequence(); 
    if (typeof loadSettings === 'function') loadSettings();

    // Clock Init
    if (typeof updateClock === 'function') {
        updateClock();
        setInterval(updateClock, 1000);
    }

    // Boot Sequence
    const bootScreen = document.getElementById('boot-screen');
    if (bootScreen) {
        setTimeout(() => {
            bootScreen.style.opacity = '0';
            setTimeout(() => {
                bootScreen.style.display = 'none';
            }, 1000);
        }, 2500);
    }

    // Apps Init
    if (typeof initTerminal === 'function') initTerminal();
    if (typeof initNotes === 'function') initNotes();
    if (typeof initControlCenter === 'function') initControlCenter();
    if (typeof Desktop !== 'undefined') Desktop.init(); // Desktop Core

    console.log('KevinOS Initialized');
};
