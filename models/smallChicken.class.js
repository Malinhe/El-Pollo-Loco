class SmallChicken extends MovableObject {

    y = 375;
    width = 55;
    height = 45;
    energy = 5;
    CHICKEN_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    CHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    offset = {
        top: 4,
        bottom: 4,
        left: 4,
        right: 4,
    };

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.CHICKEN_WALKING);
        this.loadImages(this.CHICKEN_DEAD);
        this.x = 500 + Math.random() * 3000;
        this.speed = 0.1 + Math.random() * 0.5;
        this.animate();
    }

     /**
     * this function play the Chicken and let them move
     */
    animate() {
        setStopableInterval(() => this.moveLeft(), 1000 / 60);
        setStopableInterval(() => this.playAnimation(this.CHICKEN_WALKING), 200);
    }

     /**
     * this function lets the Chicken die
     */
    chickenDead() {
        setStopableInterval(() => this.playAnimation(this.CHICKEN_DEAD), 1000 / 60);
        this.disappearWhenIsDead();
    }
}