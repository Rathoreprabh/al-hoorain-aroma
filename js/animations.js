// animations.js — GSAP-powered animations
// Requires: gsap + ScrollTrigger loaded before this file

if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

function initHeroAnimations() {
    if (typeof gsap === 'undefined') return;

    const heroTitle = document.querySelector('.hero-title');
    const heroCta = document.querySelector('.hero-cta');
    if (!heroTitle) return;

    gsap.fromTo(heroTitle,
        { opacity: 0, y: -25, skewX: -3 },
        { opacity: 1, y: 0, skewX: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 }
    );

    if (heroCta) {
        gsap.fromTo(heroCta,
            { opacity: 0, scale: 0.92 },
            { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out', delay: 0.5 }
        );
    }
}

function initProductCardAnimations() {
    // Card hover transform is handled by the 3D tilt in main.js (cardTilt module)
    // GSAP card hover removed to prevent transform conflicts
}

function initMoodCardAnimations() {
    if (typeof gsap === 'undefined') return;

    document.addEventListener('mouseenter', (e) => {
        const card = e.target.closest('.mood-card');
        if (card) {
            gsap.to(card, { scale: 1.04, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
        }
    }, true);

    document.addEventListener('mouseleave', (e) => {
        const card = e.target.closest('.mood-card');
        if (card) {
            gsap.to(card, { scale: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
        }
    }, true);
}

function initSectionAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.utils.toArray('.section-title').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: -20 },
            {
                opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 85%' }
            }
        );
    });

    gsap.utils.toArray('.section-subtitle, .section-divider').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0 },
            {
                opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.15,
                scrollTrigger: { trigger: el, start: 'top 85%' }
            }
        );
    });
}

function initButtonAnimations() {
    if (typeof gsap === 'undefined') return;

    document.addEventListener('mouseenter', (e) => {
        if (e.target.classList.contains('cta-button') || e.target.classList.contains('cta-button-outline')) {
            gsap.to(e.target, { y: -3, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
        }
    }, true);

    document.addEventListener('mouseleave', (e) => {
        if (e.target.classList.contains('cta-button') || e.target.classList.contains('cta-button-outline')) {
            gsap.to(e.target, { y: 0, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
        }
    }, true);
}

// Refresh ScrollTrigger on resize (throttled)
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }, 250);
});

window.addEventListener('beforeunload', () => {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(t => t.kill());
    }
});

document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimations();
    initProductCardAnimations();
    initMoodCardAnimations();
    initSectionAnimations();
    initButtonAnimations();
});
