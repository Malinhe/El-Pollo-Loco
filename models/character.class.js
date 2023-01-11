class Character extends MovableObject {
    y = 160;
    width = 170;
    height = 280;
    speed = 7;
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
        top: 100,
        bottom: 10,
        left: 35,
        right: 50,
    };

    world;
    walking_sound = new Audio('audio/walk.mp3');
    hit_sound = new Audio('audio/ayayay.mp3');
    endboss_sound = new Audio('audio/endboss_sound.mp3');

    constructor() {
        //ruft vom übergeordneten movableObject die loadImage() auf
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        // this.loadImage(this.GAME_OVER);
        this.applyGravity();
        this.animate();
    }

    //function to change the pictures from the Character, so he seems to walk
    animate() {

        //walking direction onkeydown
        setInterval(() => {
            this.walking_sound.pause();
            this.walking_sound.volume = 0.2;
            this.walking_sound.playbackRate = 2.5;

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }

            // if (this.x > 1780) {
            //     this.endboss_sound.volume = 0.5;
            //     // this.endboss_sound.playbackRate = 1;
            //     this.endboss_sound.play();
            // }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }

            if (this.x < 1780) {
                this.endboss_sound.volume = 0.5;
                // this.endboss_sound.playbackRate = 1;
                this.endboss_sound.pause();
            }

            //wenn key space true ist UND wir nicht (!) über dem Boden sind
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            //dead animation
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);

                setTimeout(() => {
                    this.gameOver();
                }, 500);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.hit_sound.play();
            }

            //jump animation
           else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {

                //walk animation
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);
    }

}