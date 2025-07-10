// login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupérer les valeurs du formulaire
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Récupérer les utilisateurs enregistrés dans localStorage
        const savedUsers = JSON.parse(localStorage.getItem('speakEasyUsers')) || {};
        
        // Vérifier si l'utilisateur existe
        const user = savedUsers[email];
        if (!user) {
            alert('该邮箱未注册，请先注册！');
            return;
        }
        
        // Vérifier le mot de passe
        if (user.password !== password) {
            alert('密码错误，请重新输入！');
            return;
        }
        
        // Connexion réussie : enregistrer la session utilisateur
        localStorage.setItem('currentUser', JSON.stringify({
            name: user.name,
            email: user.email,
            isLoggedIn: true
        }));
        
        // Rediriger vers la page d'accueil (ou une page de tableau de bord)
        alert(`登录成功！欢迎回来，${user.name}！`);
        window.location.href = '../../index.html';
    });
});