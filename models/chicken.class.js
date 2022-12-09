class Chicken extends MovableObject {

    y = 390;
    height = 50;
    width = 75;

    constructor(){
        //ruft vom übergeordneten movableObject die loadImage() auf
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

                        //Math.random() generiert eine zufällige Zahle zwischen 0 und 1, deswegen *500,
                        // damit die Chicken irgendwo zwischen 200 und 700px auf der x-Achse spawnen
                        //dadurch spawnen die Chicken zufällig bei jedem Neuladen der Seite an einer anderen Stelle
        this.x = 200 + Math.random() * 500;
    }

}