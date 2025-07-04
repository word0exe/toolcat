function generateRandomNumbers() {
    const amount = parseInt(document.getElementById('amount').value);
    const min = parseInt(document.getElementById('min').value);
    const max = parseInt(document.getElementById('max').value);
    const resultsDiv = document.getElementById('results');
    const copyBtn = document.getElementById('copy-btn');
  
    if (isNaN(amount) || amount < 1 || amount > 50) {
      resultsDiv.textContent = 'Amount must be between 1 and 50.';
      copyBtn.disabled = true;
      return;
    }
  
    if (isNaN(min) || isNaN(max) || min < 1 || max > 9999 || min >= max) {
      resultsDiv.textContent = 'Enter valid min and max values (1–9999, min < max).';
      copyBtn.disabled = true;
      return;
    }
  
    const results = [];
    for (let i = 0; i < amount; i++) {
      const rand = Math.floor(Math.random() * (max - min + 1)) + min;
      results.push(rand);
    }
  
    // Display with commas for better readability
    resultsDiv.textContent = `生成结果 (${amount}个): ` + results.join(', ');
    
    // Store the line-break version for copying
    resultsDiv.dataset.copyText = results.join('\n');
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
        console.error('Failed to copy: ', err);
    });
}