class Level {
    hearts;
    coins;
    salsabottle;
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 3690;

    constructor(hearts, coins, salsabottle, enemies, clouds, backgroundObjects) {
        this.hearts = hearts;
        this.coins = coins;
        this.salsabottle = salsabottle;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}