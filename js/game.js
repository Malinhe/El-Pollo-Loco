let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let soundOff = false;
let lastMoved;
let background_sound = new Audio('audio/pepe-bg-sound.mp3');
let chicken_clucking_sound = new Audio('audio/chicken_clucking.mp3');
let outro_sound = new Audio('audio/guitarrPepe.mp3');


/**
 * this function fires when the game is started. The startscreen will be removed and the background sounds start
 */
function startGame() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('start').classList.add('d-none');
    // document.getElementById('fullscreenIcon').classList.remove('d-none');
    document.getElementById('restart').classList.remove('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('btnPlay').classList.add('d-none');
    document.getElementById('btnReload').classList.remove('d-none');
    initLevel();
    init();
    lastMoved = new Date().getTime();
    background_sound.volume = 0.1;
    background_sound.play();
    chicken_clucking_sound.volume = 0.2;
    chicken_clucking_sound.playbackRate = 1;
    chicken_clucking_sound.play();
    if (soundOff) {
        background_sound.pause();
        chicken_clucking_sound.pause();
    }
}

/**
 * This Function is used to load our Canvas and implement the touch btns
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    touchButtons();
}

/**
 * this function pushes the intervals into an array
 * 
 * @param {Function} fn - the name of the function
 * @param {Number} time - the time of the interval
 */
function setStopableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

/**
 * this function starts and stops the background sounds and shows wether the sound is on or off
 */
function gameSound() {
    if (!soundOff) {
        soundOff = true;
        document.getElementById('soundOff').classList.remove('d-none');
        document.getElementById('soundOn').classList.add('d-none');
        document.getElementById('mobileSoundOFF').classList.remove('d-none');
        document.getElementById('mobileSoundON').classList.add('d-none');
        background_sound.pause();
        chicken_clucking_sound.pause();
    } else if (soundOff) {
        soundOff = false;
        document.getElementById('soundOff').classList.add('d-none');
        document.getElementById('soundOn').classList.remove('d-none');
        document.getElementById('mobileSoundOFF').classList.add('d-none');
        document.getElementById('mobileSoundON').classList.remove('d-none');
        background_sound.play();
        chicken_clucking_sound.play();
    }
}

/**
 * this function stops every stopable interval and the background sounds
 */
function stopGame() {
    intervalIds.forEach(clearInterval);
    background_sound.pause();
    chicken_clucking_sound.pause();
    outro_sound.play();
    if (soundOff) {
        outro_sound.pause();
    }
}


/**
 * shows the "youWon"-screen, when the Endboss died
 */
function youWon() {
    document.getElementById('endScreenWon').classList.remove('d-none');
}

/**
 * this function reloads the window and resets the game
 */
function reload() {
    location.reload();
}

/**
 * This Function is used to check if a key is pressed or not. It also saves, when the character was last moved
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
        lastMoved = new Date().getTime();
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
        lastMoved = new Date().getTime();
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
        lastMoved = new Date().getTime();
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
        lastMoved = new Date().getTime();
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
        lastMoved = new Date().getTime();
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
        lastMoved = new Date().getTime();
    }
});

window.addEventListener("keyup", (e) => {

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});


/**
 * this function is for the touch btns when the game is played on a mobile device. It also saves, when the character was last moved
 */
function touchButtons() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
        lastMoved = new Date().getTime();
    });

    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
        lastMoved = new Date().getTime();
    });

    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
        lastMoved = new Date().getTime();
    });

    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
        lastMoved = new Date().getTime();
    });

    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}
