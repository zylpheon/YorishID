// ===== CONFIG =====
const CONFIG = {
    navHeight: 80,
    animationDuration: 500,
    counterDuration: 2000
};

// ===== SMOOTH SCROLL =====
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
};

const handleSmoothScroll = function (e) {
    e.preventDefault();
    if (isAnimating) return;
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
        const targetPosition = target.offsetTop - CONFIG.navHeight;
        const isMobileMenuOpen = mobileMenu.classList.contains('open');
        if (isMobileMenuOpen) {
            closeMobileMenu();
            setTimeout(() => {
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 0);
        } else {
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
};

// ===== MOBILE MENU =====
let isAnimating = false;
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuOverlay = document.getElementById('menu-overlay');

const initMobileMenu = () => {
    mobileMenuBtn?.addEventListener('click', toggleMenu);
    menuOverlay?.addEventListener('click', closeMenu);
};

const toggleMenu = (e) => {
    e.preventDefault();
    if (isAnimating) return;
    if (mobileMenu.classList.contains('open')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
};

const openMobileMenu = () => {
    if (isAnimating) return;
    isAnimating = true;
    mobileMenuBtn.classList.add('disabled');
    mobileMenu.classList.add('open');
    mobileMenuBtn.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        isAnimating = false;
        mobileMenuBtn.classList.remove('disabled');
    }, CONFIG.animationDuration);
};

const closeMenu = () => {
    if (!isAnimating) {
        closeMobileMenu();
    }
};

const closeMobileMenu = () => {
    if (isAnimating) return;
    isAnimating = true;
    mobileMenuBtn.classList.add('disabled');
    mobileMenu.classList.remove('open');
    mobileMenuBtn.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
        isAnimating = false;
        mobileMenuBtn.classList.remove('disabled');
    }, CONFIG.animationDuration);
};

// ===== SCROLL EFFECTS =====
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
document.body.appendChild(progressBar);

const initScrollEffects = () => {
    window.addEventListener('scroll', () => {
        updateProgressBar();
        updateNavbar();
        updateActiveLink();
    }, { passive: true });
};

const updateProgressBar = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    progressBar.style.width = progress + '%';
};

let lastScroll = 0;
const navbar = document.getElementById('navbar');

const updateNavbar = () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
};

// ===== ACTIVE LINK UPDATE =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const updateActiveLink = () => {
    let current = '';
    const scrollPosition = window.pageYOffset;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
};

// ===== COUNTER ANIMATION =====
const animateCounter = (element, target, duration = CONFIG.counterDuration) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString('id-ID');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString('id-ID');
        }
    }, 16);
};

const handleCounterIntersection = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('.counter');
            if (counter && !counter.dataset.animated) {
                counter.dataset.animated = 'true';
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
            }
        }
    });
};

// ===== OBSERVERS =====
const initObservers = () => {
    const counterObserver = new IntersectionObserver(
        handleCounterIntersection,
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.counter-trigger').forEach(el => {
        counterObserver.observe(el);
    });
};

// ===== INIT =====
const init = () => {
    initSmoothScroll();
    initMobileMenu();
    initScrollEffects();
    initObservers();
    lucide.createIcons();
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Hide loading after init
    setTimeout(() => {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = 'none';
        }
    }, 100);
};

// Run when DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}