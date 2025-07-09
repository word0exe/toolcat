document.addEventListener('DOMContentLoaded', () => {
  const heightInput = document.getElementById('height');
  const weightInput = document.getElementById('weight');
  const calculateBtn = document.getElementById('calculateBtn');
  const bmiValue = document.getElementById('bmiValue');
  const bmiCategory = document.getElementById('bmiCategory');
  const healthAdvice = document.getElementById('healthAdvice');
  const bmiIndicator = document.getElementById('bmiIndicator');
  
  // 初始计算
  calculateBMI();
  
  // 绑定事件
  calculateBtn.addEventListener('click', calculateBMI);
  heightInput.addEventListener('input', calculateBMI);
  weightInput.addEventListener('input', calculateBMI);
  
  function calculateBMI() {
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    
    if (!height || !weight || height <= 0 || weight <= 0) {
      bmiValue.textContent = '--';
      bmiCategory.textContent = '请输入有效数据';
      healthAdvice.textContent = '';
      return;
    }
    
    // 计算BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const roundedBmi = bmi.toFixed(1);
    
    // 显示BMI值
    bmiValue.textContent = roundedBmi;
    
    // 确定BMI类别
    let category = '';
    let advice = '';
    let indicatorColor = '';
    
    if (bmi < 18.5) {
      category = '体重偏轻';
      advice = '建议增加营养摄入，适当增重';
      indicatorColor = 'var(--underweight)';
    } else if (bmi < 25) {
      category = '正常体重';
      advice = '继续保持健康的生活方式';
      indicatorColor = 'var(--normal)';
    } else if (bmi < 30) {
      category = '超重';
      advice = '建议控制饮食，增加运动量';
      indicatorColor = 'var(--overweight)';
    } else {
      category = '肥胖';
      advice = '建议咨询医生，制定科学的减重计划';
      indicatorColor = 'var(--obese)';
    }
    
    bmiCategory.textContent = category;
    healthAdvice.textContent = advice;
    
    // 更新指示器位置
    const bmiClamped = Math.min(bmi, 40);
    // 修改位置计算方式，使其在整个区间内正确显示
    const positionPercent = (bmiClamped / 40) * 100;
    // 确保指示器不会超出范围
    const clampedPosition = Math.max(0, Math.min(100, positionPercent));
    bmiIndicator.style.left = `${clampedPosition}%`;
    bmiIndicator.style.backgroundColor = indicatorColor;
    
    // 添加动画效果
    bmiValue.parentElement.classList.remove('bmi-animate');
    setTimeout(() => {
      bmiValue.parentElement.classList.add('bmi-animate');
    }, 10);
  }
});