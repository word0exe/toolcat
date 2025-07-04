const currencies = {
  "USD": { symbol: "$", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg" },
  "EUR": { symbol: "€", flag: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" },
  "JPY": { symbol: "¥", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg" },
  "GBP": { symbol: "£", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg" },
  "CNY": { symbol: "¥", flag: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg" },
  "BRL": { symbol: "R$", flag: "https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg" },
  "MXN": { symbol: "$", flag: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg" },
  "AUD": { symbol: "$", flag: "https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg" },
  "CAD": { symbol: "$", flag: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg" },
};

const fromSelect = document.getElementById('fromCurrency');
const toSelect = document.getElementById('toCurrency');

function populateCurrencies() {
  Object.keys(currencies).forEach(code => {
    const option1 = new Option(`${code} (${currencies[code].symbol})`, code);
    const option2 = new Option(`${code} (${currencies[code].symbol})`, code);
    fromSelect.add(option1);
    toSelect.add(option2);
  });
  fromSelect.value = 'USD';
  toSelect.value = 'EUR';
  updateFlags();
}

function updateFlags() {
  document.getElementById('fromFlag').src = currencies[fromSelect.value].flag;
  document.getElementById('toFlag').src = currencies[toSelect.value].flag;
}

fromSelect.addEventListener('change', () => { updateFlags(); updateChartFromSelectors(); });
toSelect.addEventListener('change', () => { updateFlags(); updateChartFromSelectors(); });

async function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value);
  const from = fromSelect.value;
  const to = toSelect.value;
  if (isNaN(amount) || amount < 0) return;
  try {
    const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
    const data = await response.json();
    document.getElementById('result').textContent = `结果：${data.rates[to].toFixed(5)} ${currencies[to].symbol}`;
  } catch (error) {
    document.getElementById('result').textContent = `无法转换 ${from} 到 ${to}`;
  }
}

async function loadChart(from = 'USD', to = 'EUR', rangeDays = 30) {
  const end = new Date().toISOString().split('T')[0];
  const start = new Date(Date.now() - rangeDays * 86400000).toISOString().split('T')[0];
  const response = await fetch(`https://api.frankfurter.app/${start}..${end}?from=${from}&to=${to}`);
  const data = await response.json();
  const labels = Object.keys(data.rates);
  const values = labels.map(date => data.rates[date][to]);
  const ctx = document.getElementById('currencyChart').getContext('2d');
  if (window.myChart) window.myChart.destroy();
  window.myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: `1 ${from} 转换为 ${to}（最近${rangeDays}天）`,
        data: values,
        borderColor: '#7d29cc',
        tension: 0.2,
        pointRadius: 4,
        pointHoverRadius: 6,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            title: (tooltipItems) => `日期：${tooltipItems[0].label}`
          }
        },
        legend: { position: 'top' },
        title: {
          display: true,
          text: `汇率走势图：${from} 到 ${to}`
        }
      },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { display: true } }
      }
    }
  });
}

function updateChartFromSelectors() {
  const from = fromSelect.value;
  const to = toSelect.value;
  const days = parseInt(document.getElementById('rangeSelector').value);
  if (from !== to) loadChart(from, to, days);
}

document.getElementById('rangeSelector').addEventListener('change', updateChartFromSelectors);

window.addEventListener('DOMContentLoaded', () => {
  populateCurrencies();
  updateChartFromSelectors();
});