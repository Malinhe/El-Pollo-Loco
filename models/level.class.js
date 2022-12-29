class Level {
    coins;
    salsabottle;
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;

    constructor(coins, salsabottle, enemies, clouds, backgroundObjects) {
        this.coins = coins;
        this.salsabottle = salsabottle;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}