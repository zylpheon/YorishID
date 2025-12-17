document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        if (isAnimating) return;
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = 80;
            const targetPosition = target.offsetTop - navHeight;
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
    });
});
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuOverlay = document.getElementById('menu-overlay');
let isAnimating = false;
function openMobileMenu() {
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
    }, 500);
}
function closeMobileMenu() {
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
    }, 500);
}
mobileMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (isAnimating) return;
    if (mobileMenu.classList.contains('open')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});
menuOverlay.addEventListener('click', () => {
    if (!isAnimating) {
        closeMobileMenu();
    }
});
let lastScroll = 0;
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
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
});