// 1. Inicialización con tu Public Key confirmada
(function() {
    emailjs.init("ZRuh7Q31bINQACQ1B"); 
})();

// 2. Función Global para cerrar el modal de éxito
function closeModal() {
    const modal = document.getElementById('custom-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 3. Lógica única del Formulario de Contacto
const contactForm = document.getElementById('form-agendar');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        // Bloqueo total de recarga y propagación
        event.preventDefault(); 
        event.stopPropagation();

        const btn = document.getElementById('btn-enviar');
        const originalText = btn.innerText;

        // Feedback visual de carga
        btn.innerText = 'Enviando...';
        btn.disabled = true;

        // Parámetros confirmados
        const serviceID = 'service_pgouv7g'; 
        const templateID = 'template_sczu6vr'; 

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                // ÉXITO: Activamos el modal con estética Navy/Gold
                const modal = document.getElementById('custom-modal');
                if (modal) {
                    modal.style.display = 'flex';
                }

                // Restauramos el estado del formulario
                btn.innerText = originalText;
                btn.disabled = false;
                contactForm.reset();
            })
            .catch((err) => {
                // MANEJO DE ERROR
                btn.innerText = 'Error al enviar';
                btn.disabled = false;
                console.error("EmailJS Error:", err);
                
                setTimeout(() => {
                    btn.innerText = originalText;
                }, 3000);
            });
    });
}

/* Funcion de busqueda */

function ejecutarBusqueda() {
    const tipo = document.getElementById('search-tipo').value;
    const operacion = document.getElementById('search-operacion').value;
    const texto = document.getElementById('search-text').value.toLowerCase();
    
    console.log(`FILTRO ACTIVO -> Tipo: ${tipo}, Op: ${operacion}`);

    const tarjetas = document.querySelectorAll('.prop-card');
    
    if(tarjetas.length === 0) {
        console.error("¡ERROR: No encontré ninguna tarjeta con la clase .prop-card!");
        return;
    }

    tarjetas.forEach((tarjeta, index) => {
        // Esto nos dirá qué clases tiene la tarjeta en la realidad
        console.log(`Tarjeta #${index} clases:`, tarjeta.className);

        const coincideTipo = (tipo === "todos" || tarjeta.classList.contains(tipo));
        const coincideOperacion = (operacion === "todos" || tarjeta.classList.contains(operacion));
        const coincideTexto = (texto === "" || tarjeta.innerText.toLowerCase().includes(texto));

        if (coincideTipo && coincideOperacion && coincideTexto) {
            tarjeta.style.setProperty("display", "block", "important");
            tarjeta.style.opacity = "1";
        } else {
            tarjeta.style.setProperty("display", "none", "important");
            tarjeta.style.opacity = "0";
        }
    });
}