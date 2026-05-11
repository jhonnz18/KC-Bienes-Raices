/* LÓGICA DEL CARRUSEL */
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
const track = document.getElementById('track');
const counter = document.getElementById('counter');
const progress = document.getElementById('progress');
let current = 0, timer, progTimer;

function goTo(idx) {
  if (!track) return; // Seguridad si el elemento no existe en la página
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (idx + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
  track.style.transform = `translateX(-${current * 25}%)`;
  counter.innerHTML = `<span>${String(current + 1).padStart(2,'0')}</span> / 0${slides.length}`;
  restartProgress();
}

function restartProgress() {
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

// Event Listeners del Carrusel
document.getElementById('nextBtn')?.addEventListener('click', () => { goTo(current + 1); startAuto(); });
document.getElementById('prevBtn')?.addEventListener('click', () => { goTo(current - 1); startAuto(); });
dots.forEach(d => d.addEventListener('click', () => { goTo(+d.dataset.idx); startAuto(); }));

// Inicialización
if (track) {
    goTo(0);
    startAuto();
}

/* MENÚ HAMBURGUESA (MÓVIL) */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = mobileMenu.style.display === 'flex';
        if (isOpen) {
            mobileMenu.style.opacity = '0';
            hamburger.classList.remove('open');
            setTimeout(() => { mobileMenu.style.display = 'none'; }, 350);
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