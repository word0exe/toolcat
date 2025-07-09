// Keep the original functions but update DOM handling
function generateRandomNumbers() {
  const amount = parseInt(document.getElementById('amount').value);
  const min = parseInt(document.getElementById('min').value);
  const max = parseInt(document.getElementById('max').value);
  const resultsDiv = document.getElementById('results');
  const copyBtn = document.getElementById('copy-btn');
  const resultsContainer = document.querySelector('.results-container');

  // Validation and number generation remains the same
  if (isNaN(amount) || amount < 1 || amount > 50) {
    resultsDiv.textContent = '请输入有效的数量 (1-50之间)';
    resultsContainer.style.display = 'block';
    copyBtn.disabled = true;
    return;
  }

  if (isNaN(min) || min < 1 || isNaN(max) || max > 9999 || min >= max) {
    resultsDiv.textContent = '请输入有效的范围 (1-9999之间，最小值 < 最大值)';
    resultsContainer.style.display = 'block';
    copyBtn.disabled = true;
    return;
  }

  const results = [];
  for (let i = 0; i < amount; i++) {
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    results.push(rand);
  }

  // Display results
  resultsDiv.innerHTML = `<strong>生成结果 (${amount}个):</strong><br>` + results.join(', ');
  resultsDiv.dataset.copyText = results.join('\n');
  resultsContainer.style.display = 'block';
  copyBtn.disabled = false;
}

function copyResults() {
  const resultsDiv = document.getElementById('results');
  const textToCopy = resultsDiv.dataset.copyText;
  
  if (!textToCopy) return;
  
  navigator.clipboard.writeText(textToCopy).then(() => {
    const copyBtn = document.getElementById('copy-btn');
    copyBtn.textContent = '已复制!';
    setTimeout(() => {
      copyBtn.textContent = '复制结果';
    }, 2000);
  }).catch(err => {
    console.error('复制失败: ', err);
  });
}

// Initialize with default values when page loads
window.onload = function() {
  document.getElementById('amount').value = '';
  document.getElementById('min').value = '';
  document.getElementById('max').value = '';
  
  // Generate initial numbers
  generateRandomNumbers();
};