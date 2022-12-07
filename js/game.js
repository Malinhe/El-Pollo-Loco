let canvas;
let world;

//erstmal das Canvas laden, wenn der Body geladen ist
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    
   
    console.log('My Character is', world.character);
}