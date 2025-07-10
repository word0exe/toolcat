// ------------------------------
// GESTION DE LA CONNEXION
// ------------------------------
function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.isLoggedIn) {
        const userStatus = document.getElementById('user-status');
        const loginLink = document.getElementById('login-link');
        const registerLink = document.getElementById('register-link');
        const logoutBtn = document.getElementById('logout-btn');
        
        if (userStatus) userStatus.textContent = `欢迎，${user.name}`;
        if (loginLink) loginLink.classList.add('hidden');
        if (registerLink) registerLink.classList.add('hidden');
        if (logoutBtn) logoutBtn.classList.remove('hidden');
    }
}

// Déconnexion
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            checkLoginStatus();
            window.location.href = '../index.html'; // Retour à l'accueil
        });
    }
});


// ------------------------------
// NAVIGATION DES PAGES
// ------------------------------
// Exemple de fonction pour gérer la navigation vers les outils
function navigateToTool(page) {
    window.location.href = `../Tools/${page}.html`;
}


// ------------------------------
// FONCTIONNALITÉS DE PRONONCIATION.HTML
// ------------------------------
// Gestion des onglets
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    if (!tabBtns) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const content = document.getElementById(`${tabId}-content`);
            if (content) content.classList.add('active');
        });
    });
}

// Modal de pratique
function startPhoneticPractice(phonetic) {
    const modalTitle = document.getElementById('modal-title');
    const practiceModal = document.getElementById('practice-modal');
    
    if (modalTitle && practiceModal) {
        modalTitle.textContent = `音标练习：${phonetic}`;
        practiceModal.classList.remove('hidden');
    }
}

function startRecording() {
    const recordBtn = document.getElementById('record-modal-btn');
    const recordingStatus = document.getElementById('modal-recording-status');
    const feedbackArea = document.getElementById('feedback-area');
    
    if (recordBtn && recordingStatus && feedbackArea) {
        recordBtn.classList.add('hidden');
        recordingStatus.classList.remove('hidden');
        
        // Simulation de la durée de l'enregistrement (remplacer par la logique réelle)
        setTimeout(() => {
            recordingStatus.classList.add('hidden');
            feedbackArea.classList.remove('hidden');
        }, 3000);
    }
}

function closeModal() {
    const practiceModal = document.getElementById('practice-modal');
    const recordBtn = document.getElementById('record-modal-btn');
    const recordingStatus = document.getElementById('modal-recording-status');
    const feedbackArea = document.getElementById('feedback-area');
    
    if (practiceModal) practiceModal.classList.add('hidden');
    if (recordBtn) recordBtn.classList.remove('hidden');
    if (recordingStatus) recordingStatus.classList.add('hidden');
    if (feedbackArea) feedbackArea.classList.add('hidden');
}


// ------------------------------
// INITIALISATION
// ------------------------------
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    
    // Initialisation spécifique à pronunciation.html
    if (document.body.classList.contains('content-page')) {
        setupTabs();
        
        // Liaison des événements pour les boutons de pratique
        const practiceBtns = document.querySelectorAll('.practice-btn');
        if (practiceBtns) {
            practiceBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const phonetic = e.target.getAttribute('onclick').match(/'([^']+)'/)[1];
                    startPhoneticPractice(phonetic);
                });
            });
        }
    }
});