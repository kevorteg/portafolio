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

    // Simulate Loading
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

    setTimeout(() => {
        // Success
        btn.innerHTML = '<i class="fas fa-check"></i> Enviado';
        btn.classList.replace('bg-blue-500', 'bg-green-500');

        window.Notify.show('Correo Enviado', 'Tu mensaje ha sido enviado exitosamente.', 'fa-paper-plane');

        setTimeout(() => {
            // Reset and Close
            if (to) to.value = '';
            if (subject) subject.value = '';
            if (body) body.value = '';

            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.classList.replace('bg-green-500', 'bg-blue-500');

            closeApp('mail');
        }, 1500);
    }, 2000);
}
