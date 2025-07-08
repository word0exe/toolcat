function calculate() {
  const expression = document.getElementById("expression").value;
  try {
    const result = eval(expression);
    document.getElementById("result").textContent = "结果: " + result;
  } catch (e) {
    document.getElementById("result").textContent = "表达式有误";
  }
}