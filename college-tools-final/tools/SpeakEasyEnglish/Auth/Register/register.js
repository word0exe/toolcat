// register.js
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupérer les valeurs du formulaire
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm').value;
        
        // Validation simple
        if (password !== confirmPassword) {
            alert('两次输入的密码不匹配！');
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            alert('请输入有效的邮箱地址（例如：example@email.com）！');
            return;
        }
        
        // Vérifier si l'utilisateur existe déjà
        const savedUsers = JSON.parse(localStorage.getItem('speakEasyUsers')) || {};
        if (savedUsers[email]) {
            alert('该邮箱已被注册，请使用其他邮箱！');
            return;
        }
        
        // Enregistrer le nouvel utilisateur
        savedUsers[email] = {
            name,
            email,
            password, // Note : dans un projet réel, HASHEZ le mot de passe !
            joinDate: new Date().toISOString()
        };
        
        // Sauvegarder dans localStorage
        localStorage.setItem('speakEasyUsers', JSON.stringify(savedUsers));
        
        // Rediriger vers la page de connexion
        alert('注册成功！请登录您的账号。');
        window.location.href = 'login.html';
    });
});