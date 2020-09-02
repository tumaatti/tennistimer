// Color picker implementation
player1.color = document.querySelector('#player1-color');
player1.picker = new Picker(player1.color);
player1.picker.setOptions({popup: 'left'});

player2.color = document.querySelector('#player2-color');
player2.picker = new Picker(player2.color);
player2.picker.setOptions({popup: 'left'});

const body = document.body;
let color1 = '#fff';
let color2 = '#fff';

/**
 * set gradient colors for body
 * @param {string} color1
 * @param {string} color2
 */
function setColor(color1, color2) {
  body.style.backgroundImage = 'linear-gradient(to bottom right, ' +
    color1 +
    ', ' +
    color2 +
    ')';
}

player1.picker.onChange = function(color) {
  color1 = color.rgbaString;
  player1.color.style.backgroundColor = color1;
  setColor(color1, color2);
};

player2.picker.onChange = function(color) {
  color2 = color.rgbaString;
  player2.color.style.backgroundColor = color2;
  setColor(color1, color2);
};

