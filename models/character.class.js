class Character extends MovableObject {
    y = 150;
    width = 160;
    height = 290;
    speed = 6;


    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    offset = {
        top: 130,
        bottom: 5,
        left: 35,
        right: 50,
    };

    world;
    walking_sound = new Audio('audio/walk.mp3');
    hit_sound = new Audio('audio/ayayay.mp3');
    // endboss_sound = new Audio('audio/endboss_sound.mp3');

    constructor() {
        //ruft vom übergeordneten movableObject die loadImage() auf
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }

    //function to change the pictures from the Character, so he seems to walk
    animate() {

        //walking direction onkeydown
        setStopableInterval(() => {
            this.walking_sound.pause();
            this.walking_sound.volume = 0.2;
            this.walking_sound.playbackRate = 2.5;

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                if (!soundOff) {
                    this.walking_sound.play();
                } else if (soundOff) {
                    this.walking_sound.pause();
                }
            }
            //wenn man das oben mit in die Abfrage packt, dann läuft der Character nicht mehr, wenn man es hier macht dann is der Sound immer aus

            if (this.x > 3250) {
                background_sound.pause();
                endboss_sound.volume = 0.2;
                endboss_sound.playbackRate = 1.2;
                if (!soundOff) {
                    endboss_sound.play();
                } else if (soundOff) {
                    endboss_sound.pause();
                }
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                if (!soundOff) {
                    this.walking_sound.play();
                } else if (soundOff) {
                    this.walking_sound.pause();
                }
            }

            //wenn key space true ist UND wir nicht (!) über dem Boden sind
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setStopableInterval(() => {
            //dead animation
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout(() => {
                    youLost();
                    stopGame();
                    

                }, 500);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                if (!soundOff) {
                    this.hit_sound.play();
                } else if (soundOff) {
                    this.hit_sound.pause();
                }
            }

            else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.stayLong()) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 200);

    }

    stayLong() {
        let timepassed = new Date().getTime() - lastMoved;
        timepassed = timepassed / 1000;
        return timepassed > 5;
    }
}