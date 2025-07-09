document.addEventListener('DOMContentLoaded', () => {
  // Initialize canvas
  const canvas = document.getElementById('qrcode');
  canvas.width = 0;
  canvas.height = 0;
  
  // Button event listeners
  document.getElementById('generateBtn').addEventListener('click', generateQR);
  document.getElementById('downloadBtn').addEventListener('click', downloadQR);
});

function generateQR() {
  const input = document.getElementById('qrText');
  const canvas = document.getElementById('qrcode');
  
  if (input.value.trim() === '') {
    alert('请输入内容');
    return;
  }
  
  // Clear canvas
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  
  // Generate new QR
  QRCode.toCanvas(canvas, input.value, {
    width: 180,
    margin: 2,
    color: {
      dark: '#1e2022',
      light: '#ffffff'
    }
  }, (error) => {
    if (error) {
      console.error('二维码生成错误:', error);
      alert('生成二维码时出错，请重试');
    }
  });
}

function downloadQR() {
  const canvas = document.getElementById('qrcode');
  
  if (canvas.width === 0) {
    alert('请先生成二维码');
    return;
  }
  
  const link = document.createElement('a');
  link.download = '我的二维码.png';
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}