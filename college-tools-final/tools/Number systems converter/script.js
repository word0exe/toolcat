// 定义支持的进制系统及其对应的基数
const bases = {
  binary: 2,        // 二进制：基数为 2
  decimal: 10,      // 十进制：基数为 10
  hexadecimal: 16,  // 十六进制：基数为 16
  octal: 8          // 八进制：基数为 8
};

// 主转换函数，用户点击“转换”按钮时调用
function convert() {
  // 获取输入的数值，并去除前后空格
  const inputValue = document.getElementById('inputValue').value.trim();
  // 获取用户选择的原始数字系统
  const fromSystem = document.getElementById('fromSystem').value;
  // 获取用户选择的目标数字系统
  const toSystem = document.getElementById('toSystem').value;

  try {
    // 将输入值按原始系统转换为十进制整数
    const decimalValue = parseInt(inputValue, bases[fromSystem]);
    // 如果转换失败，则抛出错误
    if (isNaN(decimalValue)) throw new Error("无效的数值");

    // 将十进制整数转换为目标系统的字符串，并转换为大写（仅对十六进制有效）
    let result = decimalValue.toString(bases[toSystem]).toUpperCase();

    // 保留值（根据不同系统，未来可添加前缀等操作）
    if (toSystem === 'binary') result = result;        // 二进制
    if (toSystem === 'hexadecimal') result = result;   // 十六进制
    if (toSystem === 'octal') result = result;         // 八进制

    // 显示转换结果
    document.getElementById('result').textContent = `结果：${result}`;
  } catch (err) {
    // 如果发生错误，则提示用户输入无效
    document.getElementById('result').textContent = "错误：请输入有效的数值";
  }
}