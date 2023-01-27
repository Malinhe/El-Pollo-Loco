class CoinBar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setCoinAmount(0);
    }

    /**
    * this function sets the number of coins (coinAmount) to a given value. 
    * Then a variable "path" is created to hold the path to an image based on the value of coinAmount.
    * 
    * @param {Integer} coinAmount - the amount of collected Coins
    */
    setCoinAmount(coinAmount) {
        this.coinAmount = coinAmount;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
   * This function is responsible for getting the index of the image to use.
   * 
   * @returns an integer which is used to get the right image from the array
   */
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