class StatusBar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png' //Bild Nummer 5
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
   * Sets the percentage to a given value. 
   * Then a variable "path" is created to hold the path to an image based on the value of the HP percentage.
   * 
   * @param {Integer} percentage - the amount of of the HP from the Character
   */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

   /**
   * Is responsible for getting the index of the image to use.
   * 
   * @returns an integer which is used to get the right image from the array
   */
    resolveImageIndex() {
        if (this.percentage >= 100) return 5;   
         else if (this.percentage > 80) return 4;   
         else if (this.percentage > 60) return 3;
         else if (this.percentage > 40) return 2;
         else if (this.percentage > 0) return 1;
         else return 0;   
    }
}