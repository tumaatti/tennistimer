/*
 * TODO: maybe remove the usage of the enter-key?
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

let tieBreakNumber;
const NUM_OF_ROUNDS = 3;
const SETS_TO_WIN = 7;
const pointsArr = ['0', '15', '30', '40', 'AD', 'winner'];
let TIEBREAK = false;
let clock;
let clockRunning = false;
let firstTime = true;
let currentRounds = 0;

const player1 = {
  name: 'player1',
  points: 0,
  rounds: [],
  color: '#fff',
  picker: '',
};

const player2 = {
  name: 'player2',
  points: 0,
  rounds: [],
  color: '#fff',
  picker: '',
};

console.log(player1.name);

for (let i = 0; i < NUM_OF_ROUNDS; i++) {
  player1.rounds.push(0);
  player2.rounds.push(0);
}


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
 */
function resetPointsToZero() {
  player1.points = 0;
  player2.points = 0;
  document.getElementById('player1-points').innerHTML = '0';
  document.getElementById('player2-points').innerHTML = '0';
}


const addPointToPlayer = (addToPlayer) => {
  if (addToPlayer === 1) {
    if (player1.points === 3 && player2.points < 3) {
      player1.points = 5;
    } else if (player1.points === 3 && player2.points === 3) {
      player1.points = 4;
    } else if (player1.points === 3 && player2.points === 4) {
      player2.points = 3;
    } else if (player1.points < 3 || player1.points === 4) {
      player1.points += 1;
    }
  } else if (addToPlayer === 2) {
    if (player2.points === 3 && player1.points < 3) {
      player2.points = 5;
    } else if (player2.points === 3 && player1.points === 3) {
      player2.points = 4;
    } else if (player2.points === 3 && player1.points === 4) {
      player1.points = 3;
    } else if (player2.points < 3 || player2.points === 4) {
      player2.points += 1;
    }
  }
};

const writePoints = () => {
  if (!TIEBREAK) {
    document.getElementById('player1-points').innerHTML =
      pointsArr[player1.points];
    document.getElementById('player2-points').innerHTML =
      pointsArr[player2.points];
  } else {
    document.getElementById('player1-points').innerHTML = player1.points;
    document.getElementById('player2-points').innerHTML = player2.points;
  }
};


document.addEventListener('keydown', function(event) {
  console.log(event.keyCode);

  if (!TIEBREAK) {
    switch (event.keyCode) {
      case keyShortCuts.del:
        resetPointsToZero();
        break;
      case keyShortCuts.home:
        addPointToPlayer(1);
        writePoints(player1, player2);
        break;
      case keyShortCuts.pgup:
        // remove point from player1 player
        if (player1.points === 5) player1.points = 3;
        else if (player1.points === 0) player1.points = 0;
        else player1.points -= 1;
        writePoints();
        break;
      case keyShortCuts.pgdn:
        addPointToPlayer(2);
        writePoints();
        break;
      case keyShortCuts.endbtn:
        // remove point from player2 player
        if (player2.points === 5) player2.points = 3;
        else if (player2.points === 0) player2.points = 0;
        else player2.points -= 1;
        writePoints();
        break;
      case keyShortCuts.enter:
        // enter completes the round
        if (player1.points === 5) {
          resetPointsToZero();
          player1.rounds[currentRounds] += 1;
          swapServer();
          if (player1.rounds[currentRounds] === SETS_TO_WIN &&
            player2.rounds[currentRounds] <= SETS_TO_WIN-2) {
            if (currentRounds < NUM_OF_ROUNDS) {
              if (currentRounds%2 === 0) {
                setServer(2);
              } else {
                setServer(1);
              }
              currentRounds += 1;
            } else {
              console.log('do something here');
            }
          } else if (player1.rounds[currentRounds] === SETS_TO_WIN-1 &&
            player2.rounds[currentRounds] === SETS_TO_WIN-1) {
            resetPointsToZero();
            TIEBREAK = true;
            firstTime = true;
          }
          document
              .getElementById('player1-rounds')
              .innerHTML = tidyRounds(player1.rounds);
        } else if (player2.points === 5) {
          resetPointsToZero();
          player2.rounds[currentRounds] += 1;
          swapServer();
          if (player2.rounds[currentRounds] === SETS_TO_WIN &&
            player1.rounds[currentRounds] <= SETS_TO_WIN-2) {
            if (currentRounds < NUM_OF_ROUNDS) {
              if (currentRounds%2 === 0) {
                setServer(2);
              } else {
                setServer(1);
              }
              currentRounds += 1;
            } else {
              console.log('do something here');
            }
          } else if (player2.rounds[currentRounds] === SETS_TO_WIN-1 &&
            player1.rounds[currentRounds] === SETS_TO_WIN-1) {
            TIEBREAK = true;
            firstTime = true;
          }
          document
              .getElementById('player2-rounds')
              .innerHTML = tidyRounds(player2.rounds);
        }
        break;
    }
  } else { // !TIEBREAK
    if (firstTime) {
      resetPointsToZero();
      firstTime = false;
    }

    switch (event.keyCode) {
      case keyShortCuts.home: // add point to player1 player
        player1.points += 1;
        writePoints();
        if (player1.points%6 === 1 && player2.points <= player1.points-2) {
          TIEBREAK = false;
          player1.rounds[currentRounds] += 1;
          if (currentRounds%2 === 0) {
            setServer(2);
          } else {
            setServer(1);
          }
          currentRounds += 1;
          document.getElementById('player1-rounds').innerHTML =
            tidyRounds(player1.rounds);
          resetPointsToZero();
        }
        tieBreakNumber = player1.points + player2.points;
        console.log(tieBreakNumber);
        if (tieBreakNumber%2 === 1) {
          swapServer();
        }
        break;

      case keyShortCuts.pgup: // remove point from player 1
        if (player1.points > 0) {
          player1.points -= 1;
          writePoints();
        }
        break;

      case keyShortCuts.pgdn: // add point to player2
        player2.points += 1;
        writePoints();
        if (player2.points%6 === 1 && player1.points <= player2.points-2) {
          TIEBREAK = false;
          player2.rounds[currentRounds] += 1;
          if (currentRounds%2 === 0) {
            setServer(2);
          } else {
            setServer(1);
          }
          currentRounds += 1;
          document.getElementById('player2-rounds').innerHTML =
            tidyRounds(player2.rounds);
          resetPointsToZero();
        }
        tieBreakNumber = player1.points + player2.points;
        if (tieBreakNumber%2 === 1 || tieBreakNumber === 1) {
          swapServer();
        }
        break;

      case keyShortCuts.endbtn: // remove point from player2
        if (player2.points > 0) {
          player2.points -= 1;
          writePoints();
        }
        break;
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
