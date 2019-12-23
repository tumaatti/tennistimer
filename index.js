/*
 * TODO: Kuka voittaa matsin? miten se ilmoitetaan?
 * TODO: css-hiposteluja tarvis varmaan jonkin verran tehdä, että tää näyttäis ees joltain
 * TODO: valikko yläreunaan, mistä saa esim pelaajien nimet vaihdettua
 * TODO: colorpicker, jolla saa vaihdettua pelaajan taustavärin ja siten koko UI:n väriä kivasti
 * TODO: pitäis jotenkin saada noi pikanäppäimet poistettua kätöstä, kun kirjoittaa tonne playereiden nimiin jotain
 */

// set keycodes for eventListener
const enter = 13;
const home = 36;
const pgup = 33;
const pgdn = 34;
const end = 5;
const del = 46;

let TIEBREAK = false;
let currentRound = 0;
const NUM_OF_ROUNDS = 3;
const SETS_TO_WIN = 7;

let player1Rounds = [];
let player2Rounds = [];
for (let i = 0; i < NUM_OF_ROUNDS; i++) {
  player1Rounds.push(0);
  player2Rounds.push(0);
}

let firstTime = true;

function tidyRounds(playerRounds) {
  return playerRounds.toString().replace(/,/g, "  |  ");
}

document.getElementById("player1-rounds").innerHTML = tidyRounds(player1Rounds);
document.getElementById("player2-rounds").innerHTML = tidyRounds(player2Rounds);

function setPlayerNames() {
  let player1name = document.getElementById("player1-input").value;
  let player2name = document.getElementById("player2-input").value;
  document.getElementById("player1-name").innerHTML = player1name;
  document.getElementById("player2-name").innerHTML = player2name;
  document.getElementById("player1-name-sets").innerHTML = player1name;
  document.getElementById("player2-name-sets").innerHTML = player2name;
}

function swapServer() {
  let player1Serve = document.getElementById("player1-serve").innerHTML.trim();

  if (player1Serve === "&nbsp;") {
    document.getElementById("player1-serve").innerHTML = "o";
    document.getElementById("player2-serve").innerHTML = "&nbsp;";
  } else {
    document.getElementById("player1-serve").innerHTML = "&nbsp";
    document.getElementById("player2-serve").innerHTML = "o";
  }
}

function resetPointsToZero() {
  document.getElementById("player1-points").innerHTML = "0";
  document.getElementById("player2-points").innerHTML = "0";
}

document.addEventListener("keydown", function(event) {
  let player1Points = document.getElementById("player1-points").innerHTML.trim();
  let player2Points = document.getElementById("player2-points").innerHTML.trim();

  console.log(event.keyCode);

  if (!TIEBREAK) {
    if (event.keyCode === del) { // keyCode == "r"
      resetPointsToZero();
    }

    else if (event.keyCode === home) { // add point to player1 player
      if (player1Points === "0") {
        document.getElementById("player1-points").innerHTML = "15";
      } else if (player1Points === "15") {
        document.getElementById("player1-points").innerHTML = "30";
      } else if (player1Points === "30") {
        document.getElementById("player1-points").innerHTML = "40";
      } else if (player1Points === "40") {
        if (player2Points === "30" || player2Points === "15" || player2Points === "0") {
          document.getElementById("player1-points").innerHTML = "winner";
        } else if (player2Points === "AD"){
          document.getElementById("player1-points").innerHTML = "40";
          document.getElementById("player2-points").innerHTML = "40";
        } else if (player2Points === "40") {
          document.getElementById("player1-points").innerHTML = "AD";
        }
      } else if (player1Points === "AD") {
        document.getElementById("player1-points").innerHTML = "winner";
      }
    }

    else if (event.keyCode === pgup) { // remove point from player1 player
      if (player1Points === "15") {
        document.getElementById("player1-points").innerHTML = "0";
      } else if (player1Points === "30") {
        document.getElementById("player1-points").innerHTML = "15";
      } else if (player1Points === "40") {
        document.getElementById("player1-points").innerHTML = "30";
      } else if (player1Points === "AD" || player1Points === "winner") {
        document.getElementById("player1-points").innerHTML = "40";
      }
    }

    else if (event.keyCode === pgdn) { // add point to player2 player
      if (player2Points === "0") {
        document.getElementById("player2-points").innerHTML = "15";
      }
      else if (player2Points === "15") {
        document.getElementById("player2-points").innerHTML = "30";
      }
      else if (player2Points === "30") {
        document.getElementById("player2-points").innerHTML = "40";
      }
      else if (player2Points === "40") {
        if (player1Points === "30" || player1Points === "15" || player1Points === "0") {
          document.getElementById("player2-points").innerHTML = "winner";
        } else if (player1Points === "AD"){
          document.getElementById("player2-points").innerHTML = "40";
          document.getElementById("player1-points").innerHTML = "40";
        } else if (player1Points === "40") {
          document.getElementById("player2-points").innerHTML = "AD";
        }
      } else if (player2Points === "AD") {
        document.getElementById("player2-points").innerHTML = "winner";
      }
    }

    else if (event.keyCode === end) { // remove point from player2 player
      if (player2Points === "15") {
        document.getElementById("player2-points").innerHTML = "0";
      } else if (player2Points === "30") {
        document.getElementById("player2-points").innerHTML = "15";
      } else if (player2Points === "40") {
        document.getElementById("player2-points").innerHTML = "30";
      } else if (player2Points === "AD" || player2Points === "winner") {
        document.getElementById("player2-points").innerHTML = "40";
      }
    }

    else if (event.keyCode === enter) { // enter completes the round
      resetPointsToZero();
      if (player1Points === "winner") { // set player1Rounds on won round with any other button
        player1Rounds[currentRound] += 1;
        swapServer();
      if (player1Rounds[currentRound] === SETS_TO_WIN && player2Rounds[currentRound] <= SETS_TO_WIN-2) {
        if (currentRound < NUM_OF_ROUNDS) {
          if (currentRound%2 === 0) {
            document.getElementById("player1-serve").innerHTML = "&nbsp;";
            document.getElementById("player2-serve").innerHTML = "o";
          } else {
            document.getElementById("player1-serve").innerHTML = "o";
            document.getElementById("player2-serve").innerHTML = "&nbsp;";
          }
          currentRound += 1;
        } else {
          console.log("do something here"); // TODO: jotain tarvis tehdä, kun matsi päättyy
        }
      } else if (player1Rounds[currentRound] === SETS_TO_WIN-1 && player2Rounds[currentRound] === SETS_TO_WIN-1) {
        TIEBREAK = true;
      }
        document.getElementById("player1-rounds").innerHTML = tidyRounds(player1Rounds);
      }
      else if (player2Points === "winner") { // set player2Rounds on won round with any other button
        player2Rounds[currentRound] += 1;
        swapServer();
        if (player2Rounds[currentRound] === SETS_TO_WIN && player1Rounds[currentRound] <= SETS_TO_WIN-2) {
          if (currentRound < NUM_OF_ROUNDS) {
            if (currentRound%2 === 0) {
              document.getElementById("player1-serve").innerHTML = "&nbsp;";
              document.getElementById("player2-serve").innerHTML = "o";
            } else {
              document.getElementById("player1-serve").innerHTML = "o";
              document.getElementById("player2-serve").innerHTML = "&nbsp;";
            }
            currentRound += 1;
          } else {
            console.log("do something here");
          }
        } else if (player2Rounds[currentRound] === SETS_TO_WIN-1 && player1Rounds[currentRound] === SETS_TO_WIN-1) {
          TIEBREAK = true;
        }
        document.getElementById("player2-rounds").innerHTML = tidyRounds(player2Rounds)
      }
    }
  } else { // !TIEBREAK
    if (firstTime) {
      resetPointsToZero();
      firstTime = false;
    }

    let player1points = parseInt(document.getElementById("player1-points").innerHTML);
    let player2points = parseInt(document.getElementById("player2-points").innerHTML);


    if (event.keyCode === home) { // add point to player1 player
      player1points += 1;
      document.getElementById("player1-points").innerHTML = player1points;
      if (player1points%6 === 1 && player2points <= player1points-2) {
        TIEBREAK = false;
        player1Rounds[currentRound] += 1;
        if (currentRound%2 === 0) {
          document.getElementById("player1-serve").innerHTML = "&nbsp;";
          document.getElementById("player2-serve").innerHTML = "o";
        } else {
          document.getElementById("player1-serve").innerHTML = "o";
          document.getElementById("player2-serve").innerHTML = "&nbsp;";
        }
        currentRound += 1;
        document.getElementById("player1-rounds").innerHTML = tidyRounds(player1Rounds);
        resetPointsToZero();
      }
      let tieBreakNumber = player1points + player2points;
      console.log(tieBreakNumber);
      if (tieBreakNumber%2 === 1) {
        swapServer();
      }
    }

    if (event.keyCode === pgup) { // remove point from player 1
      if (player1points > 0) {
        player1points -= 1;
        document.getElementById("player1-points").innerHTML = player1points;
      }
    }

    if (event.keyCode === pgdn) { // add point to player2
      player2points += 1;
      document.getElementById("player2-points").innerHTML = player2points;
      if (player2points%6 === 1 && player1points <= player2points-2) {
        TIEBREAK = false;
        player2Rounds[currentRound] += 1;
        if (currentRound%2 === 0) {
          document.getElementById("player1-serve").innerHTML = "&nbsp;";
          document.getElementById("player2-serve").innerHTML = "o";
        } else {
          document.getElementById("player1-serve").innerHTML = "o";
          document.getElementById("player2-serve").innerHTML = "&nbsp;";
        }
        currentRound += 1;
        document.getElementById("player2-rounds").innerHTML = tidyRounds(player2Rounds);
        resetPointsToZero();
      }
      let tieBreakNumber = player1points + player2points;
      if (tieBreakNumber%2 === 1 || tieBreakNumber === 1) {
        swapServer();
      }
    }

    if (event.keyCode === end) { // remove point from player2
      if (player2points > 0) {
        player2points -= 1;
        document.getElementById("player2-points").innerHTML = player2points;
      }
    }
  }
})
