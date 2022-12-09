class Character extends MovableObject {
   
    y = 190;
    height = 250;
    width = 150;
    constructor(){
        //ruft vom übergeordneten movableObject die loadImage() auf
        super().loadImage('/img/2_character_pepe/2_walk/W-21.png');
    }
    jump() {

    }
}