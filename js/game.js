let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let soundOff = false;
let lastMoved;
// let startScreenSound = new Audio('audio/laCucaracha.mp3');
let background_sound = new Audio('audio/pepe-bg-sound.mp3');
let chicken_clucking_sound = new Audio('audio/chicken_clucking.mp3');
let endboss_sound = new Audio('audio/guitarr.mp3');
let outro_sound = new Audio('audio/guitarrPepe.mp3');

// function startSound() {
//     setInterval(() => {
//     if (!soundOff) {
//         startScreenSound.volume = 0.5;
//         startScreenSound.play();
//     }else if (soundOff) {
//         startScreenSound.pause();
//     }}, 200);
// }

function startGame() {
    // startScreenSound.pause();
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
    chicken_clucking_sound.volume = 0.2;
    chicken_clucking_sound.playbackRate = 1;
    background_sound.play();
    chicken_clucking_sound.play();
    if (soundOff) {
        background_sound.pause();
        chicken_clucking_sound.pause();
    }
}

//erstmal das Canvas laden, wenn der Body geladen ist
/**
 * This Function is used to load our Game
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    touchButtons();
}

function setStopableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

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

function stopGame() {
    intervalIds.forEach(clearInterval);
    background_sound.pause();
    endboss_sound.pause();
    chicken_clucking_sound.pause();
    outro_sound.play();
    if (soundOff) {
        outro_sound.pause();
    }
}

function youLost() {
    document.getElementById('endScreenLost').classList.remove('d-none');
}

function youWon() {
    document.getElementById('endScreenWon').classList.remove('d-none');
}

function reload() {
    location.reload();
}

function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * This Function is used to check if a key is pressed or not
 * 
 * 
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

function touchButtons() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}
