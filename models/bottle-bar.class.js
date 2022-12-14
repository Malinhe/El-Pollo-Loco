class BottleBar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png' //Bild Nummer 5
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

    setBottleAmount(bottleAmount) {
        this.bottleAmount = bottleAmount;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.bottleAmount == 5) {
            return 5;
        } else if (this.bottleAmount == 4) {
            return 4;
        } else if (this.bottleAmount == 3) {
            return 3;
        } else if (this.bottleAmount == 2) {
            return 2;
        } else if (this.bottleAmount == 1) {
            return 1;
        } else {
            return 0;
        }
    }
}