const capitalize = (lowercaseString: string) => {
    return lowercaseString.charAt(0).toUpperCase() + lowercaseString.slice(1);
}
const keyMappings = {
    addP1: capitalize(Object.keys(keyCodes)[0]),
    addP2: capitalize(Object.keys(keyCodes)[1]),
    rmP1: capitalize(Object.keys(keyCodes)[2]),
    rmP2: capitalize(Object.keys(keyCodes)[3]),
    comm: capitalize(Object.keys(keyCodes)[4]),
    clock: capitalize(Object.keys(keyCodes)[5]),
    res: capitalize(Object.keys(keyCodes)[6]),
}

const content =
    '<PRE>How to use the clock: <br>' +
    'Add points <br>' +
    `  Player1: ${keyMappings.addP1}<br>` +
    `  Player2: ${keyMappings.addP2}<br>` +
    'Remove points <br>' +
    `  Player1: ${keyMappings.rmP1}<br>` +
    `  Player2: ${keyMappings.rmP2}<br>` +
    `Commit points: ${keyMappings.comm}<br>` +
    `Start/Stop the clock: ${keyMappings.clock}<br>` +
    `Reset Points: ${keyMappings.res}</PRE>`;

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
