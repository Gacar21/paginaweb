// Agregar este código a tu archivo main.js

// Crear el overlay de animación de moneda
function createCoinOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'coin-overlay';
    overlay.innerHTML = '<img src="img/logo-big.png" alt="DECOM" class="coin-logo">';
    document.body.appendChild(overlay);
    return overlay;
}

// Inicializar el overlay
const coinOverlay = createCoinOverlay();

// Función para animar la moneda y redirigir
function animateCoinAndRedirect(url) {
    // Activar el overlay
    coinOverlay.classList.add('active');
    
    // Obtener la imagen y forzar la animación
    const coinLogo = coinOverlay.querySelector('.coin-logo');
    
    // Remover y agregar la animación para reiniciarla
    coinLogo.style.animation = 'none';
    
    // Forzar reflow
    coinLogo.offsetHeight;
    
    // Aplicar la animación
    coinLogo.style.animation = 'coinFlip 1.5s ease-in-out';
    
    // Esperar a que termine la animación (1.5s) y redirigir
    setTimeout(() => {
        window.location.href = url;
    }, 1500);
}

// Agregar evento a todos los botones de servicio
document.addEventListener('DOMContentLoaded', () => {
    const serviceButtons = document.querySelectorAll('.service-card button');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const link = button.parentElement;
            const url = link.getAttribute('href');
            
            if (url) {
                animateCoinAndRedirect(url);
            }
        });
    });

    // Animación de scroll para elementos
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar las secciones
    const sections = document.querySelectorAll('.about, .contact');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Efecto parallax suave en el hero
    const hero = document.querySelector('.hero');
    const heroLogo = document.querySelector('.hero-logo');
    
    if (hero && heroLogo) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < hero.offsetHeight) {
                heroLogo.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // Animación de hover en las tarjetas de servicio
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Animación suave para el formulario de contacto
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#273a5c';
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '#d4d4cc';
            this.style.transform = 'scale(1)';
        });
    });

    // Contador animado para números (si quieres agregar estadísticas en el futuro)
    function animateCounter(element, target, duration) {
        let current = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Efecto de escritura para el título (opcional)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Activar animación de entrada suave para todos los elementos
    const animatedElements = document.querySelectorAll('.service-card, .about-text, .contact-info');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => fadeInObserver.observe(el));
});

// Prevenir la animación de moneda si el botón no tiene href
document.querySelectorAll('.service-card button').forEach(button => {
    const link = button.parentElement;
    if (!link.getAttribute('href') || link.getAttribute('href') === '#') {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Agregar un pequeño shake si no hay link
            button.style.animation = 'shake 0.5s';
            setTimeout(() => {
                button.style.animation = '';
            }, 500);
        });
    }
});

// Animación shake para botones sin link
const shakeKeyframes = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}
`;

// Agregar keyframes al documento
const style = document.createElement('style');
style.textContent = shakeKeyframes;
document.head.appendChild(style);