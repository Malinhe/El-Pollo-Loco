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

    energy = 400;
    world;
    endboss_alert_sound = new Audio('audio/big_chicken_alert.mp3');

    constructor() {
        super().loadImage(this.ENDBOSS_WALKING[0]);
        this.loadImages(this.ENDBOSS_WALKING);
        this.loadImages(this.ENDBOSS_HURT);
        this.loadImages(this.ENDBOSS_ALERT);
        this.loadImages(this.ENDBOSS_ATTACK);
        this.loadImages(this.ENDBOSS_DEAD);
        this.x = 3800;
        this.animate();
    }

    /**
     * this function reduces the energy from the Endboss and saves the moment when he was hit for the last time
     */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * this function plays the Endboss
     */
    animate() {
        setStopableInterval(() => {
            if (this.isDead()) {
                this.endTheGame();
            } else if (this.isHurt()) {
                this.playAnimation(this.ENDBOSS_HURT);
            } else if (this.energy < 400 && this.energy > 250) {
                this.playAnimation(this.ENDBOSS_WALKING);
                this.moveLeft();
            } else if (this.energy < 250) {
                this.playAnimation(this.ENDBOSS_ATTACK);
                this.moveFastLeft();
                this.endboss_alert_sound.play();
                if (soundOff) {
                    this.endboss_alert_sound.pause();
                }
            } else {
                this.playAnimation(this.ENDBOSS_ALERT);
            }
        }, 200);
    }

    /**
     * this function shows the screen that you have won and stops the game
     */
    endTheGame() {
        this.playAnimation(this.ENDBOSS_DEAD);
        this.endboss_alert_sound.pause();

        setTimeout(() => {
            this.endboss_sound.pause();
            console.log('sound stopped');
            // this.world.background_sound.pause();
            // this.world.chicken_clucking_sound.pause();
            
            youWon();
            stopGame();
        }, 500);
    }

    /**
     * this function lets the Endboss walk towards the Character
     */
    moveLeft() {
        this.x -= this.speed * 75;
    }

    /**
     * this function lets the Endboss attack
     */
    moveFastLeft() {
        this.x -= this.speed * 200;
    }
}