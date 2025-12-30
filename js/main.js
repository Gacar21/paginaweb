// ====================================
// NAVBAR SCROLL Y MENU MOBILE
// ====================================
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ====================================
// SMOOTH SCROLL
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ====================================
// SISTEMA DE PARTÍCULAS MEJORADO
// ====================================
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particlesCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.mouse = {
            x: null,
            y: null,
            radius: 120
        };
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.animate();
        this.setupEventListeners();
    }
    
    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    drawParticles() {
        this.particles.forEach(p => {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(100, 255, 218, ${p.opacity})`;
            this.ctx.fill();
            
            // Glow effect
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = `rgba(100, 255, 218, ${p.opacity})`;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 150) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(100, 255, 218, ${0.15 * (1 - dist / 150)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    updateParticles() {
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            // Interacción con el mouse
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < this.mouse.radius) {
                    const force = (this.mouse.radius - dist) / this.mouse.radius;
                    p.x -= dx / dist * force * 3;
                    p.y -= dy / dist * force * 3;
                }
            }
            
            // Rebotar en bordes
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
            
            // Mantener dentro
            p.x = Math.max(0, Math.min(this.canvas.width, p.x));
            p.y = Math.max(0, Math.min(this.canvas.height, p.y));
        });
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(10, 25, 47, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.drawConnections();
        this.drawParticles();
        this.updateParticles();
        
        requestAnimationFrame(() => this.animate());
    }
    
    setupEventListeners() {
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
        
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });
    }
}

// Inicializar sistema de partículas
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});

// ====================================
// INTERSECTION OBSERVER PARA ANIMACIONES
// ====================================
const observerOptions = {
    threshold: 0.1,
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

// Observar elementos para animaciones
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.service-card, .about-section, .contact-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

// ====================================
// ANIMACIÓN DE NÚMEROS EN ESTADÍSTICAS
// ====================================
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let count = 0;
        const increment = target / 50;
        
        const updateCount = () => {
            if (count < target) {
                count += increment;
                stat.textContent = Math.ceil(count) + '+';
                setTimeout(updateCount, 30);
            } else {
                stat.textContent = target + '+';
            }
        };
        
        // Iniciar animación cuando el elemento sea visible
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    statsObserver.unobserve(entry.target);
                }
            });
        });
        
        statsObserver.observe(stat);
    });
}

document.addEventListener('DOMContentLoaded', animateNumbers);

// ====================================
// EFECTO PARALLAX EN HERO
// ====================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ====================================
// FORM VALIDATION Y SUBMIT
// ====================================
const contactForm = document.querySelector('.contact-form-wrapper form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener valores del formulario
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Aquí puedes agregar la lógica para enviar el formulario
        console.log('Formulario enviado:', data);
        
        // Mostrar mensaje de éxito
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
        
        // Limpiar formulario
        contactForm.reset();
    });
}