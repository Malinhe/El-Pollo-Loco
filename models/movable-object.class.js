class MovableObject{
    x = 120;
    y = 350;
    img;
    height = 100;
    width = 100;


    //path = pfad zum img
   loadImage(path) {
    this.img = new Image(); //ist dasselbe wie: this.img = document.getElementById('image')<img id="image" src)
    this.img.src = path; //verändert das src Attribut
   }

    moveRight(){
        console.log('Moving right');
    }

    moveLeft() {
        
    }
}