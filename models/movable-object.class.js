class MovableObject {
    x = 120;
    y = 340;
    img;
    height = 100;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;

    //damit Pepe fallen kann
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGorund() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGorund() {
        return this.y < 150;
    }


    //path = pfad zum img
    loadImage(path) {
        this.img = new Image(); //ist dasselbe wie: this.img = document.getElementById('image')<img id="image" src)
        this.img.src = path; //verändert das src Attribut
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        //draw rectangle
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
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


    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

}