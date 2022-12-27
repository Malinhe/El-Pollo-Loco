class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;//Minus, weil das Bild ja nach links verschoben wird
    statusbar = new Statusbar();
    bottlebar = new Bottlebar();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
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

    //forEach Funktion wird jede Sekunde (oder was halt im Intervall angegeben) für alle Gegner ausgeführt, wenn 5 Gegner dann 5x ausgeführt
    checkCollisions() {
        setInterval(() => {
            //um alle Gegner zu bekommen this.level.enemies //forEach um für jeden einzelnen Gegner zu kontrollieren, ob diese mit dem Character kollidieren
            this.level.enemies.forEach( (enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusbar.setPercentage(this.character.energy);
                }
            });
        }, 1000);
    }


    draw() {
        //hiermit wird das Canvas gecleart, damit Pepe neu gezeichnet werden kann, sonst hätte man irgendwann 300x dasselbe Bild nur an anderer Stelle
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbar);
        this.addToMap(this.bottlebar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        

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
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

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