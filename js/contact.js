(function() {
    // REEMPLAZA CON TU KEY REAL
    emailjs.init("TU_PUBLIC_KEY");
})();

const btn = document.getElementById('btn-enviar');
const contactForm = document.getElementById('form-agendar');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        btn.innerText = 'Enviando...';
        btn.disabled = true; // Evita múltiples clics

        const serviceID = 'default_service';
        const templateID = 'TU_TEMPLATE_ID';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.innerText = '¡Cita Solicitada!';
                alert('Gracias. Nos pondremos en contacto contigo pronto.');
                contactForm.reset();
                btn.disabled = false;
            }, (err) => {
                btn.innerText = 'Error al enviar';
                btn.disabled = false;
                alert('Hubo un problema al enviar el mensaje. Por favor intenta de nuevo.');
                console.error("EmailJS Error:", err);
            });
    });
}