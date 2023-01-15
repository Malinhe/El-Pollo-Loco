class Endboss extends MovableObject {

    width = 360;
    height = 490;
    y = -30;

    ENDBOSS_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    ENDBOSS_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    ENDBOSS_ANGRY = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    ENDBOSS_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    offset = {
        top: 130,
        bottom: 20,
        left: 50,
        right: 50,
    };

    constructor() {
        super().loadImage(this.ENDBOSS_WALKING[0]);
        this.loadImages(this.ENDBOSS_WALKING);
        this.loadImages(this.ENDBOSS_HURT);
        this.loadImages(this.ENDBOSS_ANGRY);
        this.loadImages(this.ENDBOSS_DEAD);
        this.x = 4000; //wo der Endboss spawned
        this.animate();
    }

    hit() {
        this.energy -= 0.75;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    animate() {
        setStopableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setStopableInterval(() => {
            //dead animation
            if (this.isDead()) {
                this.playAnimation(this.ENDBOSS_DEAD);

                setTimeout(() => {
                stopGame();
            }, 1000);
            
            } else if (this.isHurt()) {
                this.playAnimation(this.ENDBOSS_HURT);
            }
            //klappt so nicht
            // else if (this.energy < 95) {
            //     this.playAnimation(this.ENDBOSS_ANGRY);
            // }
            else {
                this.playAnimation(this.ENDBOSS_WALKING);
            }
        }, 200)
    }
}