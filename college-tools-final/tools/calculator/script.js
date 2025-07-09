document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('expression');
  const resultElement = document.getElementById('result');
  
  // 按钮事件处理
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      const value = button.dataset.value;
      
      if (value) {
        appendToDisplay(value);
      } else if (action === 'clear') {
        clearDisplay();
      } else if (action === 'calculate') {
        calculate();
      }
    });
  });
  
  // 键盘支持
  document.addEventListener('keydown', (e) => {
    if (/[\d\.\+\-\*\/\(\)]/.test(e.key)) {
      appendToDisplay(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
      calculate();
    } else if (e.key === 'Escape') {
      clearDisplay();
    } else if (e.key === 'Backspace') {
      const display = document.getElementById('expression');
      display.value = display.value.slice(0, -1);
    }
  });
  
  // 追加输入
  function appendToDisplay(value) {
    const currentValue = display.value;
    
    // 防止多个小数点
    if (value === '.' && currentValue.includes('.') && 
        !['+', '-', '*', '/', '('].some(op => currentValue.includes(op))) {
      return;
    }
    
    // 防止运算符重复输入
    const operators = ['+', '-', '*', '/'];
    if (operators.includes(value) && operators.includes(currentValue.slice(-1))) {
      display.value = currentValue.slice(0, -1) + value;
      return;
    }
    
    display.value += value;
  }
  
  // 清除显示
  function clearDisplay() {
    display.value = '';
    resultElement.textContent = '';
  }
  
  // 计算结果
  function calculate() {
    const expression = display.value;
    
    if (!expression) {
      resultElement.textContent = '请输入表达式';
      return;
    }
    
    try {
      let safeExpression = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/(\d+)%/g, '($1/100)');
        
      const result = new Function(`return ${safeExpression}`)();
      
      resultElement.textContent = `= ${formatResult(result)}`;
    } catch (e) {
      resultElement.textContent = '表达式错误';
      setTimeout(() => {
        resultElement.textContent = '';
      }, 2000);
    }
  }
  
  // 格式化结果
  function formatResult(num) {
    if (num === Infinity || num === -Infinity || isNaN(num)) {
      return '错误';
    }
    
    if (Number.isInteger(num)) return num;
    
    const formatted = num.toFixed(6).replace(/\.?0+$/, '');
    return formatted.length > 10 ? num.toExponential(4) : formatted;
  }
});