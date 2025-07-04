function generateRandomNumbers() {
    const amount = parseInt(document.getElementById('amount').value);
    const min = parseInt(document.getElementById('min').value);
    const max = parseInt(document.getElementById('max').value);
    const resultsDiv = document.getElementById('results');
  
    if (isNaN(amount) || amount < 1 || amount > 50) {
      resultsDiv.textContent = 'Amount must be between 1 and 50.';
      return;
    }
  
    if (isNaN(min) || isNaN(max) || min < 1 || max > 9999 || min >= max) {
      resultsDiv.textContent = 'Enter valid min and max values (1–9999, min < max).';
      return;
    }
  
    const results = [];
    for (let i = 0; i < amount; i++) {
      const rand = Math.floor(Math.random() * (max - min + 1)) + min;
      results.push(rand);
    }
  
    resultsDiv.textContent = `生成结果 (${amount}): ` + results.join(', ');
  }