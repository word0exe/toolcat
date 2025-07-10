$(document).ready(function () {
  $('#convertBtn').click(function () {
    const value = parseFloat($('#inputTemp').val());
    const from = $('#fromUnit').val();
    const to = $('#toUnit').val();

    if (isNaN(value)) {
      $('#result')
        .html('请输入有效的数字。')
        .addClass('show');
      return;
    }

    const celsius = toCelsius(value, from);
    const converted = fromCelsius(celsius, to);
    
    // Add animation effect
    $('#result')
      .removeClass('show')
      .html(`${value}°${from} = <strong>${converted.toFixed(2)}°${to}</strong>`);
      
    // Delay adding show class to trigger animation
    setTimeout(function() {
      $('#result').addClass('show');
    }, 50);
  });

  function toCelsius(value, unit) {
    switch (unit) {
      case 'C': return value;
      case 'F': return (value - 32) * 5 / 9;
      case 'K': return value - 273.15;
      case 'R': return (value - 491.67) * 5 / 9;
      case 'Re': return value * 1.25;
      default: return value;
    }
  }

  function fromCelsius(value, unit) {
    switch (unit) {
      case 'C': return value;
      case 'F': return (value * 9 / 5) + 32;
      case 'K': return value + 273.15;
      case 'R': return (value + 273.15) * 9 / 5;
      case 'Re': return value * 0.8;
      default: return value;
    }
  }
});