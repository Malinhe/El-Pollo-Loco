class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 340;
    height = 100;
    width = 100;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };


    //path = pfad zum img
    loadImage(path) {
        this.img = new Image(); //ist dasselbe wie: this.img = document.getElementById('image')<img id="image" src)
        this.img.src = path; //verändert das src Attribut
    }


    //?? Warum this.img, this.x usw?
    //weil wir vorher die draw() in der World hatten und mit mo.img, mo.x usw auf die MovableObjects zugegriffen haben, jetzt befinden sich aber die Variablen in derselben Klasse wie die Function, also wieder mit this darauf zugreifen
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
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof SalsaBottle || this instanceof Coin || this instanceof SmallChicken || this instanceof Heart) {
            //draw rectangle
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawFrameOffset(ctx) {

        //instanceof damit die Vierecke nur um die Chicken und den Character sind und nicht um jedes MO
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof SalsaBottle || this instanceof Coin || this instanceof SmallChicken || this instanceof Heart) {
            //draw rectangle
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    }
}