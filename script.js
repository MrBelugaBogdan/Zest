// Ініціалізація Blockly
const workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    theme: 'dark', // Можна змінити на класичну, якщо треба
    renderer: 'zelos' // Стиль блоків як у Scratch
});

// Функція для запуску коду
function runZest() {
    // Очищуємо консоль перед запуском
    document.getElementById('log').innerHTML = '';
    
    // Перехоплюємо стандартний window.alert, щоб він виводився в нашу консоль
    window.alert = function(msg) {
        const logDiv = document.getElementById('log');
        logDiv.innerHTML += `> ${msg}<br>`;
    };

    // Генеруємо JavaScript код
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    
    try {
        eval(code); 
    } catch (e) {
        document.getElementById('log').innerHTML += `<span style="color:red">> Помилка: ${e}</span>`;
    }
}
