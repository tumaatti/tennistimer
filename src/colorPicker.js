// Color picker implementation
let player1ColorSelector = document.querySelector('#player1-color');
// @ts-ignore: Cannot find name
player1.picker = new Picker(player1ColorSelector);
player1.picker.setOptions({ popup: 'left' });
let player2ColorSelector = document.querySelector('#player2-color');
// @ts-ignore: Cannot find name
player2.picker = new Picker(player2ColorSelector);
player2.picker.setOptions({ popup: 'left' });
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
player1.picker.onChange = (color) => {
    color1 = color.rgbaString;
    player1ColorSelector.style.backgroundColor = color1;
    setColor(color1, color2);
};
player2.picker.onChange = (color) => {
    color2 = color.rgbaString;
    player2ColorSelector.style.backgroundColor = color2;
    setColor(color1, color2);
};
