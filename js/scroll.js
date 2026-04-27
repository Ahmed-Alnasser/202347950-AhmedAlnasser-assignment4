// ============================================
// SCROLL: reveal-on-scroll + back-to-top button
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reveal-on-scroll using IntersectionObserver (sections fade up into view)
    const sections = document.querySelectorAll('main section');
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        sections.forEach((s) => {
            if (s.id !== 'hero') s.classList.add('hidden');
        });

        const revealer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('hidden');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

        sections.forEach((s) => {
            if (s.id !== 'hero') revealer.observe(s);
        });
    }

    // Back-to-top button: shows after scrolling past the viewport
    const backBtn = document.getElementById('back-to-top');
    if (!backBtn) return;

    const toggleBtn = () => {
        const shouldShow = window.scrollY > window.innerHeight * 0.6;
        if (shouldShow) {
            backBtn.hidden = false;
            requestAnimationFrame(() => backBtn.classList.add('visible'));
        } else {
            backBtn.classList.remove('visible');
            // wait for fade-out before re-hiding from a11y tree
            setTimeout(() => {
                if (!backBtn.classList.contains('visible')) backBtn.hidden = true;
            }, 250);
        }
    };

    window.addEventListener('scroll', toggleBtn, { passive: true });
    toggleBtn();

    backBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
    });
});
