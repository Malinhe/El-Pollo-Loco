class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 340;
    height = 100;
    width = 100;


    //path = pfad zum img
    loadImage(path) {
        this.img = new Image(); //ist dasselbe wie: this.img = document.getElementById('image')<img id="image" src)
        this.img.src = path; //verändert das src Attribut
    }


    //?? Warum this.img, this.x usw?
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // um durch das Array zu etarieren und die Bilder zu laden
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;

        });
    }

    
    drawFrame(ctx) {

        //instanceof damit die Vierecke nur um die Chicken und den Character sind und nicht um jedes MO
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            //draw rectangle
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}