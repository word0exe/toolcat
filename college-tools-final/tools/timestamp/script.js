// 初始化页面时显示当前时间
window.onload = function() {
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);
};

// 更新时间显示
function updateCurrentTime() {
  const now = new Date();
  
  // 当前时间戳（秒）
  document.getElementById('currentTimestampSec').textContent = Math.floor(now.getTime() / 1000);
  
  // 当前时间戳（毫秒）
  document.getElementById('currentTimestampMs').textContent = now.getTime();
  
  // 当前本地时间
  document.getElementById('currentLocalTime').textContent = now.toLocaleString();
  
  // 当前UTC时间
  document.getElementById('currentUTCTime').textContent = now.toUTCString();
}

// 时间戳转日期
function convertTimestamp() {
  const input = document.getElementById("timestampInput").value.trim();
  const timestamp = parseInt(input, 10);
  const isMilliseconds = document.querySelector('input[name="timestampType"]:checked').value === "milliseconds";
  const resultElement = document.getElementById("timestampResult");
  
  if (isNaN(timestamp)) {
    resultElement.innerHTML = "<span style='color: red;'>请输入有效的时间戳</span>";
    return;
  }
  
  // 根据选择的时间戳类型调整
  const date = isMilliseconds ? new Date(timestamp) : new Date(timestamp * 1000);
  
  if (isNaN(date.getTime())) {
    resultElement.innerHTML = "<span style='color: red;'>时间戳超出范围</span>";
    return;
  }
  
  const localTime = date.toLocaleString();
  const utcTime = date.toUTCString();
  const isoTime = date.toISOString();
  
  resultElement.innerHTML = `
    <p><strong>本地时间：</strong>${localTime}</p>
    <p><strong>UTC时间：</strong>${utcTime}</p>
    <p><strong>ISO格式：</strong>${isoTime}</p>
    <p><strong>时间戳（秒）：</strong>${Math.floor(date.getTime() / 1000)}</p>
    <p><strong>时间戳（毫秒）：</strong>${date.getTime()}</p>
  `;
}

// 日期转时间戳
function convertDate() {
  const dateInput = document.getElementById("dateInput").value;
  const resultElement = document.getElementById("dateResult");
  
  if (!dateInput) {
    resultElement.innerHTML = "<span style='color: red;'>请选择日期和时间</span>";
    return;
  }
  
  const date = new Date(dateInput);
  
  if (isNaN(date.getTime())) {
    resultElement.innerHTML = "<span style='color: red;'>无效的日期格式</span>";
    return;
  }
  
  const timestampSec = Math.floor(date.getTime() / 1000);
  const timestampMs = date.getTime();
  
  resultElement.innerHTML = `
    <p><strong>时间戳（秒）：</strong>${timestampSec}</p>
    <p><strong>时间戳（毫秒）：</strong>${timestampMs}</p>
    <p><strong>本地时间：</strong>${date.toLocaleString()}</p>
    <p><strong>UTC时间：</strong>${date.toUTCString()}</p>
  `;
}