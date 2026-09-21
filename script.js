// Navigatie balk donker maken als er naar beneden gescrolled wordt
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}, { passive: true });

// Scroll reveal animaties van divs
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Kleine vertraging per element voor een vloeiend effect
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealElements.forEach(el => observer.observe(el));

// Live update copyright jaartal in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Smooth scroll voor alle interne navigatie links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const navHeight = nav ? nav.offsetHeight : 70;
            const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        }
    });
});

// Popup modal wegklikken
const popupOverlay = document.getElementById('popupOverlay');
const popupClose = document.getElementById('popupClose');

if (popupClose && popupOverlay) {
    popupClose.addEventListener('click', () => {
        popupOverlay.style.display = 'none';
    });

    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.style.display = 'none';
        }
    });
}


const navActionBtn = document.getElementById('navActionBtn');
const tempAnalyseNav = document.getElementById('tempAnalyseNav');

if (navActionBtn || tempAnalyseNav) {
    const today = new Date();
    const eventEnd = new Date(2026, 9, 24, 13, 0, 0);
    if (today >= eventEnd) {
        if (navActionBtn) {
            navActionBtn.textContent = 'Gratis Praktijk-analyse';
            navActionBtn.href = 'https://calendar.google.com/appointments/schedules/AcZssZ2Wxf6LIixdvXjHOgTZi4O4sr-xu2PcqL6kdC5lBHLAyQuLsQGhIONEGdVrduOrEAMpvUn3vA1y';
        }
        if (tempAnalyseNav && tempAnalyseNav.parentElement) {
            tempAnalyseNav.parentElement.style.display = 'none';
        }
    }
}

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    const menuItems = navMenu.querySelectorAll('a');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

