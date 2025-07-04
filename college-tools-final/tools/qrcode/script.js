function generateQR() {
  const text = document.getElementById("qrText").value.trim();
  const canvas = document.getElementById("qrcode");

  if (!text) {
    alert("请输入内容！");
    return;
  }

  QRCode.toCanvas(canvas, text, { width: 256 }, function (error) {
    if (error) {
      console.error(error);
      alert("二维码生成失败！");
    }
  });
}

function downloadQR() {
  const canvas = document.getElementById("qrcode");

  if (!canvas.toDataURL) {
    alert("请先生成二维码！");
    return;
  }

  const url = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = url;
  link.download = "qrcode.png";
  link.click();
}
