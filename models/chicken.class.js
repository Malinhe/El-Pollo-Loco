class Chicken extends MovableObject {

    //this.x + 95
//425 y + height

    y = 350;
    width = 95;
    height = 75;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    offset = {
        top: 4,
        bottom: 4,
        left: 4,
        right: 4,
    };
    
    chicken_clucking_sound = new Audio('audio/chicken_clucking.mp3');

    constructor(){
        //ruft vom übergeordneten movableObject die loadImage() auf
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);


                        //Math.random() generiert eine zufällige Zahle zwischen 0 und 1, deswegen *500,
                        // damit die Chicken irgendwo zwischen 200 und 700px auf der x-Achse spawnen
                        //dadurch spawnen die Chicken zufällig bei jedem Neuladen der Seite an einer anderen Stelle
        this.x = 500 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5; 
        this.animate();
        
    }


     //function to change the pictures from the Chickens, so they seem to walk
    animate() {
        
        setInterval(() => {
            this.moveLeft();
            // this.chicken_clucking_sound.volume = 0.2;
            // this.chicken_clucking_sound.playbackRate = 1;
            // this.chicken_clucking_sound.play();
        }, 1000 / 60);
        
       

        setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
    }, 200)
    }

   
}