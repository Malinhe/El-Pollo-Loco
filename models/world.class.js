class World {
    character = new Character();
    endboss = new Endboss();
    endbossbar = new EndbossBar();
    endboss_sound = new Audio('audio/guitarr.mp3');
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;//Minus, weil das Bild ja nach links verschoben wird
    statusbar = new StatusBar();
    bottlebar = new BottleBar();
    bottleCounter = 0;
    coinCounter = 0;
    coinbar = new CoinBar();
    coin_sound = new Audio('audio/coin.mp3');
    bottle_collect_sound = new Audio('audio/bottle-collect.mp3');
    throwableObjects = [];
    throw_bottle_sound = new Audio('audio/throw-bottle.mp3');
    chicken_dead_sound = new Audio('audio/chicken-dead.mp3');
    power_up = new Audio('audio/powerUp.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * this function links the world to the character and Endboss so that the variables of the world can be accessed from the character or Endboss.
     * In this case, "this" after the equals sign is the world as an instance
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    /**
     * this function checks every 0.1s if movable objects are colliding with each other
     * 
     * @param {object} mo - object that could be a bottle, heart, coin, character, endboss or chicken
     */
    run() {
        setStopableInterval(() => {
            this.checkCollisionsWithEnemy();
            this.checkIfBottleCollected();
            this.checkThrowObjects();
            this.checkIfCoinCollected();
            this.checkCollisionBottleVSEndboss();
            this.checkIfHeartCollected();
        }, 100);
    }

    /**
     * this function is a help-function for the collect sounds, when the gamesound is not OFF then the music will play
     * 
     * @param {String} sound - the sound that should be played
     * @param {Number} volume - how should the sound be
     */
    playCollectSound(sound, volume = 0.2) {
        sound.volume = volume;
        if (!soundOff) {
            sound.play();
        }
    }

      /**
     * this function returns true when the Character is above the ground
     * 
     * @returns true
     */
    characterJumps() {
        return this.character.isAboveGround() && this.character.speedY < 0
    }

    /**
     * this function returns true when the Character isn´t above the ground
     * 
     * @returns true
     */
    characterDoesNotJump() {
        return !this.character.isAboveGround()
    }

    /**
     * the function uses the forEach method to iterate over each enemy in the list and 
     * lets the Character jump on the top of it so the SmallChicken and the Chicken will die
     */
    checkCollisionsWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            let endboss = this.endboss;
            if (this.character.isColliding(enemy) && this.characterJumps()) {
                this.character.jump();
                enemy.chickenDead();
                if (!soundOff) {
                    this.chicken_dead_sound.volume = 0.2;
                    this.chicken_dead_sound.play();
                }
            } else if (this.character.isColliding(enemy) && this.characterDoesNotJump()) {
                this.characterLooseHP();
            } else if (this.character.isColliding(endboss)) {
                this.characterLooseHP();
            }});
    }

    /**
     * this function lets the Character loose energy and updates the statusbar from the Character
     */
    characterLooseHP() {
        this.character.hit();
        this.statusbar.setPercentage(this.character.energy);
    }

    /**
     * this function makes collected objects disappear
     * 
     * @param {Object} object - the object is something collectable like a heart, coin or bottle
     */
    disappear(object) {
        object.x = -3000;
    }

    /**
     * this function collect the SalsaBottles
     */
    checkIfBottleCollected() {
        this.level.salsabottle.forEach((bottle, i) => {
            if (this.character.isColliding(bottle)) {
                this.level.salsabottle.splice(i, 1);
                this.bottleCounter++;
                this.bottlebar.setBottleAmount(this.bottleCounter);
                this.playCollectSound(this.bottle_collect_sound);
                this.disappear(this.level.salsabottle);
            }})
    }

    /**
     * this function is for throwing only the amount of Salsabottles which you´ve collected
     */
    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            if (this.bottleCounter > 0) {
                this.throwableObjects.push(bottle);
                this.bottleCounter--;
                this.bottlebar.setBottleAmount(this.bottleCounter);
                this.playBottleThrowSound();
            }}
    }

    /**
     * this function is for the sound from the thrown SalsaBottles
     */
    playBottleThrowSound() {
        this.throw_bottle_sound.volume = 0.7;
        this.throw_bottle_sound.playbackRate = 3;
        if (!soundOff) {
            this.throw_bottle_sound.play();
        }
    }

    /**
     * this function lets the Endboss get hit by the Salsabottles
     */
    checkCollisionBottleVSEndboss() {
        this.throwableObjects.forEach((bottle) => {
            let endboss = this.endboss;
            if (bottle.isColliding(endboss)) {
                bottle.hitEnemy = true;
                endboss.hit();
                this.endbossbar.setPercentage(endboss.energy);
            }})
    }

    /**
     * this function collect the coins
     */
    checkIfCoinCollected() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(i, 1); //damit die aus dem Array gelöscht werden und verschwinden können
                this.coinCounter++;
                this.coinbar.setCoinAmount(this.coinCounter);
                this.playCollectSound(this.coin_sound);
                this.disappear(this.level.coins);
            }});
    }

    /**
     * this function checks the collision between the Character and the heart and
     * if the Characters energy has to be increased or not
     */
    checkIfHeartCollected() {
        this.level.hearts.forEach((heart, i) => {
            if (this.character.isColliding(heart) && this.character.energy < 100) {
                this.collectHeart();
                this.increaseCharactersEnergy(i);
            } if (this.character.isColliding(heart)) {
                this.collectHeart();
            }});
    }

    /**
     * this function collects the heart
     * 
     * @param {number} i - is the index from the heart which is collected
     */
    collectHeart(i) {
        this.level.hearts.splice(i, 1); //damit die aus dem Array gelöscht werden und verschwinden können
        this.playCollectSound(this.power_up);
        this.power_up.volume = 0.2;
        this.disappear(this.level.hearts);
    }

    /**
     * this function increases the energy from the Character with the difference he lost when he´s hit
     */
    increaseCharactersEnergy() {
        this.character.energy += 100 - this.character.energy;
        console.log('Character energy is', this.character.energy);
        this.statusbar.setPercentage(this.character.energy);
    }

    /**
     * this function draws the objects and add them to the map
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbar);
        this.addToMap(this.endbossbar);
        this.addToMap(this.bottlebar);
        this.addToMap(this.coinbar);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.salsabottle);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.hearts);
        this.addToMap(this.character);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * This function adds a list of objects to a map. The function uses
     * the forEach method to iterate over each object in the list and then add it using the addToMap function.
     * 
     * @param {Object} objects - the MovableObjects that you want to add which are in an array
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * this Function adds Objects to the Map like the Character or the Endboss
     * 
     * @param {object} mo - this is the MovableObject that you want to add to the Map
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        mo.drawFrameOffset(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * This function can mirror Objects
     * 
     * @param {object} mo - this is the MovableObject that you want to mirror
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * This function resets the mirrored Objects
     * 
     * @param {object} mo - this is the MovableObject that you want flip back
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * This function checks whether an object collides with another object that has the properties
     * x, y, width and height. To do this, the x and y positions as well as the width and height of the object are compared.
     * 
     * @param {*} mo - is the MovableObject. It could be a bottel, heart, coin, Chicken, Character or Endboss
     * @returns true
     */
    isColliding(mo) {
        return this.x + this.width > mo.x &&
               this.y + this.height > mo.y &&
               this.x < mo.x &&
               this.y < mo.height
    }
}