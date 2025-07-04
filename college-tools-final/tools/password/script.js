document.addEventListener('DOMContentLoaded', function() {
  const generateBtn = document.getElementById('generate-btn');
  const copyBtn = document.getElementById('copy-btn');
  const lengthInput = document.getElementById('length');
  
  generateBtn.addEventListener('click', generatePassword);
  copyBtn.addEventListener('click', copyPassword);
  
  // Generate password on page load
  generatePassword();
});

function generatePassword() {
  let length = parseInt(document.getElementById("length").value);
  // Ensure length is between 4 and 12
  length = Math.max(4, Math.min(12, length));
  
  // Update the input value in case it was out of bounds
  document.getElementById("length").value = length;
  
  // Character sets
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()";
  
  // Ensure at least one character from each set
  let password = [
    lowercase.charAt(Math.floor(Math.random() * lowercase.length)),
    uppercase.charAt(Math.floor(Math.random() * uppercase.length)),
    numbers.charAt(Math.floor(Math.random() * numbers.length)),
    symbols.charAt(Math.floor(Math.random() * symbols.length))
  ];
  
  // Fill the rest with random characters from all sets
  const allChars = lowercase + uppercase + numbers + symbols;
  for (let i = password.length; i < length; i++) {
    password.push(allChars.charAt(Math.floor(Math.random() * allChars.length)));
  }
  
  // Shuffle the password array
  password = password.sort(() => Math.random() - 0.5).join('');
  
  document.getElementById("password").textContent = password;
  document.getElementById("copy-btn").disabled = false;
  
  // Visual feedback
  const generateBtn = document.getElementById('generate-btn');
  generateBtn.classList.add('clicked');
  setTimeout(() => {
    generateBtn.classList.remove('clicked');
  }, 300);
}

function copyPassword() {
  const password = document.getElementById("password").textContent;
  if (!password) return;
  
  navigator.clipboard.writeText(password).then(() => {
    const copyBtn = document.getElementById("copy-btn");
    copyBtn.innerHTML = '<span class="btn-text">✓ 已复制</span>';
    copyBtn.classList.add('copied');
    
    setTimeout(() => {
      copyBtn.innerHTML = '<span class="btn-text">复制</span>';
      copyBtn.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('复制失败:', err);
    // Fallback method
    const textarea = document.createElement('textarea');
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    const copyBtn = document.getElementById("copy-btn");
    copyBtn.innerHTML = '<span class="btn-text">✓ 已复制</span>';
    copyBtn.classList.add('copied');
    
    setTimeout(() => {
      copyBtn.innerHTML = '<span class="btn-text">复制</span>';
      copyBtn.classList.remove('copied');
    }, 2000);
  });
}