class CoinBar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png' //Bild Nummer 5
    ];

    // coinAmount = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setCoinAmount(0);
    }

    setCoinAmount(coinAmount) {
        this.coinAmount = coinAmount;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    
    resolveImageIndex() {
        if (this.coinAmount == 10) {
            return 5;
        } else if (this.coinAmount >= 8) {
            return 4;
        } else if (this.coinAmount >= 6) {
            return 3;
        } else if (this.coinAmount >= 3) {
            return 2;
        } else if (this.coinAmount > 0) {
            return 1;
        } else {
            return 0;
        }
    }

}