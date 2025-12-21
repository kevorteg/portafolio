function sendMail() {
    const to = document.getElementById('mail-to');
    const subject = document.getElementById('mail-subject');
    const body = document.getElementById('mail-body');
    const btn = document.getElementById('mail-send-btn');

    // Validate
    if (!body || body.value.trim() === '') {
        window.Notify.show('Error', 'El mensaje no puede estar vacío.', 'fa-exclamation-circle');
        return;
    }

    // Simulate Loading for UI Feedback
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparando...';

    setTimeout(() => {
        // Construct Mailto Link
        const subjectText = subject ? subject.value : 'Contacto desde KevinOS';
        const bodyText = `Hola Kevin,\n\n${body.value}`;
        const mailtoLink = `mailto:milife.ortega2000@gmail.com?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;

        // Open Default Mail Client
        window.location.href = mailtoLink;

        // UI Feedback
        btn.innerHTML = '<i class="fas fa-check"></i> Abriendo Correo';
        btn.classList.replace('bg-blue-500', 'bg-green-500');

        setTimeout(() => {
            // Reset UI but keep window open in case they want to copy text
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.classList.replace('bg-green-500', 'bg-blue-500');
        }, 2000);
    }, 800);
}
