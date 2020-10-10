const zpad = (str: string) => {
    let a = str.trim()
    if (a.length === 1) {
        a = '0' + a;
    }
    return a;
}

document.addEventListener('keydown', (event: any) => {
    if (event.keyCode === keyCodes.shft) {
        if (!clockRunning) {
            let playedTime = document.getElementById('matchtime').innerHTML;
            const pT = playedTime.split(':');
            const org = new Date();
            clock = setInterval(function startClock() {
                clockRunning = true;
                const now = new Date();
                const diff = now.getTime() - org.getTime();
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
})
