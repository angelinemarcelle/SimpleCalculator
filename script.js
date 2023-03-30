const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'AC') {
            display.value = '';
        } else if (value === '=') {
            try {
                display.value = eval(display.value);
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
