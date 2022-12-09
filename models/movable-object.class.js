class MovableObject{
    x = 120;
    y = 340;
    img;
    height = 100;
    width = 100;
    imageCache = {};
    currentImage = 0;


    //path = pfad zum img
   loadImage(path) {
    this.img = new Image(); //ist dasselbe wie: this.img = document.getElementById('image')<img id="image" src)
    this.img.src = path; //verändert das src Attribut
   }


   loadImages(array) {
    array.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
        
    });
   }

    moveRight(){
        console.log('Moving right');
    }

    moveLeft() {
        
    }
}