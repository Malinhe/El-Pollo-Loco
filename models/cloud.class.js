class Cloud extends MovableObject {
    //y, width und height außerhalb des Constructors, da die nicht dynamisch sind
    y = 20;
    width = 500;
    height = 250;

    constructor(){
        //ruft vom übergeordneten movableObject die loadImage() auf
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        
        this.x = Math.random() * 200;
        this.animate();  
    }

    animate() {
        setInterval(() => {
        this.x -= 0.15;
    }, 1000 / 60);
   }
}