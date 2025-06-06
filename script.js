// Configuração do Particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#b5e853'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: true,
            animation: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            animation: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#b5e853',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Animação de fade-in nos elementos
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    observer.observe(element);
});

// Configuração do efeito tilt para os cards de skills
VanillaTilt.init(document.querySelectorAll(".skill-card"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
    scale: 1.1
});

// Formulário de contato com efeito de highlight
const contactForm = document.getElementById('contact-form');
const formInputs = document.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('highlight');
    });

    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('highlight');
    });
});

if (contactForm) {
    // Adiciona classe 'active' nos inputs quando preenchidos
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.classList.add('active');
            } else {
                input.classList.remove('active');
            }
        });
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = `
            <span class="btn-text">Enviando...</span>
            <i class="fas fa-spinner fa-spin"></i>
        `;
        submitBtn.disabled = true;

        try {
            console.log('Iniciando envio do e-mail...');
            
            // Cria o objeto de parâmetros
            const templateParams = {
                to_name: 'Carlos Henrique Souza Rezende Lisboa',
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Log dos parâmetros para debug
            console.log('Service ID:', 'service_ok62jwo');
            console.log('Template ID:', 'template_g3jv9q9');
            console.log('Template Params:', templateParams);
            console.log('Public Key:', 'P4stAQFRqC-heHPS');

            // Enviar e-mail usando EmailJS
            const response = await emailjs.send(
                'service_ok62jwo',
                'template_g3jv9q9',
                templateParams,
                'P4stAQFRqC-heHPS'
            );

            console.log('Resposta do EmailJS:', response);

            if (response.status === 200) {
                contactForm.classList.add('success');
                alert('Mensagem enviada com sucesso!');
                contactForm.reset();
            }
        } catch (error) {
            console.error('Erro detalhado:', error);
            console.error('Status:', error.status);
            console.error('Text:', error.text);
            alert('Erro ao enviar mensagem. Por favor, tente novamente.');
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            contactForm.classList.remove('success');
        }
    });
}

// Smooth scroll para links internos com efeito
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === '#') return; // Ignora links com href="#"
        
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efeito de highlight na navegação
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Efeito de digitação
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Segurança da Informação", "Desenvolvimento Web", "Gestão de TI", "Inovação"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if(textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if(textArray.length) setTimeout(type, newTextDelay + 250);
});

// Função para revelar elementos quando estiverem visíveis na viewport
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150; // Distância em pixels antes do elemento aparecer
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Adiciona o evento de scroll para chamar a função reveal
window.addEventListener('scroll', reveal);

// Chama a função reveal no carregamento da página
window.addEventListener('DOMContentLoaded', reveal);

// Chama a função reveal quando todas as imagens e recursos estiverem carregados
window.addEventListener('load', reveal); 