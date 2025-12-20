const PreviewApp = {
    open: (fileUrl = null) => {
        openApp('preview');
        const content = document.getElementById('preview-content');
        if (!content) return;

        if (fileUrl) {
            // If it's a PDF or Image, show it
            content.innerHTML = `<iframe src="${fileUrl}" class="w-full h-full border-none"></iframe>`;
        } else {
            // Default Placeholder
            content.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full text-center p-10 opacity-60">
                    <i class="fas fa-file-pdf text-6xl mb-4"></i>
                    <h2 class="text-xl font-bold">No hay archivo seleccionado</h2>
                    <p class="text-sm">Selecciona un archivo para previsualizar</p>
                </div>
            `;
        }
    },

    // Helper to open CV specifically
    openCV: () => {
        // Assuming there is a cv.pdf in the root or docs
        PreviewApp.open('files/cv_kevin.pdf'); // We will create a dummy path or use a placeholder
        // Since we don't have a real PDF, let's use a placeholder message or a real generic one
        // For the portfolio, we'll just show a "File Not Found" or a mock
        const content = document.getElementById('preview-content');
        content.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-center p-10">
                <div class="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center text-white text-3xl mb-4 shadow-lg">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <h2 class="text-2xl font-bold text-gray-800">Hoja de Vida.pdf</h2>
                <p class="text-gray-500 mb-6">Este archivo es una demostración.</p>
                <button class="bg-blue-500 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-600 transition" onclick="window.Notify.show('Descarga', 'Descargando CV...', 'fa-download')">
                    Descargar PDF
                </button>
            </div>
        `;
    }
}
