const colorPicker = document.getElementById('colorPicker');
const hexInput = document.getElementById('hexInput');
const rInput = document.getElementById('rInput');
const gInput = document.getElementById('gInput');
const bInput = document.getElementById('bInput');
const previewBox = document.getElementById('previewBox');

function updateFromHex(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 6) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rInput.value = r;
    gInput.value = g;
    bInput.value = b;
    updatePreview(`rgb(${r}, ${g}, ${b})`);
    colorPicker.value = `#${hex}`;
  }
}

function updateFromRGB() {
  const r = parseInt(rInput.value);
  const g = parseInt(gInput.value);
  const b = parseInt(bInput.value);
  if ([r, g, b].every(n => n >= 0 && n <= 255 && !isNaN(n))) {
    const hex = `#${[r, g, b].map(n => n.toString(16).padStart(2, '0')).join('')}`;
    hexInput.value = hex;
    colorPicker.value = hex;
    updatePreview(`rgb(${r}, ${g}, ${b})`);
  }
}

function updatePreview(color) {
  previewBox.style.backgroundColor = color;
    const computed = getComputedStyle(previewBox).backgroundColor;
    const rgbMatch = computed.match(/(\d+), (\d+), (\d+)/);
    if (rgbMatch) {
        const [r, g, b] = rgbMatch.slice(1).map(Number);
        const hex = `#${[r, g, b].map(n => n.toString(16).padStart(2, '0')).join('')}`;
        previewBox.textContent = `RGB: rgb(${r}, ${g}, ${b})\nHEX: ${hex.toUpperCase()}`;
      } else {
        previewBox.textContent = color;
      }
}

colorPicker.addEventListener('input', e => updateFromHex(e.target.value));
hexInput.addEventListener('input', e => updateFromHex(e.target.value));
[rInput, gInput, bInput].forEach(input =>
  input.addEventListener('input', updateFromRGB)
);

// Initial setup
updateFromHex(colorPicker.value);