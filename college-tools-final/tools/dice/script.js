// file: script.js

function rollDice() {
    const count = parseInt(document.getElementById("diceCount").value);
    const sides = parseInt(document.getElementById("diceSides").value);
    const resultDiv = document.getElementById("result");
  
    if (isNaN(count) || isNaN(sides) || count < 1 || sides < 2) {
      resultDiv.innerHTML = "Please enter valid dice count and sides.";
      return;
    }
  
    let rolls = [];
    let total = 0;
  
    for (let i = 0; i < count; i++) {
      const roll = Math.floor(Math.random() * sides) + 1;
      rolls.push(roll);
      total += roll;
    }
  
    resultDiv.innerHTML = `
      Rolls: ${rolls.join(', ')}<br>
      Total: ${total}
    `;
  }