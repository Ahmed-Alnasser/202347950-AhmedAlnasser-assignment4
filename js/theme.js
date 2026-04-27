// ============================================
// THEME: dark/light mode toggle + persistence
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Friendly toast for localStorage failures (not the alarming red kind)
    function showThemeErrorToast(message) {
        if (document.getElementById('theme-error-toast')) return;
        const toast = document.createElement('div');
        toast.id = 'theme-error-toast';
        toast.innerHTML = 'ℹ️ ' + message;
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '14px 20px',
            borderRadius: '8px',
            fontSize: '0.95rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: '9999',
            cursor: 'pointer',
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        });

        const dismiss = () => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.parentNode && toast.remove(), 400);
        };
        toast.onclick = dismiss;

        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 10);
        setTimeout(dismiss, 5000);
    }

    // Load saved theme (defaults to light)
    let savedTheme = 'light';
    try {
        const stored = localStorage.getItem('theme');
        if (stored) {
            savedTheme = stored;
        } else {
            showThemeErrorToast('No saved theme found. Defaulting to light mode.');
            localStorage.setItem('theme', 'light');
        }
    } catch (e) {
        showThemeErrorToast('Could not load your theme preference. Defaulting to light mode.');
    }

    function applyTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        themeToggle.innerText = theme === 'dark' ? 'Light Mode ☀️' : 'Dark Mode 🌙';
    }
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        try {
            localStorage.setItem('theme', newTheme);
        } catch (e) {
            showThemeErrorToast("Sorry, we couldn't save your theme preference right now.");
        }
    });
});
