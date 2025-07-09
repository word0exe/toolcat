document.addEventListener('DOMContentLoaded', () => {
  // Set up gender selection
  const genderOptions = document.querySelectorAll('.gender-option');
  const genderInput = document.getElementById('gender');
  
  genderOptions.forEach(option => {
    option.addEventListener('click', () => {
      // Remove selected class from all options
      genderOptions.forEach(opt => opt.classList.remove('selected'));
      
      // Add selected class to clicked option
      option.classList.add('selected');
      
      // Update hidden input value
      genderInput.value = option.dataset.value;
    });
  });
  
  // Calculate button handler
  document.getElementById('calculate').addEventListener('click', () => {
    const gender = genderInput.value;
    const age = parseFloat(document.getElementById('age').value);
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const activity = parseFloat(document.getElementById('activity').value);
    
    // Validate inputs
    if (!age || age < 10 || age > 120) {
      alert('请输入有效的年龄 (10-120岁)');
      return;
    }
    
    if (!height || height < 100 || height > 250) {
      alert('请输入有效的身高 (100-250厘米)');
      return;
    }
    
    if (!weight || weight < 30 || weight > 300) {
      alert('请输入有效的体重 (30-300公斤)');
      return;
    }
    
    // Calculate BMR (Mifflin-St Jeor Equation)
    let bmr;
    if (gender === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
    
    // Calculate daily calories
    const dailyCalories = Math.round(bmr * activity);
    const roundedBMR = Math.round(bmr);
    
    // Display results
    document.getElementById('bmrResult').textContent = `${roundedBMR} 千卡/天`;
    document.getElementById('calorieResult').textContent = `${dailyCalories} 千卡/天`;
    
    // Show result box
    document.querySelector('.result').style.display = 'block';
  });
  
  // Trigger initial calculation
  document.getElementById('calculate').click();
});