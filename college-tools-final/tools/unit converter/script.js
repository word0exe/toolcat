// 定义每种单位类型及其换算比例（以基础单位为基准）
const units = {
  // 长度
  length: {
    '米 (m)': 1,
    '厘米 (cm)': 0.01,
    '公里 (km)': 1000,
    '英寸 (in)': 0.0254,
    '英尺 (ft)': 0.3048,
    '码 (yd)': 0.9144,
    '英里 (mi)': 1609.34,
  },

  // 面积
  area: {
    '平方米 (m²)': 1,
    '平方厘米 (cm²)': 0.0001,
    '平方公里 (km²)': 1000000,
    '平方英尺 (ft²)': 0.092903,
    '平方英里 (mi²)': 2589988.11,
  },

  // 体积
  volume: {
    '立方米 (m³)': 1,
    '升 (L)': 0.001,
    '毫升 (mL)': 0.000001,
    '立方厘米 (cm³)': 0.000001,
    '立方英尺 (ft³)': 0.0283168,
  },

  // 质量
  weight: {
    '千克 (kg)': 1,
    '克 (g)': 0.001,
    '吨 (t)': 1000,
    '磅 (lb)': 0.453592,
    '盎司 (oz)': 0.0283495,
  },

  // 速度
  speed: {
    '米/秒 (m/s)': 1,
    '公里/小时 (km/h)': 0.277778,
    '英里/小时 (mph)': 0.44704,
    '千米/小时 (kph)': 0.277778,
  },
};

// 页面加载时初始化单位选项
window.onload = function () {
  const category = document.getElementById('category');
  category.addEventListener('change', updateUnitOptions);
  updateUnitOptions(); // 初始加载默认单位
};

// 根据选择的类型更新单位选项
function updateUnitOptions() {
  const type = document.getElementById('category').value;
  const fromSelect = document.getElementById('fromUnit');
  const toSelect = document.getElementById('toUnit');

  // 清空旧选项
  fromSelect.innerHTML = '';
  toSelect.innerHTML = '';

  // 插入新选项
  for (let unit in units[type]) {
    const optionFrom = document.createElement('option');
    optionFrom.value = unit;
    optionFrom.textContent = unit;

    const optionTo = optionFrom.cloneNode(true);

    fromSelect.appendChild(optionFrom);
    toSelect.appendChild(optionTo);
  }
}

// 执行转换
function convert() {
  const type = document.getElementById('category').value;
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;
  const value = parseFloat(document.getElementById('value').value);

  if (isNaN(value)) {
    document.getElementById('result').textContent = '请输入有效的数值';
    return;
  }

  // 进行换算
  const baseValue = value * units[type][fromUnit];
  const convertedValue = baseValue / units[type][toUnit];

  document.getElementById('result').textContent =
    `${value} ${fromUnit} = ${convertedValue.toFixed(4)} ${toUnit}`;
}