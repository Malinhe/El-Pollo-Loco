class BottleBar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setBottleAmount(0);
    }

    /**
     * this function sets the number of bottles (bottleAmount) to a given value. 
     * Then a variable "path" is created to hold the path to an image based on the value of bottleAmount.
     * 
     * @param {Integer} bottleAmount - the amount of SalsaBottles
     */
    setBottleAmount(bottleAmount) {
        this.bottleAmount = bottleAmount;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * This function is responsible for getting the index of the image to use.
     * 
     * @returns an integer which is used to get the right image from the array
     */
    resolveImageIndex() {
        if (this.bottleAmount == 10) {
            return 5;
        } else if (this.bottleAmount >= 8) {
            return 4;
        } else if (this.bottleAmount >= 6) {
            return 3;
        } else if (this.bottleAmount >= 3) {
            return 2;
        } else if (this.bottleAmount > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}