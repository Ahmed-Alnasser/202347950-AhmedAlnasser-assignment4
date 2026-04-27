// ============================================
// CONTACT: EmailJS form submission
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // EmailJS credentials (safe to expose in client-side code, rate-limited per domain)
    const EMAILJS_PUBLIC_KEY  = 'DxUv0br39trJzNBjS';
    const EMAILJS_SERVICE_ID  = 'service_e905csm';
    const EMAILJS_TEMPLATE_ID = 'template_p474kng';

    if (window.emailjs) {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }

    const contactForm   = document.getElementById('contact-form');
    const contactStatus = document.getElementById('contact-status');
    const contactSubmit = document.getElementById('contact-submit');

    function setStatus(message, kind) {
        contactStatus.textContent = message;
        contactStatus.className = 'contact-status ' + kind;
    }

    // Live character counter for the message textarea
    const messageInput   = document.getElementById('message');
    const messageCounter = document.getElementById('message-counter');
    if (messageInput && messageCounter) {
        const max = parseInt(messageInput.getAttribute('maxlength'), 10) || 2000;
        const updateCounter = () => {
            const len = messageInput.value.length;
            messageCounter.textContent = `${len} / ${max}`;
            messageCounter.classList.toggle('near-limit', len >= max * 0.9 && len < max);
            messageCounter.classList.toggle('at-limit',   len >= max);
        };
        messageInput.addEventListener('input', updateCounter);
        updateCounter();
    }

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!window.emailjs) {
            setStatus('Email service failed to load. Please try again later.', 'error');
            return;
        }

        contactSubmit.disabled = true;
        contactSubmit.textContent = 'Sending...';
        setStatus('', '');

        document.getElementById('time').value = new Date().toLocaleString();

        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
            .then(() => {
                setStatus('✅ Message sent! I will get back to you soon.', 'success');
                contactForm.reset();
                // form.reset() doesn't fire 'input' — refresh the counter manually
                if (messageInput) messageInput.dispatchEvent(new Event('input'));
            })
            .catch((err) => {
                console.error('EmailJS error:', err);
                setStatus('❌ Something went wrong. Please email me directly.', 'error');
            })
            .finally(() => {
                contactSubmit.disabled = false;
                contactSubmit.textContent = 'Send Message';
            });
    });
});
