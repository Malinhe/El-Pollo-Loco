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
    
    constructor(x, y){
        super().loadImage('img/7_statusbars/3_icons/icon_health.png');
        this.loadImages(this.HEART_IMAGES);
        this.x = x;
        this.y = y;
}
}