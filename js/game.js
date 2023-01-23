let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let soundOff = false;
let lastMoved;
// let music = true;
let background_sound = new Audio('audio/pepe-bg-sound.mp3');
let endboss_sound = new Audio('audio/endboss_sound.mp3');

function startGame() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('start').classList.add('d-none'); 
    document.getElementById('sound').classList.add('d-none'); 
    document.getElementById('restart').classList.remove('d-none');  
    document.getElementById('canvas').classList.remove('d-none');
    initLevel(); //damit die Gegener erst geladen werden, sobald das Spiel startet, sonst laufen die schon durch, bevor man START gedrückt hat
    init();
    lastMoved = new Date().getTime();
    if (!soundOff) {
        background_sound.volume = 0.1;
        background_sound.play();
    }
}

//erstmal das Canvas laden, wenn der Body geladen ist
/**
 * This Function is used to load our Game
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
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
    } else if (soundOff) {
        soundOff = false;
        document.getElementById('soundOff').classList.add('d-none');
        document.getElementById('soundOn').classList.remove('d-none');
    }
}

function stopGame() {
    intervalIds.forEach(clearInterval);
    background_sound.pause();
    endboss_sound.pause();
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

