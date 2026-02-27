document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Set current year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 3. Scroll Reveal Logic (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -20px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                // Remove a classe quando o elemento sai da visão
                // Assim a animação acontece novamente quando ele voltar a entrar.
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => {
        // Obter delay atribuido via atributo HTML custom
        const delay = el.getAttribute('data-delay');
        if (delay) {
            el.style.transitionDelay = `${delay}ms`;
        }
        observer.observe(el);
    });

    // 4. Before/After Slider Logic
    const sliderInput = document.getElementById('before-after-slider');
    const afterImage = document.getElementById('after-image');
    const dividerLine = document.getElementById('slider-divider');
    const lumeartLabel = document.getElementById('lumeart-label');

    if (sliderInput && afterImage && dividerLine && lumeartLabel) {
        sliderInput.addEventListener('input', (e) => {
            const pos = e.target.value;
            // Update image clip-path
            afterImage.style.clipPath = `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)`;
            // Update divider position
            dividerLine.style.left = `calc(${pos}%)`;
            // Update label opacity
            lumeartLabel.style.opacity = pos > 20 ? 1 : 0;
        });
    }
});

// 5. Portfolio Popups Logic
const popupData = {
    'portfolio-1': [
        'https://i.postimg.cc/vmrQg64d/Sem-Titulo-4.png',
        'https://i.postimg.cc/d02qkThD/Sem-Titulo-2.png'
    ],
    'portfolio-2': [
        'https://i.postimg.cc/8CW2XQGv/streetwear-landing-page.png',
        'https://i.postimg.cc/wBJC48zJ/streetwear-dark-mode-tablet.png'
    ],
    'portfolio-3': [
        'https://i.postimg.cc/509MXKcP/veridian-landing-page-1.png',
        'https://i.postimg.cc/85kV7X8n/veridian-ingredients-section.png'
    ]
};

window.openPopup = (id) => {
    const popup = document.getElementById('portfolio-popup');
    const img1 = document.getElementById('popup-img-1');
    const img2 = document.getElementById('popup-img-2');

    if (popupData[id] && popup && img1 && img2) {
        img1.src = popupData[id][0];
        img2.src = popupData[id][1];

        // Show popup
        popup.classList.remove('hidden');
        popup.classList.add('flex');

        // Disable body scroll when open
        document.body.style.overflow = 'hidden';

        // Fade in animation
        setTimeout(() => popup.classList.remove('opacity-0'), 10);
    }
};

window.closePopup = () => {
    const popup = document.getElementById('portfolio-popup');
    if (popup) {
        popup.classList.add('opacity-0');

        // Enable body scroll back
        document.body.style.overflow = '';

        setTimeout(() => {
            popup.classList.remove('flex');
            popup.classList.add('hidden');
        }, 300);
    }
};

// 7. Parallax de Scroll Diferenciado
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Smooth scroll parallax for specific elements
    const parallaxScrollElements = document.querySelectorAll('[data-scroll-speed]');
    parallaxScrollElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-scroll-speed')) || 0;
        const yPos = -(scrollY * speed);

        el.style.transform = `translateY(${yPos}px)`;
    });
});
