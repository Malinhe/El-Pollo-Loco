class BackgroundObject extends MovableObject {

    width = 720;
    height = 400;
    constructor(imagePath, x) {
        super().loadImage(imagePath);
       
        this.x = x;
        this.y = 480 - this.height; //die Gesamthöhe des Canvas ist 480, unser Bild ist 400 hoch, also kann man die y-Koordinate einfach berechnen
    }
}