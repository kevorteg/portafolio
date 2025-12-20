function initNotes() {
    const textarea = document.getElementById('notes-area');
    if (!textarea) return;

    // Load saved
    const saved = localStorage.getItem('kevinos-notes');
    if (saved) textarea.value = saved;

    // Auto save
    textarea.addEventListener('input', () => {
        localStorage.setItem('kevinos-notes', textarea.value);
    });
}
