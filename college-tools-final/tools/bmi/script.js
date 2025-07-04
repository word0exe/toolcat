function calculateBMI() {
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const result = document.getElementById("result");

  if (!height || !weight || height <= 0 || weight <= 0) {
    result.textContent = "请输入有效的身高和体重";
    return;
  }

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  let category = "";

  if (bmi < 18.5) category = "偏瘦";
  else if (bmi < 24.9) category = "正常";
  else if (bmi < 29.9) category = "偏重";
  else category = "肥胖";

  result.textContent = `你的 BMI 是 ${bmi.toFixed(2)}（${category}）`;
}