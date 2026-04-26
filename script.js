// === 1. ВИЗНАЧЕННЯ НОВИХ БЛОКІВ ===

// Блок: Перемістити на кроків
Blockly.Blocks['move_steps'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("перемістити на")
        .appendField(new Blockly.FieldNumber(10), "STEPS")
        .appendField("кроків");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
  }
};

// Блок: Перейти в X Y
Blockly.Blocks['goto_xy'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("перейти в x:")
        .appendField(new Blockly.FieldNumber(0), "X")
        .appendField("y:")
        .appendField(new Blockly.FieldNumber(0), "Y");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
  }
};

// Блок: Повернути на градуси
Blockly.Blocks['turn_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("повернути ↻ на")
        .appendField(new Blockly.FieldNumber(15), "DEG")
        .appendField("градусів");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
  }
};

// === 2. ГЕНЕРАТОРИ КОДУ ===

Blockly.JavaScript['move_steps'] = function(block) {
  var steps = block.getFieldValue('STEPS');
  return `moveSprite(${steps});\n`;
};

Blockly.JavaScript['goto_xy'] = function(block) {
  var x = block.getFieldValue('X');
  var y = block.getFieldValue('Y');
  return `setSpritePos(${x}, ${y});\n`;
};

Blockly.JavaScript['turn_right'] = function(block) {
  var deg = block.getFieldValue('DEG');
  return `turnSprite(${deg});\n`;
};

// === 3. ФУНКЦІЇ ДЛЯ РУХУ СПРАЙТА ===

let currentSprite = {
    el: null,
    x: 200, // Початкова позиція (центр сцени приблизно)
    y: 140,
    angle: 0
};

window.onload = () => {
    currentSprite.el = document.getElementById('sprite1');
    updateElement();
};

function updateElement() {
    currentSprite.el.style.left = currentSprite.x + 'px';
    currentSprite.el.style.top = currentSprite.y + 'px';
    currentSprite.el.style.transform = `rotate(${currentSprite.angle}deg)`;
}

function moveSprite(steps) {
    // Проста математика руху вперед за кутом
    let rad = currentSprite.angle * (Math.PI / 180);
    currentSprite.x += Math.cos(rad) * steps;
    currentSprite.y += Math.sin(rad) * steps;
    updateElement();
}

function setSpritePos(x, y) {
    // В Scratch 0,0 - це центр, але в вебі 0,0 - це кут. 
    // Робимо невелику корекцію для зручності:
    currentSprite.x = 240 + parseInt(x);
    currentSprite.y = 180 - parseInt(y);
    updateElement();
}

function turnSprite(deg) {
    currentSprite.angle += parseInt(deg);
    updateElement();
}

// === 4. ІНІЦІАЛІЗАЦІЯ BLOCKLY ===

const workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    renderer: 'zelos', // Цей параметр робить блоки як у Scratch!
    grid: { spacing: 20, length: 3, colour: '#ccc', snap: true }
});

function runZest() {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    try {
        eval(code);
    } catch (e) {
        alert("Помилка в коді: " + e);
    }
}
