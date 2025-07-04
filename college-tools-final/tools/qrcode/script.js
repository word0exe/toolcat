function generateQR() {
  const text = document.getElementById("qrText").value;
  const canvas = document.getElementById("qrcode");
  QRCode.toCanvas(canvas, text, function (error) {
    if (error) console.error(error);
  });
}