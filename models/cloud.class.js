class Cloud extends MovableObject {
    y = 10;
    width = 700;
    height = 450;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 900 + Math.random() * 2500;
        this.animate();
    }

    /**
     * Animates the clouds and let them move left
     */
    animate() {
        setStopableInterval(() => this.moveLeft(), 1000 / 60);
    }
}