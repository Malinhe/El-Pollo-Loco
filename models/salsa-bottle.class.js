class SalsaBottle extends MovableObject {

    width = 75;
    height = 100;
    offset = {
        top: 4,
        bottom: 4,
        left: 30,
        right: 30,
    };

    constructor(){
        super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');

        this.x = 300 + Math.random() * 1400;

}
}