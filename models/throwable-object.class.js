class ThrowableObject extends MovableObject {
    width = 50;
    height = 75;
    collectedBottles = [];
    bottles = 0;
    

    constructor (x, y) {
        super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');

        // this.x = 150 + Math.random() * 1200;
        // this.y = 50 + Math.random() * 1200;
        this.x = x;
        this.y = y;
        this.throw();

        
    }

    // collectBottle() {
    //     this.collectedBottles.push;
    //     this.bottles += 20;
    //     console.log('bottle collected');
    // }

    throw() {
        this.speedY = 30;
        this.applyGravity();

        setInterval( () => {
            this.x += 10;
        }, 25);
    }
}