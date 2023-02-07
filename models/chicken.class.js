class Chicken extends MovableObject {

    y = 350;
    width = 95;
    height = 75;
    energy = 5;
    CHICKEN_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    CHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    offset = {
        top: 4,
        bottom: 4,
        left: 4,
        right: 4,
    };

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.CHICKEN_WALKING);
        this.loadImages(this.CHICKEN_DEAD);
        this.x = 900 + Math.random() * 3200;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * Plays the Chicken and let them move
     */
    animate() {
        setStopableInterval(() => this.moveLeft(), 1000 / 60);
        setStopableInterval(() => this.playChicken(), 200);
    }

    /**
     * Plays Chicken dead, stopps moving and let them disappear or let them walk
     */
    playChicken() {
        if (this.isDead()) {
            this.speed = 0;
            this.playAnimation(this.CHICKEN_DEAD);
            this.disappearWhenIsDead();
        } else this.playAnimation(this.CHICKEN_WALKING);
    }
}

