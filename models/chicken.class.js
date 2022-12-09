class Chicken extends MovableObject {

    y = 375;
    width = 75;
    height = 50;
    IMAGES_WALKING = [
        'img\3_enemies_chicken\chicken_normal\1_walk\1_w.png',
        'img\3_enemies_chicken\chicken_normal\1_walk\2_w.png',
        'img\3_enemies_chicken\chicken_normal\1_walk\3_w.png'
    ];
    
    constructor(){
        //ruft vom übergeordneten movableObject die loadImage() auf
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);


                        //Math.random() generiert eine zufällige Zahle zwischen 0 und 1, deswegen *500,
                        // damit die Chicken irgendwo zwischen 200 und 700px auf der x-Achse spawnen
                        //dadurch spawnen die Chicken zufällig bei jedem Neuladen der Seite an einer anderen Stelle
        this.x = 200 + Math.random() * 500;
        this.animate();
    }

    animate() {

        setInterval(() => {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }, 100)
    }
}