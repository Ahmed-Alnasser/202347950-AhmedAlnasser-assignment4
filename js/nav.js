// ============================================
// NAV: mobile hamburger menu toggle
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu   = document.getElementById('nav-menu');

    function setMenu(isOpen) {
        navMenu.classList.toggle('open', isOpen);
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    }

    navToggle.addEventListener('click', () => {
        setMenu(!navMenu.classList.contains('open'));
    });

    // Auto-close after picking a section
    navMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setMenu(false));
    });
});
