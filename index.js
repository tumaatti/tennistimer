/*
 * TODO: maybe remove the usage of the enter-key?
 * TODO: clock needs a reset butto. also reset button could be
 *       usefull also for the sets
 */

// set keycodes for eventListener
const keyShortCuts = {
  enter: 13,
  home: 36,
  pgup: 33,
  pgdn: 34,
  endbtn: 35,
  del: 46,
};

let TIEBREAK = false;
let currentRound = 0;
const NUM_OF_ROUNDS = 3;
const SETS_TO_WIN = 7;
let clock;
let clockRunning = false;

const player1Rounds = [];
const player2Rounds = [];
for (let i = 0; i < NUM_OF_ROUNDS; i++) {
  player1Rounds.push(0);
  player2Rounds.push(0);
}

let firstTime = true;

// Color picker implementation
const player1Color = document.querySelector('#player1-color');
const player1Picker = new Picker(player1Color);
player1Picker.setOptions({popup: 'left'});

const player2Color = document.querySelector('#player2-color');
const player2Picker = new Picker(player2Color);
player2Picker.setOptions({popup: 'left'});

const body = document.body;

let color1 = '#fff';
let color2 = '#fff';

player1Picker.onChange = function(color) {
  color1 = color.rgbaString;
  player1Color.style.backgroundColor = color.rgbaString;
  body.style.backgroundImage = 'linear-gradient(to bottom right, ' +
    color1 +
    ', ' +
    color2 +
    ')';
};

player2Picker.onChange = function(color) {
  color2 = color.rgbaString;
  player2Color.style.backgroundColor = color.rgbaString;
  body.style.backgroundImage = 'linear-gradient(to bottom right, ' +
    color1 +
    ', ' +
    color2 +
    ')';
};

// colorpicker ends

/**
 * zeropad string to have leading zeros
 * @param {string} str
 * @return {string}
 */
function zpad(str) {
  let a = String(str).trim();
  if (a.length === 1) {
    a = '0' + a;
  }
  return a;
}

/**
 * tidy the displayed rounds to use '|' instead of ',' from the arrays
 * @param {array} playerRounds
 * @return {string}
 */
function tidyRounds(playerRounds) {
  const strRounds = playerRounds.toString().replace(/,/g, '  |  ');
  const rounds = strRounds
      .replace(/7/g, '<span style="background-color: yellow">7</span>');
  return rounds;
}

const setPlayerNamesButton = document.getElementById('set-player-names');

setPlayerNamesButton.addEventListener('click', function(event) {
  // TODO: rajoitus pelaajien nimien pituudelle tai sit pitää fiksata asioita
  const player1name = document.getElementById('player1-input').value;
  const player2name = document.getElementById('player2-input').value;
  document.getElementById('player1-name').innerHTML = player1name;
  document.getElementById('player2-name').innerHTML = player2name;
  document.getElementById('player1-name-sets').innerHTML = player1name;
  document.getElementById('player2-name-sets').innerHTML = player2name;
});

/**
 * swap the server
 */
function swapServer() {
  const player1Serve = document.
      getElementById('player1-serve')
      .innerHTML.trim();

  if (player1Serve === '&nbsp;') {
    document.getElementById('player1-serve').innerHTML =
      '<img src="assets/serve.png">';
    document.getElementById('player2-serve').innerHTML =
      '&nbsp;';
  } else {
    document.getElementById('player1-serve').innerHTML =
      '&nbsp';
    document.getElementById('player2-serve').innerHTML =
      '<img src="assets/serve.png">';
  }
}

/**
 * set server to either player1 or player2
 * @param {int} server
 */
function setServer(server) {
  if (server === 1) {
    document.getElementById('player1-serve').innerHTML =
      '<img src="assets/serve.png">';
    document.getElementById('player2-serve').innerHTML =
      '&nbsp;';
  } else if (server === 2) {
    document.getElementById('player1-serve').innerHTML =
      '&nbsp';
    document.getElementById('player2-serve').innerHTML =
      '<img src="assets/serve.png">';
  }
}

/**
 * reset both player points to zero
 */
function resetPointsToZero() {
  document.getElementById('player1-points').innerHTML = '0';
  document.getElementById('player2-points').innerHTML = '0';
}

// insert instructions on how to use the clock
const content =
  '<PRE>How to use the clock: <br>' +
  'Add points <br>' +
  '  Player1: Home<br>' +
  '  Player2: Page Up <br>' +
  'Remove points <br>' +
  '  Player1: Page Down <br>' +
  '  Player2: End<br>' +
  'Enter: Commit points</PRE>';

document.getElementById('how-to').innerHTML = content;

document.getElementById('player1-rounds').innerHTML = tidyRounds(player1Rounds);
document.getElementById('player2-rounds').innerHTML = tidyRounds(player2Rounds);

const showMenuButton = document.getElementById('show-menu');

showMenuButton.addEventListener('click', function(event) {
  const menu = document.getElementById('menu');
  if (menu.style.display === 'none' || menu.style.display === '') {
    menu.style.display = 'block';
  } else {
    menu.style.display = 'none';
  }
});

document.addEventListener('keydown', function(event) {
  const player1Points = document
      .getElementById('player1-points')
      .innerHTML
      .trim();
  const player2Points = document
      .getElementById('player2-points')
      .innerHTML
      .trim();

  console.log(event.keyCode);

  if (!TIEBREAK) {
    if (event.keyCode === keyShortCuts.del) {
      resetPointsToZero();
    } else if (event.keyCode === keyShortCuts.home) {
      // add point to player1 player
      if (player1Points === '0') {
        document.getElementById('player1-points').innerHTML = '15';
      } else if (player1Points === '15') {
        document.getElementById('player1-points').innerHTML = '30';
      } else if (player1Points === '30') {
        document.getElementById('player1-points').innerHTML = '40';
      } else if (player1Points === '40') {
        if (player2Points === '30' ||
            player2Points === '15' ||
            player2Points === '0') {
          document.getElementById('player1-points').innerHTML =
            'winner';
        } else if (player2Points === 'AD') {
          document.getElementById('player1-points').innerHTML = '40';
          document.getElementById('player2-points').innerHTML = '40';
        } else if (player2Points === '40') {
          document.getElementById('player1-points').innerHTML = 'AD';
        }
      } else if (player1Points === 'AD') {
        document.getElementById('player1-points').innerHTML = 'winner';
      }
    } else if (event.keyCode === keyShortCuts.pgup) {
      // remove point from player1 player
      if (player1Points === '15') {
        document.getElementById('player1-points').innerHTML = '0';
      } else if (player1Points === '30') {
        document.getElementById('player1-points').innerHTML = '15';
      } else if (player1Points === '40') {
        document.getElementById('player1-points').innerHTML = '30';
      } else if (player1Points === 'AD' || player1Points === 'winner') {
        document.getElementById('player1-points').innerHTML = '40';
      }
    } else if (event.keyCode === keyShortCuts.pgdn) {
      // add point to player2 player
      if (player2Points === '0') {
        document.getElementById('player2-points').innerHTML = '15';
      } else if (player2Points === '15') {
        document.getElementById('player2-points').innerHTML = '30';
      } else if (player2Points === '30') {
        document.getElementById('player2-points').innerHTML = '40';
      } else if (player2Points === '40') {
        if (player1Points === '30' ||
            player1Points === '15' ||
            player1Points === '0') {
          document.getElementById('player2-points').innerHTML = 'winner';
        } else if (player1Points === 'AD') {
          document.getElementById('player2-points').innerHTML = '40';
          document.getElementById('player1-points').innerHTML = '40';
        } else if (player1Points === '40') {
          document.getElementById('player2-points').innerHTML = 'AD';
        }
      } else if (player2Points === 'AD') {
        document.getElementById('player2-points').innerHTML = 'winner';
      }
    } else if (event.keyCode === keyShortCuts.endbtn) {
      // remove point from player2 player
      if (player2Points === '15') {
        document.getElementById('player2-points').innerHTML = '0';
      } else if (player2Points === '30') {
        document.getElementById('player2-points').innerHTML = '15';
      } else if (player2Points === '40') {
        document.getElementById('player2-points').innerHTML = '30';
      } else if (player2Points === 'AD' || player2Points === 'winner') {
        document.getElementById('player2-points').innerHTML = '40';
      }
    } else if (event.keyCode === keyShortCuts.enter) {
      // enter completes the round
      if (player1Points === 'winner') {
        resetPointsToZero();
        // set player1Rounds on won round with any other button
        player1Rounds[currentRound] += 1;
        swapServer();
        if (player1Rounds[currentRound] === SETS_TO_WIN &&
          player2Rounds[currentRound] <= SETS_TO_WIN-2) {
          if (currentRound < NUM_OF_ROUNDS) {
            if (currentRound%2 === 0) {
              setServer(2);
            } else {
              setServer(1);
            }
            currentRound += 1;
          } else {
            console.log('do something here');
          }
        } else if (player1Rounds[currentRound] === SETS_TO_WIN-1 &&
                  player2Rounds[currentRound] === SETS_TO_WIN-1) {
          resetPointsToZero();
          TIEBREAK = true;
        }
        document
            .getElementById('player1-rounds')
            .innerHTML = tidyRounds(player1Rounds);
      // set player2Rounds on won round with any other button
      } else if (player2Points === 'winner') {
        resetPointsToZero();
        player2Rounds[currentRound] += 1;
        swapServer();
        if (player2Rounds[currentRound] === SETS_TO_WIN &&
            player1Rounds[currentRound] <= SETS_TO_WIN-2) {
          if (currentRound < NUM_OF_ROUNDS) {
            if (currentRound%2 === 0) {
              setServer(2);
            } else {
              setServer(1);
            }
            currentRound += 1;
          } else {
            console.log('do something here');
          }
        } else if (player2Rounds[currentRound] === SETS_TO_WIN-1 &&
                  player1Rounds[currentRound] === SETS_TO_WIN-1) {
          TIEBREAK = true;
        }
        document
            .getElementById('player2-rounds')
            .innerHTML = tidyRounds(player2Rounds);
      }
    }
  } else { // !TIEBREAK
    if (firstTime) {
      resetPointsToZero();
      firstTime = false;
    }

    let player1points =
      parseInt(document
          .getElementById('player1-points')
          .innerHTML);
    let player2points =
      parseInt(document
          .getElementById('player2-points')
          .innerHTML);


    if (event.keyCode === keyShortCuts.home) { // add point to player1 player
      player1points += 1;
      document.getElementById('player1-points').innerHTML = player1points;
      if (player1points%6 === 1 && player2points <= player1points-2) {
        TIEBREAK = false;
        player1Rounds[currentRound] += 1;
        if (currentRound%2 === 0) {
          setServer(2);
        } else {
          setServer(1);
        }
        currentRound += 1;
        document.getElementById('player1-rounds').innerHTML =
          tidyRounds(player1Rounds);
        resetPointsToZero();
      }
      const tieBreakNumber = player1points + player2points;
      console.log(tieBreakNumber);
      if (tieBreakNumber%2 === 1) {
        swapServer();
      }
    }

    if (event.keyCode === keyShortCuts.pgup) { // remove point from player 1
      if (player1points > 0) {
        player1points -= 1;
        document.getElementById('player1-points').innerHTML = player1points;
      }
    }

    if (event.keyCode === keyShortCuts.pgdn) { // add point to player2
      player2points += 1;
      document.getElementById('player2-points').innerHTML = player2points;
      if (player2points%6 === 1 && player1points <= player2points-2) {
        TIEBREAK = false;
        player2Rounds[currentRound] += 1;
        if (currentRound%2 === 0) {
          setServer(2);
        } else {
          setServer(1);
        }
        currentRound += 1;
        document.getElementById('player2-rounds').innerHTML =
          tidyRounds(player2Rounds);
        resetPointsToZero();
      }
      const tieBreakNumber = player1points + player2points;
      if (tieBreakNumber%2 === 1 || tieBreakNumber === 1) {
        swapServer();
      }
    }

    if (event.keyCode === keyShortCuts.endbtn) { // remove point from player2
      if (player2points > 0) {
        player2points -= 1;
        document.getElementById('player2-points').innerHTML = player2points;
      }
    }
  }

  if (event.keyCode === 16) {
    if (!clockRunning) {
      let playedTime = document.getElementById('matchtime').innerHTML;
      const pT = playedTime.split(':');
      const org = new Date();
      clock = setInterval(function startClock() {
        clockRunning = true;
        const now = new Date();
        const diff = now - org;
        const dh = Number(pT[0]) + Math.floor((diff / 1000 / 60 / 60)%24);
        const dm = Number(pT[1]) + Math.floor((diff / 1000 / 60)%60);
        const ds = Number(pT[2]) + Math.floor((diff / 1000)%60);
        playedTime =
          zpad(String(dh)) + ':' +
          zpad(String(dm)) + ':' +
          zpad(String(ds));
        document.getElementById('matchtime').innerHTML = playedTime;
      }, 1000);
    } else {
      clearInterval(clock);
      clockRunning = false;
    }
  }
});
