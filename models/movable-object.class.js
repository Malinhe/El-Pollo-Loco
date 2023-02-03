class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;


    /**
     * This function simulates the effect of gravity by periodically decreasing the object's y position, causing the object to fall downwards.
     * However, if the object is not above the ground, the object's y position is set to 155.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.y = 155;
            }
        }, 1000 / 25);
    }

    /**
     * the method returns the result whether the current object is above the ground or not.
     * 
     * @returns true if an Object is above the ground
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150;
        }
    }

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

    /**
     * The jump function allows an object to move up. It does this by setting the object's speedY property 
     * to a specific value.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * this function reduces the energy from the MovableObject and saves the moment when it was hit for the last time
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * This function checks whether the current object has been hit in the past period. 
     * It does this by comparing the current time to the time of the object's last hit.
     *  
     * @returns true
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * this function returns true when the energy from the MovableObject ist 0
     * @returns true
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * this function lets the killed Object disaapear after the time of 0.4s
     */
    disappearWhenIsDead() {
        setTimeout(() => this.x = -3000, 400);
    }

    /**
     * this function is used to iterate through an array of images so the Object can be animated
     * 
     * @param {Array} images - array from the images you want to use for the animation
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * this function is for all MovableObject so that they can move to the right direction
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * this function is for all MovableObject so that they can move to the left direction
     */
    moveLeft() {
        this.x -= this.speed;
    }
}