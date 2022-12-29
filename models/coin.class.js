class Coin extends MovableObject {

    offset = {
        top: 35,
        bottom: 35,
        left: 35,
        right: 35,
    };

    // world;
    
    constructor(){
        super().loadImage('img/8_coin/coin_1.png');

        this.x = 300 + Math.random() * 1400;
        this.y = 150 + Math.random() * 125;

}

}