let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];

function startGame() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none'); 
    initLevel(); //damit die Gegener erst geladen werden, sobald das Spiel startet, sonst laufen die schon durch, bevor man START gedrückt hat
    init();
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

function stopGame() {
    intervalIds.forEach(clearInterval);
    //gameOver screen
    // this.gameSound.pause();
}

function youLost() {
    document.getElementById('endScreenLost').classList.remove('d-none');
}

function youWon() {
    document.getElementById('endScreenWon').classList.remove('d-none');
}

function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
}
function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  // iOS Safari
      element.webkitRequestFullscreen();
    }
  }

  function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

/**
 * This Function is used to check if a key is pressed or not
 * 
 * 
 */
window.addEventListener("keydown", (e) => {
    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if(e.keyCode == 38) {
        keyboard.UP = true;
    }

    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }    

    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    } 

    if(e.keyCode == 68) {
        keyboard.D = true;
    } 
});

window.addEventListener("keyup", (e) => {

    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if(e.keyCode == 38) {
        keyboard.UP = false;
    }

    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }    

    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if(e.keyCode == 68) {
        keyboard.D = false;
    } 
});

