class MovableObject{
    x = 120;
    y = 340;
    img;
    height = 100;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;


    //path = pfad zum img
   loadImage(path) {
    this.img = new Image(); //ist dasselbe wie: this.img = document.getElementById('image')<img id="image" src)
    this.img.src = path; //verändert das src Attribut
   }

// um durch das Array zu etarieren und die Bilder zu laden
   loadImages(array) {
    array.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
        
    });
   }

   playAnimation(images) {
    let i = this.currentImage % this.IMAGES_WALKING.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
}


    moveRight(){
        console.log('Moving right');
    }

  //damit die MO nach links laufen und für die Geschwindigkeit
  moveLeft() {
    setInterval(() => {
        this.x -= this.speed;
    }, 1000 / 60);
   }
}