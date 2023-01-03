class ThrowableObject extends MovableObject {
    width = 50;
    height = 75;
    hitEnemy = false;
    bottle_break_sound = new Audio('audio/bottle-break.mp3');

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];


    constructor(x, y) {
        super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.throw();
        this.animate();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();

        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    animate() {
        setInterval(() => {
            if (this.hitEnemy) {
                this.playAnimation(this.IMAGES_SPLASH);
                this.bottle_break_sound.play();

                setTimeout(() => {
                    this.x = -3000;
                }, 300);

                this.hitEnemy = false;
            }
        }, 200);
    }

}