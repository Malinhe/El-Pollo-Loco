let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let soundOff = false;
let lastMoved;
let background_sound = new Audio('audio/pepe-bg-sound.mp3');
let chicken_clucking_sound = new Audio('audio/chicken_clucking.mp3');
let outro_sound = new Audio('audio/guitarrPepe.mp3');
let start = false;


/**
 * Starts and stops the background sounds and shows wether the sound is on or off
 */
function gameSoundOnOff() {
    if (!soundOff) {
        soundOff = true;
        playBGSound();
        playChickenSound();
        document.getElementById('soundOff').classList.remove('d-none');
        document.getElementById('soundOn').classList.add('d-none');
        document.getElementById('mobileSoundOFF').classList.remove('d-none');
        document.getElementById('mobileSoundON').classList.add('d-none');
    } else if (soundOff) {
        soundOff = false;
        playBGSound();
        playChickenSound();
        document.getElementById('soundOff').classList.add('d-none');
        document.getElementById('soundOn').classList.remove('d-none');
        document.getElementById('mobileSoundOFF').classList.add('d-none');
        document.getElementById('mobileSoundON').classList.remove('d-none');
    }
}

/**
 * Is for the backgroundsound, it will be played when the game starts and 
 * can only be paused or played when the game was started
 */
function playBGSound() {
    if (start) {
        background_sound.volume = 0.1;
        if (!soundOff) {
            background_sound.play();
        } else if (soundOff) {
            background_sound.pause();
        }
    }
}

/**
 * Is for the sound from the chicken, it will be played when the game starts and 
 * can only be paused or played when the game was started
 */
function playChickenSound() {
    if (start) {
        chicken_clucking_sound.volume = 0.2;
        chicken_clucking_sound.playbackRate = 1;
        if (!soundOff) {
            chicken_clucking_sound.play();
        } else if (soundOff) {
            chicken_clucking_sound.pause();
        }
    }
}

/**
 * Fires when the game is started. The startscreen will be removed and the background sounds start
 */
function startGame() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('start').classList.add('d-none');
    document.getElementById('restart').classList.remove('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('btnPlay').classList.add('d-none');
    document.getElementById('btnReload').classList.remove('d-none');
    start = true;
    playBGSound();
    playChickenSound();
    initLevel();
    init();
    lastMoved = new Date().getTime();
}

/**
 * Is used to load our Canvas and implement the touch btns
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    touchButtons();
}

/**
 * Pushes the intervals into an array
 * 
 * @param {Function} fn - the name of the function
 * @param {Number} time - the time of the interval
 */
function setStopableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

/**
 * For the sound when the game is over
 */
function playOutroSound() {
    if (!soundOff) {
        outro_sound.play();
    } else if (soundOff) {
        outro_sound.pause();
    }
}

/**
 * Stops every stopable interval and playes the sound when the game ended
 */
function stopGame() {
    intervalIds.forEach(clearInterval);
    playOutroSound();
}

/**
 * Shows the "youWon"-screen, the game is over
 */
function gameOver() {
    document.getElementById('endScreenWon').classList.remove('d-none');
    document.getElementById('sound').classList.add('d-none');
    document.getElementById('btnSound').classList.add('d-none');
}

/**
 * Reloads the window and resets the game
 */
function reload() {
    location.reload();
}

/**
 * Is used to check if a key is pressed or not. It also saves, when the character was last moved
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
 * Is for the touch btns when the game is played on a mobile device. It also saves, when the character was last moved
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
