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

    /**
     * this function is used to draw rectangles around the MovableObject, it helps to check where they will collide
     * 
     * @param {string} ctx - so that you can draw on the canvas
     */
    drawFrame(ctx) {

        //instanceof damit die Vierecke nur um die Chicken und den Character sind und nicht um jedes MO
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof SalsaBottle || this instanceof Coin || this instanceof SmallChicken || this instanceof Heart) {
            //draw rectangle
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'transparent';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * this function is used to draw the coordinates from the MovableObject that you want to know
     * 
     * @param {string} ctx - so that you can draw on the canvas
     */
    // drawPosition(ctx) {
    //     if(this instanceof SalsaBottle) {
    //         ctx.font = "48px serif";
    //         ctx.fillText(`${this.x}, ${this.y}`, this.x, this.y);
    //     }
    // }

     /**
     * this function is used to draw rectangles around the MovableObject within the other frame, it helps to check where they will collide
     * offset means the difference between the outer and the inner frame (this one here is the inner one)
     * 
     * @param {string} ctx - so that you can draw on the canvas
     */
    drawFrameOffset(ctx) {

        //instanceof damit die Vierecke nur um die Chicken und den Character sind und nicht um jedes MO
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof SalsaBottle || this instanceof Coin || this instanceof SmallChicken || this instanceof Heart) {
            //draw rectangle
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'transparent';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    }
}