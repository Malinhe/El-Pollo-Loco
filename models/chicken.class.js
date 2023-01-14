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

    chicken_clucking_sound = new Audio('audio/chicken_clucking.mp3');

    constructor() {
        //ruft vom übergeordneten movableObject die loadImage() auf
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.CHICKEN_WALKING);
        this.loadImages(this.CHICKEN_DEAD);


        //Math.random() generiert eine zufällige Zahle zwischen 0 und 1, deswegen *500,
        // damit die Chicken irgendwo zwischen 200 und 700px auf der x-Achse spawnen
        //dadurch spawnen die Chicken zufällig bei jedem Neuladen der Seite an einer anderen Stelle
        this.x = 900 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();

    }

    animate() {
         setStopableInterval(() => {
            this.moveLeft();
            // this.chicken_clucking_sound.volume = 0.2;
            // this.chicken_clucking_sound.playbackRate = 1;
            // this.chicken_clucking_sound.play();
        }, 1000 / 60);

         setStopableInterval(() => {
            this.playAnimation(this.CHICKEN_WALKING);
        }, 200);
    }

    chickenDead() {
         setStopableInterval(() => {
            this.playAnimation(this.CHICKEN_DEAD);
        }, 1000 / 60);

        this.deadChickenDisappear();
    }

    deadChickenDisappear() {
        setTimeout(() => {
            this.x = -3000;
        }, 400);
    }
}

