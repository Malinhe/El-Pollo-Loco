class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;//Minus, weil das Bild ja nach links verschoben wird

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    //????????
    setWorld() {
        this.character.world = this;
    }


    draw() {
        //hiermit wird das Canvas gecleart, damit Pepe neu gezeichnet werden kann, sonst hätte man irgendwann 300x dasselbe Bild nur an anderer Stelle
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);

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
    addToMap(mo) {
        //Bild spiegeln
        if (mo.otherDirection) {
          this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}