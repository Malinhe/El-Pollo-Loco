class Coin extends MovableObject {

    COIN_IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    offset = {
        top: 35,
        bottom: 35,
        left: 35,
        right: 35,
    };
    
    constructor(){
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.COIN_IMAGES);
        this.x = 200 + Math.random() * 2000;
        this.y = 150 + Math.random() * 125;
        this.animate();
}

animate() {
    setInterval(() => {
        this.playAnimation(this.COIN_IMAGES);
    }, 200);
}

}