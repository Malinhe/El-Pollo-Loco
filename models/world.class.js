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
        // this.level.coins.world = this;
    }

    /**
     * Function to check if movable objects are colliding
     * 
     * @param {object} mo - object that could be a bottle, character, endboss or chicken
     */
    run() {
        setInterval(() => {
            this.checkCollisionsWithEnemy();
            this.checkIfBottleCollected();
            this.checkThrowObjects();
            this.checkIfCoinCollected();
            this.checkCollisionBottleVSenemies();
        }, 100);
    }

    checkCollisionsWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY <0) {
                console.log('Jumped on', enemy);
                this.character.jump();
                enemy.chickenDead();
                this.chicken_dead_sound.play();
            } else if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.energy);
            }
        });
    }

    checkIfBottleCollected() {
        this.level.salsabottle.forEach((bottle, i) => {
            if (this.character.isColliding(bottle)) {
                this.level.salsabottle.splice(i, 1);
                this.bottleCounter++;
                this.bottlebar.setBottleAmount(this.bottleCounter);
                console.log('BottleCounter is', this.bottleCounter);
                this.playBottleCollectSound();
                this.bottleDisappearWhenCollected();
            }
        })
    }

    playBottleCollectSound() {
        this.bottle_collect_sound.volume = 0.2;
        this.bottle_collect_sound.play();
    }

    bottleDisappearWhenCollected() {
        this.level.salsabottle.x = -3000;
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
        this.throw_bottle_sound.play();
    }

    checkCollisionBottleVSenemies() {
        this.throwableObjects.forEach((bottle) => {

            this.level.enemies.forEach((enemy) => {
                let endboss = this.level.enemies[3];

                if (bottle.isColliding(enemy)) {
                    bottle.hitEnemy = true;
                } else if (bottle.isColliding(endboss)) {
                    // console.log('hit Endboss');
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
                this.level.coins.splice(i, 1); //damit die aus dem Array gel??scht werden und verschwinden k??nnen
                this.coinCounter++;
                this.coinbar.setCoinAmount(this.coinCounter);
                this.playCoinSound();
                this.coinDisappear();
            }
        });
    }

    playCoinSound() {
        this.coin_sound.volume = 0.2;
        this.coin_sound.play();
    }

    coinDisappear() {
        this.level.coins.x = -3000;
    }

    draw() {
        //hiermit wird das Canvas gecleart, damit Pepe neu gezeichnet werden kann, sonst h??tte man irgendwann 300x dasselbe Bild nur an anderer Stelle
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

    //diese funktion verk??rzt die Vorschleifen
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