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

function downloadNotes() {
    const textarea = document.getElementById('notes-area');
    if (!textarea || !textarea.value.trim()) {
        window.Notify.show('Advertencia', 'No hay notas para descargar.', 'fa-exclamation-circle');
        return;
    }

    const blob = new Blob([textarea.value], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Mis_Notas_KevinOS.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    window.Notify.show('Descargando', 'Tus notas se están guardando.', 'fa-download');
}
