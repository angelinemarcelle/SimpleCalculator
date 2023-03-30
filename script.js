const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'AC') {
      display.value = '';
    } else if (value === '=') {
      try {
        // Split the expression into tokens
        const tokens = display.value.split(' ');

        // Evaluate multiplication and division first
        for (let i = 0; i < tokens.length; i++) {
          if (tokens[i] === '*') {
            const result = parseFloat(tokens[i-1]) * parseFloat(tokens[i+1]);
            tokens.splice(i-1, 3, result); // Replace the tokens with the result
            i -= 2; // Backtrack to re-evaluate the new tokens
          } else if (tokens[i] === '/') {
            const result = parseFloat(tokens[i-1]) / parseFloat(tokens[i+1]);
            tokens.splice(i-1, 3, result); // Replace the tokens with the result
            i -= 2; // Backtrack to re-evaluate the new tokens
          }
        }

        // Evaluate addition and subtraction next
        let result = parseFloat(tokens[0]);
        for (let i = 1; i < tokens.length; i += 2) {
          const operator = tokens[i];
          const operand = parseFloat(tokens[i+1]);
          if (operator === '+') {
            result += operand;
          } else if (operator === '-') {
            result -= operand;
          }
        }

        display.value = result;
      } catch (error) {
        display.value = 'Error';
      }
    } else if (value === '+/-') {
      display.value = -parseFloat(display.value);
    } else if (value === '%') {
      display.value = parseFloat(display.value) / 100;
    } else {
      display.value += value;
    }
  });
});
