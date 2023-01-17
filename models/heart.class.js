class Heart extends MovableObject {
    width = 65;
    height = 55;

    HEART_IMAGES = [
        'img/7_statusbars/3_icons/icon_health.png'
    ];

    offset = {
        top: 15,
        bottom: 7,
        left: 12,
        right: 12,
    };
    
    constructor(){
        super().loadImage('img/7_statusbars/3_icons/icon_health.png');
        this.loadImages(this.HEART_IMAGES);
        this.x = 200 + Math.random() * 3000;
        this.y = 150 + Math.random() * 125;
}
}