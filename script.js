// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU TOGGLE =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}

// ===== COPY CONTRACT ADDRESS =====
function copyAddress() {
    const address = document.getElementById('caAddress').textContent;
    if (!address || address.includes('TBA')) {
        return;
    }
    navigator.clipboard.writeText(address).then(() => {
        showCopyFeedback();
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = address;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showCopyFeedback();
    });
}

function showCopyFeedback() {
    const buttons = document.querySelectorAll('.copy-btn');
    buttons.forEach(btn => {
        btn.classList.add('copied');
        const textEl = btn.querySelector('.copy-text') || btn;
        const origText = textEl.textContent;
        textEl.textContent = 'Copied!';
        setTimeout(() => {
            btn.classList.remove('copied');
            textEl.textContent = origText;
        }, 2000);
    });
}

// Hero copy button
const copyBtn = document.getElementById('copyBtn');
if (copyBtn) {
    copyBtn.addEventListener('click', copyAddress);
}

// ===== SCROLL ANIMATIONS =====
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

// Add fade-in to sections
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.about-card, .timeline-item, .token-card, .step-card, .article-card, .social-card, .stat-item'
    );
    animateElements.forEach((el, i) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${i * 0.08}s`;
        observer.observe(el);
    });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = navbar.offsetHeight + 20;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== PARALLAX FOR COIN AVATAR =====
const coinAvatar = document.getElementById('coinAvatar');

if (coinAvatar && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        coinAvatar.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}
