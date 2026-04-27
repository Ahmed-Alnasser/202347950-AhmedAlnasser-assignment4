// ============================================
// TYPEWRITER: hero tagline typing/deleting loop
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const tagline = document.querySelector('.tagline');
    if (!tagline) return;

    const text = tagline.innerText.trim();
    tagline.innerText = '';

    let i = 0;
    let isDeleting = false;

    function typeWriter() {
        if (!isDeleting) {
            if (i < text.length) {
                if (text.charAt(i) === ' ') tagline.innerHTML += '&nbsp;';
                else                        tagline.innerText += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                isDeleting = true;
                setTimeout(typeWriter, 2000);
            }
        } else {
            if (i > 0) {
                tagline.innerText = tagline.innerText.slice(0, -1);
                i--;
                setTimeout(typeWriter, 50);
            } else {
                isDeleting = false;
                tagline.innerText = '';
                setTimeout(typeWriter, 500);
            }
        }
    }

    setTimeout(typeWriter, 500);
});
