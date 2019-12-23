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

document.getElementById("player1-rounds").innerHTML = player1Rounds;
document.getElementById("player2-rounds").innerHTML = player2Rounds;

document.addEventListener("keydown", function(event) {
  let leftPoints = document.getElementById("left-points").innerHTML.trim();
  let rightPoints = document.getElementById("right-points").innerHTML.trim();

  // set keycodes
  const r = 82;
  const a = 65;
  const s = 83;
  const enter = 13;

  console.log(event.keyCode);

  if (!TIEBREAK) {
    if (event.keyCode === r) { // keyCode == "r"
      document.getElementById("left-points").innerHTML = "0";
      document.getElementById("right-points").innerHTML = "0";
    }

    else if (event.keyCode === a) { // keyCode == "a"
      if (leftPoints === "0") {
        document.getElementById("left-points").innerHTML = "15";
      } else if (leftPoints === "15") {
        document.getElementById("left-points").innerHTML = "30";
      } else if (leftPoints === "30") {
        document.getElementById("left-points").innerHTML = "40";
      } else if (leftPoints === "40") {
        if (rightPoints === "30" || rightPoints === "15" || rightPoints === "0") {
          document.getElementById("left-points").innerHTML = "winner";
        } else if (rightPoints === "AD"){
          document.getElementById("left-points").innerHTML = "40";
          document.getElementById("right-points").innerHTML = "40";
        } else if (rightPoints === "40") {
          document.getElementById("left-points").innerHTML = "AD";
        }
      } else if (leftPoints === "AD") {
        document.getElementById("left-points").innerHTML = "winner";
      }
    }

    else if (event.keyCode === s) { // keyCode == "s"
      if (rightPoints === "0") {
        document.getElementById("right-points").innerHTML = "15";
      }
      else if (rightPoints === "15") {
        document.getElementById("right-points").innerHTML = "30";
      }
      else if (rightPoints === "30") {
        document.getElementById("right-points").innerHTML = "40";
      }
      else if (rightPoints === "40") {
        if (leftPoints === "30" || leftPoints === "15" || leftPoints === "0") {
          document.getElementById("right-points").innerHTML = "winner";
        } else if (leftPoints === "AD"){
          document.getElementById("right-points").innerHTML = "40";
          document.getElementById("left-points").innerHTML = "40";
        } else if (leftPoints === "40") {
          document.getElementById("right-points").innerHTML = "AD";
        }
      } else if (rightPoints === "AD") {
        document.getElementById("right-points").innerHTML = "winner";
      }
    }

    else if (event.keyCode === enter) { // enter completes the round
      if (leftPoints === "winner") { // set player1Rounds on won round with any other button
        document.getElementById("left-points").innerHTML = "0";
        document.getElementById("right-points").innerHTML = "0";
        player1Rounds[currentRound] += 1;
        if (player1Rounds[currentRound] === SETS_TO_WIN && player2Rounds[currentRound] <= SETS_TO_WIN-2) {
          currentRound += 1;
        } else if (player1Rounds[currentRound] === SETS_TO_WIN-1 && player2Rounds[currentRound] === SETS_TO_WIN-1) {
          TIEBREAK = true;
          console.log('TIEBREAK = ' + TIEBREAK);
        }
        document.getElementById("player1-rounds").innerHTML = player1Rounds;
      }

      else if (rightPoints === "winner") { // set player2Rounds on won round with any other button
        document.getElementById("left-points").innerHTML = "0";
        document.getElementById("right-points").innerHTML = "0";
        player2Rounds[currentRound] += 1;
        if (player2Rounds[currentRound] === SETS_TO_WIN && player1Rounds[currentRound] <= SETS_TO_WIN-2) {
          currentRound += 1;
        } else if (player2Rounds[currentRound] === SETS_TO_WIN-1 && player1Rounds[currentRound] === SETS_TO_WIN-1) {
          TIEBREAK = true;
          console.log('TIEBREAK = ' + TIEBREAK);
        }
        document.getElementById("player2-rounds").innerHTML = player2Rounds;
      }
    } else { // !TIEBREAK
      console.log(TIEBREAK);
    }
  }
})
