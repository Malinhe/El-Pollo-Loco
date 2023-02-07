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

    /**
     * Loads an image from a given path into the current object.
     * 
     * @param {String} path - the path of the Picture you want to load
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the current image (this.img) onto a given canvas context (ctx)
     * with given x and y coordinates (this.x, this.y) and given width and height (this.width, this.height).
     * 
     * @param {Canvas-Context} ctx - the "ctx" parameter is a canvas context (CanvasRenderingContext2D) 
     * that provides the environment for drawing on an HTML canvas. It allows drawing shapes, images and text on a canvas
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Iterates through the array and loads the images
     * 
     * @param {String} array 
     */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draw rectangles around the MovableObject, it helps to check where they collide
     * 
     * @param {Canvas-Context} ctx - the "ctx" parameter is a canvas context (CanvasRenderingContext2D) 
     * that provides the environment for drawing on an HTML canvas. It allows drawing shapes, images and text on a canvas
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss ||
            this instanceof ThrowableObject || this instanceof SalsaBottle || this instanceof Coin ||
            this instanceof SmallChicken || this instanceof Heart) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'transparent';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
    * Draw rectangles around the MovableObject within the other frame, it helps to check where they collide
    * offset means the difference between the outer and the inner frame (this one here is the inner one)
    * 
    *@param {Canvas-Context} ctx - the "ctx" parameter is a canvas context (CanvasRenderingContext2D) 
    * that provides the environment for drawing on an HTML canvas. It allows drawing shapes, images and text on a canvas
    */
    drawFrameOffset(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss ||
            this instanceof ThrowableObject || this instanceof SalsaBottle || this instanceof Coin ||
            this instanceof SmallChicken || this instanceof Heart) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'transparent';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top,
                     this.width - this.offset.right - this.offset.left,
                     this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }}
}