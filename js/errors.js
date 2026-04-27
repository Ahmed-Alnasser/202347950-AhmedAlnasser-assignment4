// ============================================
// ERRORS: global safety net for uncaught errors
//
// Surfaces unexpected failures as a friendly toast so the page
// never silently breaks. Local handlers (contact.js, summarize.js)
// still own their own user-facing messages — this is the fallback.
// ============================================

(function () {
    let toastVisible = false;

    function showErrorToast(message) {
        if (toastVisible) return;
        toastVisible = true;

        const toast = document.createElement('div');
        toast.className = 'error-toast';
        toast.setAttribute('role', 'alert');
        toast.textContent = message;
        document.body.appendChild(toast);

        requestAnimationFrame(() => toast.classList.add('visible'));

        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => {
                if (toast.parentNode) toast.remove();
                toastVisible = false;
            }, 300);
        }, 4500);
    }

    window.addEventListener('error', (event) => {
        // Cross-origin script errors arrive opaque ("Script error.") — skip those
        if (!event.message || event.message === 'Script error.') return;
        console.error('Uncaught error:', event.error || event.message);
        showErrorToast('Something went wrong. Please refresh if the issue persists.');
    });

    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason);
        showErrorToast('Something went wrong. Please refresh if the issue persists.');
    });
})();
