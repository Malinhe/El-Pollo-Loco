class SalsaBottle extends MovableObject {

    offset = {
        top: 4,
        bottom: 4,
        left: 60,
        right: 60,
    };

    constructor(){
        super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');

        this.x = 300 + Math.random() * 1400;

}
}