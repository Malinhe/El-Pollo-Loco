class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;//Minus, weil das Bild ja nach links verschoben wird
    statusbar = new StatusBar();
    bottlebar = new BottleBar();
    endbossbar = new EndbossBar();
    bottleCounter = 0;
    coinCounter = 0;
    coinbar = new CoinBar();
    coin_sound = new Audio('audio/coin.mp3');
    bottle_collect_sound = new Audio('audio/bottle-collect.mp3');
    throwableObjects = [];
    throw_bottle_sound = new Audio('audio/throw-bottle.mp3');
    chicken_dead_sound = new Audio('audio/chicken-dead.mp3');
    power_up = new Audio('audio/powerUp.mp3');
    background_sound = new Audio('audio/pepe-bg-sound.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    //????????
    setWorld() {
        this.character.world = this;
    }

    /**
     * Function to check if movable objects are colliding
     * 
     * @param {object} mo - object that could be a bottle, character, endboss or chicken
     */
    run() {
        setStopableInterval(() => {
            this.background_sound.play();
            this.background_sound.volume = 0.2;
            this.checkCollisionsWithEnemy();
            this.checkIfBottleCollected();
            this.checkThrowObjects();
            this.checkIfCoinCollected();
            this.checkCollisionBottleVSenemies();
            this.checkIfHeartCollected();
        }, 100);
    }

    playCollectSound(sound, volume = 0.2) {
        sound.volume = volume;
        if (!soundOff) {
            sound.play();
        }
    }

    
    characterJumps() {
        return this.character.isAboveGround() && this.character.speedY < 0
    }

    characterDoesNotJump() {
        return !this.character.isAboveGround()
    }

    checkCollisionsWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.characterJumps()) {
                this.character.jump();
                enemy.chickenDead();
                if (!soundOff) {
                    this.chicken_dead_sound.play();
                }
            } else if (this.character.isColliding(enemy) && this.characterDoesNotJump()) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.energy);
            }
        });
    }


    /**
     * this function makes collected objects disappear
     * 
     * @param {Object} object - the object is something collectable like a heart, coin or bottle
     */
    disappear(object) {
        object.x = -3000;
    }

    checkIfBottleCollected() {
        this.level.salsabottle.forEach((bottle, i) => {
            if (this.character.isColliding(bottle)) {
                this.level.salsabottle.splice(i, 1);
                this.bottleCounter++;
                this.bottlebar.setBottleAmount(this.bottleCounter);
                console.log('BottleCounter is', this.bottleCounter);
                this.playCollectSound(this.bottle_collect_sound);
                this.disappear(this.level.salsabottle);
            }
        })
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            if (this.bottleCounter > 0) {
                this.throwableObjects.push(bottle);
                this.bottleCounter--;
                this.bottlebar.setBottleAmount(this.bottleCounter);
                console.log('BottleCounter is', this.bottleCounter);
                this.playBottleThrowSound();
            }
        }
    }

    playBottleThrowSound() {
        this.throw_bottle_sound.volume = 0.2;
        this.throw_bottle_sound.playbackRate = 3;
        if (!soundOff) {
            this.throw_bottle_sound.play();
        }
    }

    checkCollisionBottleVSenemies() {
        this.throwableObjects.forEach((bottle) => {

            this.level.enemies.forEach((enemy) => {
                let endboss = this.level.enemies[11];

                if (bottle.isColliding(enemy)) {
                    bottle.hitEnemy = true;
                } else if (bottle.isColliding(endboss)) {
                    console.log('hit Endboss');
                    endboss.hit();
                    console.log('Endboss energy is', endboss.energy);
                    this.endbossbar.setPercentage(endboss.energy);
                }
            })
        })
    }

    checkIfCoinCollected() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(i, 1); //damit die aus dem Array gelöscht werden und verschwinden können
                this.coinCounter++;
                this.coinbar.setCoinAmount(this.coinCounter);
                this.playCollectSound(this.coin_sound);
                this.disappear(this.level.coins);
            }
        });
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
                console.log('Heart collected');

            }
        });
    }

    /**
     * this function collects the heart
     * 
     * @param {integer} i - is the index from the heart which is collected
     */
    collectHeart(i) {
        this.level.hearts.splice(i, 1); //damit die aus dem Array gelöscht werden und verschwinden können
        this.playCollectSound(this.power_up);
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

    draw() {
        //hiermit wird das Canvas gecleart, damit Pepe neu gezeichnet werden kann, sonst hätte man irgendwann 300x dasselbe Bild nur an anderer Stelle
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
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);


        this.ctx.translate(-this.camera_x, 0);

        //der Variable self wird das this zugewiesen, weil das in der requestAnimationFrame nicht benutzt werden kann
        //Draw() wird immerwieder aufgerufen durch requestAnimationFrame
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    //diese funktion verkürzt die Vorschleifen
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    //parameter mo stands for MovableObject
    //hiermit wird das Bild geladen
    /**
     * With this Function yua add Objects to the Map
     * 
     * @param {object} mo - this is the MovableObject that you want to add to the Map
     */
    addToMap(mo) {
        //Bild spiegeln
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        //warum mo.draw und this.ctx?
        //mo = movableObject, draw ist die Function die in MovableObject Class ist(oder gewesen, ist nun in drawableobjects), wir greifen mit mo.draw auf die Funktion zu
        //this.ctx weil wir oben in Zeile 5 ctx; als Variable haben
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        mo.drawFrameOffset(this.ctx);

        // mo.drawPosition(this.ctx);

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

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.height
    }
}