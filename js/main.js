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