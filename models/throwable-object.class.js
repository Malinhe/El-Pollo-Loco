class ThrowableObject extends MovableObject {
    width = 50;
    height = 75;
    hitEnemy = false;
    bottle_break_sound = new Audio('audio/bottle-break.mp3');

    BOTTLE_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y) {
        super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.loadImages(this.BOTTLE_ROTATE);
        this.loadImages(this.BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.throw();
        this.animate();
    }

    /**
     * Simulates gravity for the thrown SalsaBottles
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        setStopableInterval(() => {
            this.x += 10;
        }, 25);
    }

    /**
     * Animates the SalsaBottles. When they are thrown they will rotate, if they hit the Endboss they will splash
     */
    animate() {
        setStopableInterval(() => {
            if (this.hitEnemy) {
                this.playAnimation(this.BOTTLE_SPLASH);
                this.splashedBottleDisappear();
                this.hitEnemy = false;
                if (!soundOff) {
                    this.bottle_break_sound.play();
                }
            } else {
                this.playAnimation(this.BOTTLE_ROTATE);
            }
        }, 100);
    }

    /**
     * Is used to let the splashed thrown SalsaBottle disappear
     */
    splashedBottleDisappear() {
        setTimeout(() => this.x = -3000, 300);
    }
}