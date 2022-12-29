class Coin extends MovableObject {

    offset = {
        top: 60,
        bottom: 60,
        left: 60,
        right: 60,
    };

    world;

    constructor(){
        super().loadImage('img/8_coin/coin_1.png');

        this.x = 300 + Math.random() * 1400;
        this.y = 150 + Math.random() * 125;

}


}