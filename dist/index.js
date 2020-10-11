const keyCodes = {
    enter: 13,
    home: 36,
    pgup: 33,
    pgdn: 34,
    end: 35,
    del: 46,
    shift: 16,
};
const possiblePoints = ['0', '15', '30', '40', 'AD', 'winner'];
let NUM_OF_ROUNDS = 3;
let tieBreakNumber = 0;
const SETS_TO_WIN = 7;
let TIEBREAK = false;
let clock;
let clockRunning = false;
let firstTime = true;
let currentRound = 0;
class Player {
    constructor(name, points, rounds, color, picker) {
        this.name = name;
        this.points = points;
        this.rounds = rounds;
        this.color = color;
        this.picker = picker;
    }
    resetPoints() {
        this.points = 0;
    }
    realPoints() {
        return possiblePoints[this.points];
    }
    removePoint() {
        if (this.points === 5)
            this.points = 3;
        else if (this.points === 0)
            this.points = 0;
        else
            this.points -= 1;
    }
    fillRoundsWithZeros() {
        this.rounds = [];
        for (let i = 0; i < NUM_OF_ROUNDS; i++) {
            this.rounds.push(0);
        }
    }
}
let player1 = new Player('player1', 0, [], '#fff', '');
let player2 = new Player('player2', 0, [], '#fff', '');
const setServer = (server) => {
    if (server === 1) {
        document.getElementById('player1-serve').innerHTML =
            '<img src="assets/serve.png">';
        document.getElementById('player2-serve').innerHTML =
            '&nbsp;';
    }
    else if (server === 2) {
        document.getElementById('player1-serve').innerHTML =
            '&nbsp';
        document.getElementById('player2-serve').innerHTML =
            '<img src="assets/serve.png">';
    }
};
const swapServer = () => {
    const player1Serve = document.
        getElementById('player1-serve')
        .innerHTML.trim();
    if (player1Serve === '&nbsp;') {
        setServer(1);
    }
    else {
        setServer(2);
    }
};
const addPointToPlayer = (pointWinner) => {
    // this is pretty messy, but i have no idea how else do this
    if (!TIEBREAK) {
        if (pointWinner === 1) {
            if (player1.points === 3 && player2.points < 3) {
                player1.points = 5;
            }
            else if (player1.points === 3 && player2.points === 3) {
                player1.points = 4;
            }
            else if (player1.points === 3 && player2.points === 4) {
                player2.points = 3;
            }
            else if (player1.points < 3 || player1.points === 4) {
                player1.points += 1;
            }
        }
        else if (pointWinner === 2) {
            if (player2.points === 3 && player1.points < 3) {
                player2.points = 5;
            }
            else if (player2.points === 3 && player1.points === 3) {
                player2.points = 4;
            }
            else if (player2.points === 3 && player1.points === 4) {
                player1.points = 3;
            }
            else if (player2.points < 3 || player2.points === 4) {
                player2.points += 1;
            }
        }
        writePoints();
    }
    else {
        if (pointWinner === 1) {
            player1.points += 1;
            writePoints();
            if ((player1.points === 7 && player2.points <= 5) ||
                (player1.points > 7 && player2.points <= player1.points - 2)) {
                TIEBREAK = false;
                player1.rounds[currentRound] += 1;
                if (currentRound % 2 === 0) {
                    setServer(2);
                }
                else {
                    setServer(1);
                }
                currentRound += 1;
                writeRounds();
                player1.resetPoints();
                player2.resetPoints();
                writePoints();
            }
            tieBreakNumber = player1.points + player2.points;
            if (tieBreakNumber % 2 === 1) {
                swapServer();
            }
        }
        else if (pointWinner === 2) {
            player2.points += 1;
            writePoints();
            if ((player2.points === 7 && player1.points <= 5) ||
                (player2.points > 7 && player1.points <= player2.points - 2)) {
                TIEBREAK = false;
                player2.rounds[currentRound] += 1;
                if (currentRound % 2 === 0) {
                    setServer(2);
                }
                else {
                    setServer(1);
                }
                currentRound += 1;
                writeRounds();
                player1.resetPoints();
                player2.resetPoints();
                writePoints();
            }
            tieBreakNumber = player1.points + player2.points;
            if (tieBreakNumber % 2 === 1) {
                swapServer();
            }
        }
    }
};
const writePoints = () => {
    if (!TIEBREAK) {
        document.getElementById('player1-points').innerHTML = player1.realPoints();
        document.getElementById('player2-points').innerHTML = player2.realPoints();
    }
    else {
        document.getElementById('player1-points').innerHTML = String(player1.points);
        document.getElementById('player2-points').innerHTML = String(player2.points);
    }
};
const writeRounds = () => {
    let rounds1 = player1.rounds.toString().replace(/,/g, '  |  ');
    rounds1 = rounds1.replace(/7/g, '<span style="background-color: yellow">7</span>');
    let rounds2 = player2.rounds.toString().replace(/,/g, '  |  ');
    rounds2 = rounds2.replace(/7/g, '<span style="background-color: yellow">7</span>');
    document.getElementById('player1-rounds').innerHTML = rounds1;
    document.getElementById('player2-rounds').innerHTML = rounds2;
};
const startTieBreak = () => {
    player1.resetPoints();
    player2.resetPoints();
    TIEBREAK = true;
};
player1.fillRoundsWithZeros();
player2.fillRoundsWithZeros();
writeRounds();
document.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
        case keyCodes.del:
            player1.resetPoints();
            player2.resetPoints();
            writePoints();
            break;
        case keyCodes.home:
            addPointToPlayer(1);
            break;
        case keyCodes.pgdn:
            addPointToPlayer(2);
            break;
        case keyCodes.pgup:
            if (!TIEBREAK) {
                player1.removePoint();
            }
            else if (player1.points > 0) {
                player1.points -= 1;
            }
            writePoints();
            break;
        case keyCodes.end:
            if (!TIEBREAK) {
                player2.removePoint();
            }
            else if (player2.points > 0) {
                player2.points -= 1;
            }
            writePoints();
            break;
        case keyCodes.enter:
            // enter completes the round
            if (!TIEBREAK) {
                if (player1.points === 5) { // set ends
                    player1.resetPoints();
                    player2.resetPoints();
                    writePoints();
                    player1.rounds[currentRound] += 1;
                    swapServer();
                    if (player1.rounds[currentRound] === SETS_TO_WIN &&
                        player2.rounds[currentRound] <= SETS_TO_WIN - 2) { // round ends
                        if (currentRound < NUM_OF_ROUNDS) {
                            if (currentRound % 2 === 0) {
                                setServer(2);
                            }
                            else {
                                setServer(1);
                            }
                            currentRound += 1;
                        }
                        else { // do nothing here
                            console.log('do nothing here');
                        }
                    }
                    else if (player1.rounds[currentRound] === SETS_TO_WIN - 1 &&
                        player2.rounds[currentRound] === SETS_TO_WIN - 1) {
                        startTieBreak();
                    }
                    writeRounds();
                }
                else if (player2.points === 5) {
                    player1.resetPoints();
                    player2.resetPoints();
                    writePoints();
                    player2.rounds[currentRound] += 1;
                    swapServer();
                    if (player2.rounds[currentRound] === SETS_TO_WIN &&
                        player1.rounds[currentRound] <= SETS_TO_WIN - 2) {
                        if (currentRound < NUM_OF_ROUNDS) {
                            if (currentRound % 2 === 0) {
                                setServer(2);
                            }
                            else {
                                setServer(1);
                            }
                            currentRound += 1;
                        }
                        else {
                            console.log('do nothing here');
                        }
                    }
                    else if (player2.rounds[currentRound] === SETS_TO_WIN - 1 &&
                        player1.rounds[currentRound] === SETS_TO_WIN - 1) {
                        startTieBreak();
                    }
                    writeRounds();
                }
            }
            break;
    }
});
