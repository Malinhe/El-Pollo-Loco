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

    ENDBOSS_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    ENDBOSS_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
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
        this.loadImages(this.ENDBOSS_ALERT);
        this.loadImages(this.ENDBOSS_ATTACK);
        this.loadImages(this.ENDBOSS_DEAD);
        this.x = 3800; //wo der Endboss spawned
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
        // setStopableInterval(() => {
        //     if(this.energy < 100 && this.energy > 50)
        //     this.moveLeft();

        // }, 1000 / 60);

        setStopableInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.ENDBOSS_DEAD);

                setTimeout(() => {
                    youWon();
                    stopGame();
                }, 1000);

            } else if (this.isHurt()) {
                this.playAnimation(this.ENDBOSS_HURT);
            } else if (this.energy < 100 && this.energy > 60) {
                this.playAnimation(this.ENDBOSS_WALKING);
                 this.moveLeft();
            } else if (this.energy < 60){
                this.playAnimation(this.ENDBOSS_ATTACK);
                this.moveFastLeft();
            } 
            else {
                this.playAnimation(this.ENDBOSS_ALERT);
            }
        }, 200);
    }

    
    moveLeft() {
        this.x -= this.speed * 75;
    }


    moveFastLeft(){
        this.x -= this.speed * 200;
    }
}