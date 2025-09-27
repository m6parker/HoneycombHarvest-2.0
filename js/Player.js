class Player{
    constructor(name, speed, health, strength, level){
        this.name = name;
        this.speed = speed;
        this.health = health;
        this.strength = strength;
        this.level = level;
        this.width = 16;
        this.height = 16;
        this.position= {
            x: canvas.width/2,
            y: canvas.height/3.5
        }

        this.inventory = new Inventory(15);

        const beeImage = new Image();
        beeImage.src = 'img/b1.png';
        this.sprite = new Sprite(beeImage);

        console.log('created player.', this);
    }
}