/* ==========================================================================
   LÓGICA DEL CARRUSEL PROFESIONAL
   ========================================================================== */
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
const track = document.getElementById('track');
const counter = document.getElementById('counter');
const progress = document.getElementById('progress');
let current = 0, timer, progTimer;

/* ---FUNCIÓN para CAROUSEL --- */

/* --- REEMPLAZA SOLO ESTA FUNCIÓN EN TU JS --- */
function goTo(idx) {
    if (!track) return;
    
    // Limpiar estados activos
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    
    // Calcular nuevo índice (infinito)
    current = (idx + slides.length) % slides.length;
    
    // Activar nuevo slide
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    
    // MOVIMIENTO QUIRÚRGICO: 
    // Usamos 'vw' para mover exactamente un ancho de pantalla real por slide.
    track.style.transform = `translateX(-${current * 100}vw)`;
    
    if (counter) {
        counter.innerHTML = `<span>${String(current + 1).padStart(2, '0')}</span> / 0${slides.length}`;
    }
    
    restartProgress();
}

function restartProgress() {
    if (!progress) return;
    progress.style.transition = 'none';
    progress.style.width = '0%';
    clearTimeout(progTimer);
    progTimer = setTimeout(() => {
        progress.style.transition = 'width 5s linear';
        progress.style.width = '100%';
    }, 50);
}

function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
}

/* EVENT LISTENERS */
document.getElementById('nextBtn')?.addEventListener('click', () => { goTo(current + 1); startAuto(); });
document.getElementById('prevBtn')?.addEventListener('click', () => { goTo(current - 1); startAuto(); });
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => { goTo(index); startAuto(); });
});

/* INICIALIZACIÓN */
document.addEventListener('DOMContentLoaded', () => {
    if (track) {
        goTo(0);
        startAuto();
    }
});

/* MENÚ HAMBURGUESA Y MÓVIL */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = mobileMenu.style.display === 'flex';
        if (isOpen) {
            mobileMenu.style.opacity = '0';
            setTimeout(() => { mobileMenu.style.display = 'none'; }, 350);
            hamburger.classList.remove('open');
        } else {
            mobileMenu.style.display = 'flex';
            requestAnimationFrame(() => { mobileMenu.style.opacity = '1'; });
            hamburger.classList.add('open');
        }
    });

    document.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.style.opacity = '0';
            hamburger.classList.remove('open');
            setTimeout(() => { mobileMenu.style.display = 'none'; }, 350);
        });
    });
}

/* Funcion de busqueda */

function ejecutarBusqueda() {
    // 1. Capturamos los valores
    const tipo = document.getElementById('search-tipo').value;
    const operacion = document.getElementById('search-operacion').value;
    const textoInput = document.getElementById('search-text').value.toLowerCase();
    
    console.log("--- INICIANDO FILTRADO ---");
    console.log("Buscando:", tipo, operacion, textoInput);

    // 2. Seleccionamos las tarjetas
    const tarjetas = document.querySelectorAll('.prop-card');

    tarjetas.forEach((tarjeta) => {
        const contenidoVisible = tarjeta.innerText.toLowerCase();
        
        // 3. Lógica de comparación
        const coincideTipo = (tipo === "todos" || tarjeta.classList.contains(tipo));
        const coincideOperacion = (operacion === "todos" || tarjeta.classList.contains(operacion));
        const coincideTexto = (textoInput === "" || contenidoVisible.includes(textoInput));

        // 4. Aplicar visibilidad con !important para ganarle al CSS
        if (coincideTipo && coincideOperacion && coincideTexto) {
            tarjeta.style.setProperty('display', 'block', 'important');
            tarjeta.style.opacity = "1";
        } else {
            tarjeta.style.setProperty('display', 'none', 'important');
            tarjeta.style.opacity = "0";
        }
    });
    
    console.log("--- FILTRADO FINALIZADO ---");
}

/* FUNCIÓN: LIMPIAR FILTROS */
function limpiarFiltros() {
    // 1. Restablecemos los valores de los inputs/selects del HTML
    if (document.getElementById('search-text')) document.getElementById('search-text').value = "";
    if (document.getElementById('search-tipo')) document.getElementById('search-tipo').value = "todos";
    if (document.getElementById('search-operacion')) document.getElementById('search-operacion').value = "todos";
    if (document.getElementById('search-precio')) document.getElementById('search-precio').value = "todos";

    // 2. Ocultamos el mensaje de "no resultados" por si estaba activo
    const mensajeNoResultados = document.getElementById('no-results');
    if (mensajeNoResultados) mensajeNoResultados.style.display = "none";

    // 3. Volvemos a mostrar TODAS las tarjetas de propiedades
    const tarjetas = document.querySelectorAll('.prop-card');
    tarjetas.forEach(tarjeta => {
        tarjeta.style.setProperty('display', 'block', 'important');
        tarjeta.style.opacity = "1";
    });
    
    console.log("Filtros reiniciados exitosamente.");
}

function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    
    // Si manejas la visibilidad con una clase CSS (Recomendado para transiciones suaves)
    if (menu.classList.contains('active')) {
        menu.classList.remove('active');
    } else {
        menu.classList.add('active');
    }
    /* O si lo manejas directo con display, descomenta esto:
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
    */
}

/*Funcion Menu asesores Whatsapp*/ 

function toggleWhatsAppMenu() {
    const waMenu = document.getElementById('waMenu');
    if (waMenu) {
        waMenu.classList.toggle('active');
    }
}

// Cierre opcional: Si hacen clic fuera del menú, este se cierra solo
document.addEventListener('click', function(event) {
    const container = document.querySelector('.whatsapp-container');
    const waMenu = document.getElementById('waMenu');
    
    if (container && !container.contains(event.target)) {
        if (waMenu && waMenu.classList.contains('active')) {
            waMenu.classList.remove('active');
        }
    }
});
