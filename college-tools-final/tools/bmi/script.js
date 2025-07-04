
function calculateBMI() {
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const result = document.getElementById('result');
  const arrow = document.getElementById('bmiArrow');
  const bandWidth = 400;

  if (!height || !weight || height <= 0 || weight <= 0) {
    result.textContent = "请输入有效的身高和体重";
    return;
  }

  const bmi = weight / ((height / 100) * (height / 100));
  result.textContent = "你的 BMI 是 " + bmi.toFixed(2);

  let bmiClamped = Math.min(bmi, 40);
  const left = (bmiClamped / 40) * bandWidth;
  arrow.style.left = `calc(${left}px - 10px)`;
}
