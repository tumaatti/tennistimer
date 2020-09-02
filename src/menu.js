// insert instructions on how to use the clock
const content =
  '<PRE>How to use the clock: <br>' +
  'Add points <br>' +
  '  Player1: Home<br>' +
  '  Player2: Page Up <br>' +
  'Remove points <br>' +
  '  Player1: Page Down <br>' +
  '  Player2: End<br>' +
  'Commit points: Enter<br>' +
  'Start/Stop the clock: Shift<br>' +
  'Reset Points: Del</PRE>';

document.getElementById('how-to').innerHTML = content;

document.getElementById('player1-rounds').innerHTML =
  tidyRounds(player1.rounds);
document.getElementById('player2-rounds').innerHTML =
  tidyRounds(player2.rounds);

const setPlayerNamesButton = document.getElementById('set-player-names');

setPlayerNamesButton.addEventListener('click', function(event) {
  // TODO: rajoitus pelaajien nimien pituudelle tai sit pitää fiksata asioita
  player1.name = document.getElementById('player1-input').value;
  player2.name = document.getElementById('player2-input').value;
  document.getElementById('player1-name').innerHTML = player1.name;
  document.getElementById('player2-name').innerHTML = player2.name;
  document.getElementById('player1-name-sets').innerHTML = player1.name;
  document.getElementById('player2-name-sets').innerHTML = player2.name;
});

const showMenuButton = document.getElementById('show-menu');

showMenuButton.addEventListener('click', function(event) {
  const menu = document.getElementById('menu');
  if (menu.style.display === 'none' || menu.style.display === '') {
    menu.style.display = 'block';
  } else {
    menu.style.display = 'none';
  }
});

const resetSetsButton = document.getElementById('reset-sets');

resetSetsButton.addEventListener('click', function(event) {
  document.getElementById('player1-rounds').innerHTML = tidyRounds([0, 0, 0]);
  document.getElementById('player2-rounds').innerHTML = tidyRounds([0, 0, 0]);
});

const resetClockButton = document.getElementById('reset-clock');

resetClockButton.addEventListener('click', function(event) {
  document.getElementById('matchtime').innerHTML = '00:00:00';
});

