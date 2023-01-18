class SalsaBottle extends MovableObject {

    width = 70;
    height = 85;
    offset = {
        top: 4,
        bottom: 4,
        left: 30,
        right: 15,
    };

    constructor(x, y){
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = x;
        this.y = y;
}
}