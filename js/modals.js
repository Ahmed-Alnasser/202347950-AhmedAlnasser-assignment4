// ============================================
// MODALS: certificate popups (Oxford, KGSP)
//
// Functions are global (window.*) because the HTML uses inline
// onclick="showOxfordModal()" handlers on the achievement cards.
// ============================================

function setModalOpen(modal, open) {
    modal.classList.toggle('show', open);
    modal.setAttribute('aria-hidden', String(!open));
}

function showOxfordModal() {
    setModalOpen(document.getElementById('oxfordModal'), true);
}
function hideOxfordModal() {
    setModalOpen(document.getElementById('oxfordModal'), false);
}

function showKGSPModal() {
    setModalOpen(document.getElementById('kgspModal'), true);
}
function hideKGSPModal() {
    setModalOpen(document.getElementById('kgspModal'), false);
}

// Oxford gallery: 2 images, prev/next
let currentOxfordImage = 1;
function nextOxfordImg() {
    if (currentOxfordImage === 1) {
        document.getElementById('oxfordImg').src = 'assets/images/Oxford2.jpeg';
        currentOxfordImage = 2;
    }
}
function prevOxfordImg() {
    if (currentOxfordImage === 2) {
        document.getElementById('oxfordImg').src = 'assets/images/Oxford1.jpeg';
        currentOxfordImage = 1;
    }
}

// Click on backdrop (outside modal-content) to close
window.addEventListener('click', (event) => {
    const oxford = document.getElementById('oxfordModal');
    const kgsp   = document.getElementById('kgspModal');
    if (event.target === oxford) hideOxfordModal();
    if (event.target === kgsp)   hideKGSPModal();
});

// Escape key closes any open modal
window.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const oxford = document.getElementById('oxfordModal');
    const kgsp   = document.getElementById('kgspModal');
    if (oxford && oxford.classList.contains('show')) hideOxfordModal();
    if (kgsp   && kgsp.classList.contains('show'))   hideKGSPModal();
});
