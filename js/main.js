// ============ LOADING SCREEN ============
const loadingScreen = {
    init() {
        const screen = document.getElementById('loadingScreen');
        if (!screen) return;
        const hide = () => screen.classList.add('hidden');
        window.addEventListener('load', () => setTimeout(hide, 2100));
        setTimeout(hide, 3000); // fallback
    }
};

// ============ SCROLL PROGRESS BAR ============
const scrollProgress = {
    init() {
        const bar = document.getElementById('scrollProgress');
        if (!bar) return;
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
        }, { passive: true });
    }
};

// ============ CUSTOM CURSOR ============
const customCursor = {
    init() {
        const cursor = document.getElementById('cursor');
        const follower = document.getElementById('cursorFollower');
        if (!cursor || !follower) return;

        // Touch devices: hide cursor, restore default
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            cursor.style.display = 'none';
            follower.style.display = 'none';
            return;
        }

        document.body.style.cursor = 'none';

        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        const tick = () => {
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;
            follower.style.left = Math.round(followerX * 10) / 10 + 'px';
            follower.style.top = Math.round(followerY * 10) / 10 + 'px';
            requestAnimationFrame(tick);
        };
        tick();

        document.addEventListener('mouseover', (e) => {
            const el = e.target.closest('a, button, .product-card, .mood-card, .testimonial-card');
            if (el) {
                cursor.classList.add('hover');
                follower.classList.add('hover');
            }
        });

        document.addEventListener('mouseout', (e) => {
            const el = e.target.closest('a, button, .product-card, .mood-card, .testimonial-card');
            if (el) {
                cursor.classList.remove('hover');
                follower.classList.remove('hover');
            }
        });
    }
};

// ============ NAVBAR SCROLL EFFECT ============
const navbarScroll = {
    init() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }
};

// ============ BACK TO TOP ============
const backToTop = {
    init() {
        const btn = document.getElementById('backToTop');
        if (!btn) return;
        window.addEventListener('scroll', () => {
            btn.classList.toggle('visible', window.scrollY > 500);
        }, { passive: true });
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
};

// ============ SCROLL REVEAL (Intersection Observer) ============
const scrollReveal = {
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll(
            '.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .stat-item, .testimonial-card'
        ).forEach(el => observer.observe(el));
    }
};

// ============ COUNTER ANIMATION ============
const counterAnimation = {
    init() {
        const counters = document.querySelectorAll('.stat-number');
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(el => observer.observe(el));
    },

    animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 2000;
        const start = Date.now();

        const update = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target).toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target.toLocaleString();
        };
        requestAnimationFrame(update);
    }
};

// ============ TYPEWRITER EFFECT ============
const typewriter = {
    init() {
        const el = document.getElementById('heroSubtitle');
        if (!el) return;

        const text = el.textContent.trim();
        el.textContent = '';
        el.classList.add('typing');

        setTimeout(() => {
            let i = 0;
            const type = () => {
                if (i < text.length) {
                    el.textContent += text[i++];
                    setTimeout(type, 38);
                } else {
                    setTimeout(() => el.classList.remove('typing'), 1200);
                }
            };
            type();
        }, 1800);
    }
};

// ============ HERO PARTICLES ============
const heroParticles = {
    init() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        for (let i = 0; i < 18; i++) this.create(hero);
    },

    create(container) {
        const p = document.createElement('div');
        const size = Math.random() * 3 + 1.5;
        const x = Math.random() * 100;
        const duration = Math.random() * 14 + 10;
        const delay = Math.random() * 10;
        const drift = (Math.random() - 0.5) * 80;

        p.style.cssText = `
            position:absolute; width:${size}px; height:${size}px;
            background:rgba(212,175,55,${(Math.random() * 0.35 + 0.1).toFixed(2)});
            border-radius:50%; left:${x}%; bottom:-10px;
            pointer-events:none; z-index:1;
            --drift:${drift}px;
            animation:particleFloat ${duration}s ease-in-out ${delay}s infinite;
        `;
        container.appendChild(p);
    }
};

// ============ NEWSLETTER ============
const newsletter = {
    init() {
        const form = document.getElementById('newsletterForm');
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input');
            if (input.value) {
                showNotification('🎉 Welcome to the Inner Circle!');
                input.value = '';
            }
        });
    }
};

// ============ NAVIGATION HANDLERS ============
const navigationHandlers = {
    init() {
        const cartBtn = document.getElementById('cartBtn');
        const accountBtn = document.getElementById('accountBtn');
        const wishlistBtn = document.getElementById('wishlistBtn');

        if (cartBtn) cartBtn.addEventListener('click', () => window.location.href = 'cart.html');
        if (accountBtn) accountBtn.addEventListener('click', () => window.location.href = 'account.html');
        if (wishlistBtn) wishlistBtn.addEventListener('click', () => this.showWishlistModal());
    },

    showWishlistModal() {
        const existing = document.querySelector('.wishlist-modal');
        if (existing) { existing.remove(); return; }

        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const modal = document.createElement('div');
        modal.className = 'wishlist-modal';
        modal.style.cssText = `
            position:fixed; inset:0; background:rgba(0,0,0,0.55);
            backdrop-filter:blur(10px); z-index:9999;
            display:flex; align-items:center; justify-content:center;
            animation:fadeInUp 0.25s ease-out;
        `;

        modal.innerHTML = `
            <div style="
                background:#faf7f2; padding:2.5rem; border-radius:20px;
                border:1px solid rgba(184,146,14,0.22); max-width:580px; width:90%;
                max-height:80vh; overflow-y:auto; box-shadow:0 40px 80px rgba(0,0,0,0.18);
                animation:slideUp 0.4s cubic-bezier(0.34,1.56,0.64,1);
            ">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem;">
                    <h2 style="color:var(--accent-gold); letter-spacing:3px; font-size:1.2rem;">MY WISHLIST</h2>
                    <button onclick="this.closest('.wishlist-modal').remove()" style="
                        background:none; border:1px solid rgba(0,0,0,0.12); color:var(--text-gray);
                        width:34px; height:34px; border-radius:50%; cursor:pointer; font-size:1rem;
                        display:flex; align-items:center; justify-content:center; transition:all 0.2s;
                    " onmouseover="this.style.borderColor='var(--accent-gold)'; this.style.color='var(--accent-gold)'"
                       onmouseout="this.style.borderColor='rgba(0,0,0,0.12)'; this.style.color='var(--text-gray)'">✕</button>
                </div>
                ${wishlist.length === 0
                    ? '<p style="color:var(--text-gray); text-align:center; padding:2rem 0;">Your wishlist is empty</p>'
                    : `<div style="display:flex; flex-direction:column; gap:0.8rem;">
                        ${wishlist.map(p => `
                            <div style="
                                display:flex; justify-content:space-between; align-items:center;
                                padding:1rem 1.2rem; background:#fff; border:1px solid rgba(0,0,0,0.07);
                                border-radius:12px; box-shadow:0 2px 12px rgba(0,0,0,0.04);
                            ">
                                <div style="display:flex; align-items:center; gap:1rem;">
                                    <span style="font-size:1.8rem;">${p.emoji}</span>
                                    <div>
                                        <h4 style="color:#1a1208; font-size:0.88rem;">${p.name}</h4>
                                        <p style="color:var(--accent-gold); font-weight:700;">$${p.price}</p>
                                    </div>
                                </div>
                                <button onclick="addToCart(${p.id},{stopPropagation:()=>{}}); this.closest('.wishlist-modal').remove();" style="
                                    background:linear-gradient(135deg,var(--accent-gold),var(--accent-light-gold));
                                    color:#fff; border:none; padding:0.55rem 1rem;
                                    cursor:pointer; border-radius:8px; font-weight:700; font-size:0.75rem;
                                    letter-spacing:1px;
                                ">ADD TO CART</button>
                            </div>
                        `).join('')}
                    </div>`
                }
                <button onclick="this.closest('.wishlist-modal').remove()" style="
                    margin-top:1.5rem; width:100%; background:rgba(0,0,0,0.04);
                    color:var(--text-gray); border:1px solid rgba(0,0,0,0.1);
                    padding:0.8rem; cursor:pointer; border-radius:8px; font-size:0.82rem;
                    letter-spacing:1px; transition:all 0.2s; font-family:inherit;
                " onmouseover="this.style.borderColor='var(--accent-gold)'; this.style.color='var(--accent-gold)'"
                   onmouseout="this.style.borderColor='rgba(0,0,0,0.1)'; this.style.color='var(--text-gray)'">CLOSE</button>
            </div>
        `;

        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    }
};

// ============ CTA BUTTON HANDLERS ============
const ctaHandlers = {
    init() {
        document.addEventListener('click', (e) => {
            const btn = e.target.classList.contains('cta-button') ? e.target : e.target.closest('.cta-button');
            if (btn) {
                if (btn.classList.contains('hero-cta')) {
                    window.location.href = 'shop.html';
                }
                return;
            }
            if (e.target.classList.contains('cta-button-outline') || e.target.classList.contains('story-btn')) {
                const story = document.getElementById('story');
                if (story) story.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
};

// ============ MOOD SELECTOR ============
const moodSelector = {
    init() {
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.mood-card');
            if (!card) return;
            const mood = card.getAttribute('data-mood');
            document.querySelectorAll('.mood-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            this.display(mood);
        });
    },

    display(mood) {
        const container = document.getElementById('moodResults');
        if (!container) return;
        const filtered = getProductsByMood(mood);

        if (typeof gsap !== 'undefined') {
            gsap.to(container, {
                opacity: 0, y: 10, duration: 0.2,
                onComplete: () => {
                    renderProducts('moodResults', filtered);
                    gsap.to(container, { opacity: 1, y: 0, duration: 0.35 });
                }
            });
        } else {
            renderProducts('moodResults', filtered);
        }
    }
};

// ============ SMOOTH SCROLL ============
const smoothScroll = {
    init() {
        document.addEventListener('click', (e) => {
            const link = e.target.tagName === 'A' ? e.target : e.target.closest('a');
            if (!link) return;
            const href = link.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }
};

// ============ MOBILE MENU ============
const mobileMenu = {
    init() {
        const btn = document.getElementById('mobileMenuBtn');
        const nav = document.getElementById('navLinks');
        if (!btn || !nav) return;

        if (window.innerWidth > 768) btn.style.display = 'none';

        btn.addEventListener('click', () => {
            const open = nav.classList.toggle('mobile-open');
            btn.textContent = open ? '✕' : '☰';
        });

        nav.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                nav.classList.remove('mobile-open');
                btn.textContent = '☰';
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                nav.classList.remove('mobile-open');
                btn.style.display = 'none';
                btn.textContent = '☰';
            } else {
                btn.style.display = 'flex';
            }
        });
    }
};

// ============ 3D CARD TILT ============
const cardTilt = {
    init() {
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

        let activeCard = null;

        document.addEventListener('mousemove', (e) => {
            const card = e.target.closest('.product-card');
            if (!card) {
                if (activeCard) {
                    activeCard.style.transition = 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease, border-color 0.4s ease';
                    activeCard.style.transform = '';
                    activeCard = null;
                }
                return;
            }
            activeCard = card;
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transition = 'transform 0.08s linear, box-shadow 0.4s ease, border-color 0.4s ease';
            card.style.transform = `perspective(900px) rotateX(${-y * 12}deg) rotateY(${x * 16}deg) translateY(-8px) scale(1.02)`;
        });
    }
};

// ============ MAGNETIC BUTTONS ============
const magneticButtons = {
    init() {
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
        document.querySelectorAll('.cta-button, .cta-button-outline').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * 0.28;
                const y = (e.clientY - rect.top - rect.height / 2) * 0.28;
                btn.style.transform = `translate(${x}px, ${y}px) translateY(-3px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
                btn.style.transform = '';
                setTimeout(() => { btn.style.transition = ''; }, 400);
            });
        });
    }
};

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
    loadingScreen.init();
    scrollProgress.init();
    customCursor.init();
    navbarScroll.init();
    backToTop.init();
    scrollReveal.init();
    counterAnimation.init();
    typewriter.init();
    heroParticles.init();
    newsletter.init();
    navigationHandlers.init();
    ctaHandlers.init();
    moodSelector.init();
    smoothScroll.init();
    mobileMenu.init();
    cardTilt.init();
    magneticButtons.init();

    updateCartBadge();
    updateWishlistBadge();
});
