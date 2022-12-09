class Character extends MovableObject {
      
      y = 155;
      width = 150;
      height = 280;

    constructor(){
        //ruft vom übergeordneten movableObject die loadImage() auf
        super().loadImage('/img/2_character_pepe/2_walk/W-21.png');
    }
    jump() {

    }
}