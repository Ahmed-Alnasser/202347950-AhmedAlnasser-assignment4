// ============================================
// MODALS: certificate popups (Oxford, KGSP)
//
// Functions are global (window.*) because the HTML uses inline
// onclick="showOxfordModal()" handlers on the achievement cards.
// ============================================

function showOxfordModal() {
    document.getElementById('oxfordModal').classList.add('show');
}
function hideOxfordModal() {
    document.getElementById('oxfordModal').classList.remove('show');
}

function showKGSPModal() {
    document.getElementById('kgspModal').classList.add('show');
}
function hideKGSPModal() {
    document.getElementById('kgspModal').classList.remove('show');
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
