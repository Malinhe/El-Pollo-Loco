class EndbossBar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];

    percentage = 100;
    energy = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 480;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(400);
    }

    /**
    * this function sets the percentage to a given value. 
    * Then a variable "path" is created to hold the path to an image based on the value of the HP percentage.
    * 
    * @param {Integer} percentage - the amount of of the HP from the Endboss
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

   /**
   * This function is responsible for getting the index of the image to use.
   * 
   * @returns an integer which is used to get the right image from the array
   */
    resolveImageIndex() {
        if (this.percentage == 400) return 5;
         else if (this.percentage > 300) return 4;   
         else if (this.percentage > 200) return 3;
         else if (this.percentage > 100) return 2;    
         else if (this.percentage > 0) return 1;   
         else return 0;  
    }
}