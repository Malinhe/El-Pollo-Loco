class MovableObject extends DrawableObject {
    speed = 0.15; // 0.15px werden abgezogen
    otherDirection = false;
    speedY = 0; // Geschwindigkeit mit der das Object auf der Y-Achse fällt
    acceleration = 2.6; // Beschleunigung auf die Geschwindigkeit speedY
    energy = 100;
    lastHit = 0;
    

    //damit Pepe fallen kann
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return true;
        } else {
        return this.y < 140;
    }}

    /**
     * Function to check if a movable object overlaps with another
     * 
     * @param {object} mo - object that could be a bottle, character, endboss or chicken
     * @returns 
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    jump() {
        this.speedY = 30;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }}

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1; //was hit in the last 5s so this function returns true
    }

    isDead() {
        return this.energy == 0;
    }

    youLost() {
        document.getElementById('endScreen').classList.remove('d-none');
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
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

   
}