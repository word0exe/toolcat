function convertTimestamp() {
  const input = document.getElementById("timestampInput").value;
  const timestamp = parseInt(input, 10);
  if (isNaN(timestamp)) {
    document.getElementById("result").textContent = "请输入有效时间戳";
    return;
  }
  const date = new Date(timestamp * 1000);
  document.getElementById("result").textContent = date.toLocaleString();
}