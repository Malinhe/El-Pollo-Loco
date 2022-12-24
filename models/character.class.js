class Character extends MovableObject {
    //290 bei collision x + width
    //365 y + height
    y = 85;
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

    world;
    walking_sound = new Audio('audio/walk.mp3');
    endboss_sound = new Audio('audio/endboss_sound.mp3');

    constructor() {
        //ruft vom übergeordneten movableObject die loadImage() auf
        super().loadImage('/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
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

            if (this.x > 1780) {
                this.endboss_sound.volume = 0.5;
                // this.endboss_sound.playbackRate = 1;
                this.endboss_sound.play();
            }

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

            //wenn key up true ist UND wir nicht (!) über dem Boden sind
            if (this.world.keyboard.SPACE && !this.isAboveGorund()) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {

            //jump animation
            if (this.isAboveGorund()) {
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