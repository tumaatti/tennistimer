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

const changeNames = (pnumber: string) => {
  if (pnumber === 'p1') {
    player1.name = (<HTMLInputElement>document.getElementById('player1-input')).value;
    document.getElementById('player1-name').innerHTML = player1.name;
    document.getElementById('player1-name-sets').innerHTML = player1.name;
  } else {
    player2.name = (<HTMLInputElement>document.getElementById('player2-input')).value;
    document.getElementById('player2-name').innerHTML = player2.name;
    document.getElementById('player2-name-sets').innerHTML = player2.name;
  }
};

const showMenuButton = document.getElementById('show-menu');

showMenuButton.addEventListener('click', function(event) {
  const menu = document.getElementById('menu');
  if (menu.style.display === 'none' || menu.style.display === '') {
    menu.style.display = 'block';
  } else {
    menu.style.display = 'none';
  }
});

const setRounds = () => {
  let numOfRoundsInput = Number((<HTMLInputElement>document.getElementById('rounds-input')).value);
  let errorText = document.getElementById('round-error');
  if (isNaN(numOfRoundsInput)) {
    errorText.innerHTML = 'Give an integer value!';
    return 0;
  };
  errorText.innerHTML = '';
  NUM_OF_ROUNDS = numOfRoundsInput;
  player1.fillRoundsWithZeros();
  player2.fillRoundsWithZeros();
  writeRounds();
}

const resetSetsButton = document.getElementById('reset-sets');

resetSetsButton.addEventListener('click', function(event) {
    player1.fillRoundsWithZeros();
    player2.fillRoundsWithZeros();
    writeRounds();
});

const resetClockButton = document.getElementById('reset-clock');

resetClockButton.addEventListener('click', function(event) {
  document.getElementById('matchtime').innerHTML = '00:00:00';
  clearInterval(clock);
  clockRunning = false;
});
