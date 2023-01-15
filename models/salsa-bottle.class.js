class SalsaBottle extends MovableObject {

    width = 60;
    height = 75;
    offset = {
        top: 4,
        bottom: 4,
        left: 30,
        right: 15,
    };

    constructor(){
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 200 + Math.random() * 2800;
        this.y = 350 + Math.random() * 25;
}
}