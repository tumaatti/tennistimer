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
  shft: 16,
};

const NUM_OF_ROUNDS = 3;
const SETS_TO_WIN = 7;
const pointsArr = ['0', '15', '30', '40', 'AD', 'winner'];
let TIEBREAK = false;
let clock;
let clockRunning = false;
let firstTime = true;

const rounds = {
  player1: [],
  player2: [],
  current: 0,
};
for (let i = 0; i < NUM_OF_ROUNDS; i++) {
  rounds.player1.push(0);
  rounds.player2.push(0);
}

const points = {
  player1: 0,
  player2: 0,
};

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

player1Picker.onChange = function(color) {
  color1 = color.rgbaString;
  player1Color.style.backgroundColor = color.rgbaString;
  setColor(color1, color2);
};

player2Picker.onChange = function(color) {
  color2 = color.rgbaString;
  player2Color.style.backgroundColor = color.rgbaString;
  setColor(color1, color2);
};

/**
 * zeropad string to have leading zeros TEST
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
 * tidy the displayed rounds to use '|' instead of ',' from the arrays TEST
 * @param {array} playerRounds
 * @return {string}
 */
function tidyRounds(playerRounds) {
  const strRounds = playerRounds.toString().replace(/,/g, '  |  ');
  const rounds = strRounds
      .replace(/7/g, '<span style="background-color: yellow">7</span>');
  return rounds;
}

/**
 * use the setServer-function to swap the server
 */
function swapServer() {
  const player1Serve = document.
      getElementById('player1-serve')
      .innerHTML.trim();

  if (player1Serve === '&nbsp;') {
    setServer(1);
  } else {
    setServer(2);
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
 * @param {object} points
 * @return {object}
 */
function resetPointsToZero() {
  points.player1 = 0;
  points.player2 = 0;
  document.getElementById('player1-points').innerHTML = '0';
  document.getElementById('player2-points').innerHTML = '0';
  return points;
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
  'Enter: Commit points<br>' +
  'Shift: Start/Stop the clock</PRE>';

document.getElementById('how-to').innerHTML = content;

document.getElementById('player1-rounds').innerHTML =
  tidyRounds(rounds.player1);
document.getElementById('player2-rounds').innerHTML =
  tidyRounds(rounds.player2);

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


document.addEventListener('keydown', function(event) {
  console.log(event.keyCode);

  if (!TIEBREAK) {
    if (event.keyCode === keyShortCuts.del) {
      resetPointsToZero();
    } else if (event.keyCode === keyShortCuts.home) {
      // add point to player1 player
      if (points.player1 < 3) {
        points.player1 += 1;
      } else if (points.player1 === 3) {
        if (points.player2 < 3) {
          points.player1 = 5;
        } else if (points.player2 === 3) {
          points.player1 = 4;
        } else if (points.player2 === 4) {
          points.player1 = 4;
          points.player2 = 3;
        }
      } else if (points.player1 === 4) {
        points.player1 += 1;
      }
      document.getElementById('player1-points').innerHTML =
        pointsArr[points.player1];
      document.getElementById('player2-points').innerHTML =
        pointsArr[points.player2];
    } else if (event.keyCode === keyShortCuts.pgup) {
      // remove point from player1 player
      if (points.player1 === 5) points.player1 = 3;
      else if (points.player1 === 0) points.player1 = 0;
      else points.player1 -= 1;
      document.getElementById('player1-points').innerHTML =
        pointsArr[points.player1];
    } else if (event.keyCode === keyShortCuts.pgdn) {
      // add point to player2 player
      if (points.player2 < 3) {
        points.player2 += 1;
      } else if (points.player2 === 3) {
        if (points.player1 < 3) {
          points.player2 = 5;
        } else if (points.player1 === 3) {
          points.player2 = 4;
        } else if (points.player1 === 4) {
          points.player2 = 4;
          points.player1 = 3;
        }
      } else if (points.player2 === 4) {
        points.player2 += 1;
      }
      document.getElementById('player1-points').innerHTML =
        pointsArr[points.player1];
      document.getElementById('player2-points').innerHTML =
        pointsArr[points.player2];
    } else if (event.keyCode === keyShortCuts.endbtn) {
      // remove point from player2 player
      if (points.player2 === 5) points.player2 = 3;
      else if (points.player2 === 0) points.player2 = 0;
      else points.player2 -= 1;
      document.getElementById('player2-points').innerHTML =
        pointsArr[points.player2];
    } else if (event.keyCode === keyShortCuts.enter) {
      // enter completes the round
      if (points.player1 === 5) {
        resetPointsToZero();
        rounds.player1[rounds.current] += 1;
        swapServer();
        if (rounds.player1[rounds.current] === SETS_TO_WIN &&
          rounds.player2[rounds.current] <= SETS_TO_WIN-2) {
          if (rounds.current < NUM_OF_ROUNDS) {
            if (rounds.current%2 === 0) {
              setServer(2);
            } else {
              setServer(1);
            }
            rounds.current += 1;
          } else {
            console.log('do something here');
          }
        } else if (rounds.player1[rounds.current] === SETS_TO_WIN-1 &&
                  rounds.player2[rounds.current] === SETS_TO_WIN-1) {
          resetPointsToZero();
          TIEBREAK = true;
        }
        document
            .getElementById('player1-rounds')
            .innerHTML = tidyRounds(rounds.player1);
      } else if (points.player2 === 5) {
        resetPointsToZero();
        rounds.player2[rounds.current] += 1;
        swapServer();
        if (rounds.player2[rounds.current] === SETS_TO_WIN &&
            rounds.player1[rounds.current] <= SETS_TO_WIN-2) {
          if (rounds.current < NUM_OF_ROUNDS) {
            if (rounds.current%2 === 0) {
              setServer(2);
            } else {
              setServer(1);
            }
            rounds.current += 1;
          } else {
            console.log('do something here');
          }
        } else if (rounds.player2[rounds.current] === SETS_TO_WIN-1 &&
                  rounds.player1[rounds.current] === SETS_TO_WIN-1) {
          TIEBREAK = true;
        }
        document
            .getElementById('player2-rounds')
            .innerHTML = tidyRounds(rounds.player2);
      }
    }
  } else { // !TIEBREAK
    if (firstTime) {
      resetPointsToZero();
      firstTime = false;
    }

    if (event.keyCode === keyShortCuts.home) { // add point to player1 player
      points.player1 += 1;
      document.getElementById('player1-points').innerHTML = points.player1;
      if (points.player1%6 === 1 && points.player2 <= points.player1-2) {
        TIEBREAK = false;
        rounds.player1[rounds.current] += 1;
        if (rounds.current%2 === 0) {
          setServer(2);
        } else {
          setServer(1);
        }
        rounds.current += 1;
        document.getElementById('player1-rounds').innerHTML =
          tidyRounds(rounds.player1);
        resetPointsToZero();
      }
      const tieBreakNumber = points.player1 + points.player2;
      console.log(tieBreakNumber);
      if (tieBreakNumber%2 === 1) {
        swapServer();
      }
    }

    if (event.keyCode === keyShortCuts.pgup) { // remove point from player 1
      if (points.player1 > 0) {
        points.player1 -= 1;
        document.getElementById('player1-points').innerHTML = points.player1;
      }
    }

    if (event.keyCode === keyShortCuts.pgdn) { // add point to player2
      points.player2 += 1;
      document.getElementById('player2-points').innerHTML = points.player2;
      if (points.player2%6 === 1 && points.player1 <= points.player2-2) {
        TIEBREAK = false;
        rounds.player2[rounds.current] += 1;
        if (rounds.current%2 === 0) {
          setServer(2);
        } else {
          setServer(1);
        }
        rounds.current += 1;
        document.getElementById('player2-rounds').innerHTML =
          tidyRounds(rounds.player2);
        resetPointsToZero();
      }
      const tieBreakNumber = points.player1 + points.player2;
      if (tieBreakNumber%2 === 1 || tieBreakNumber === 1) {
        swapServer();
      }
    }

    if (event.keyCode === keyShortCuts.endbtn) { // remove point from player2
      if (points.player2 > 0) {
        points.player2 -= 1;
        document.getElementById('player2-points').innerHTML = points.player2;
      }
    }
  }

  if (event.keyCode === keyShortCuts.shft) {
    if (!clockRunning) {
      let playedTime = document.getElementById('matchtime').innerHTML;
      const pT = playedTime.split(':');
      const org = new Date();
      clock = setInterval(function startClock() {
        clockRunning = true;
        const now = new Date();
        const diff = now - org;
        const dh = Number(pT[0]) + Math.floor((diff / 1000 / 60 / 60) % 24);
        const dm = Number(pT[1]) + Math.floor((diff / 1000 / 60) % 60);
        const ds = Number(pT[2]) + Math.floor((diff / 1000) % 60);
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
