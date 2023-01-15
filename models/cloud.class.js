class Cloud extends MovableObject {
    //y, width und height außerhalb des Constructors, da die nicht dynamisch sind
    y = 10;
    width = 700;
    height = 450;


    constructor() {
        //ruft vom übergeordneten movableObject die loadImage() auf
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = 900 + Math.random() * 2500;
        // this.x = Math.random() * 600;
        this.animate();
    }


    animate() {
        setStopableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }


}