document.addEventListener('DOMContentLoaded', function() {
  const generateBtn = document.getElementById('generate-btn');
  const copyBtn = document.getElementById('copy-btn');
  
  generateBtn.addEventListener('click', generatePassword);
  copyBtn.addEventListener('click', copyPassword);
});

function generatePassword() {
  let length = parseInt(document.getElementById("length").value);
  // Ensure length is between 4 and 12
  length = Math.max(4, Math.min(12, length));
  
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  document.getElementById("password").textContent = password;
  document.getElementById("copy-btn").disabled = false;
}

function copyPassword() {
  const password = document.getElementById("password").textContent;
  if (!password) return;
  
  navigator.clipboard.writeText(password).then(() => {
    const copyBtn = document.getElementById("copy-btn");
    copyBtn.textContent = "已复制!";
    copyBtn.classList.add('copied');
    
    setTimeout(() => {
      copyBtn.textContent = "复制";
      copyBtn.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('复制失败:', err);
    // 降级方案
    const textarea = document.createElement('textarea');
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    const copyBtn = document.getElementById("copy-btn");
    copyBtn.textContent = "已复制!";
    copyBtn.classList.add('copied');
    
    setTimeout(() => {
      copyBtn.textContent = "复制";
      copyBtn.classList.remove('copied');
    }, 2000);
  });
}