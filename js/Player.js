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
            y: canvas.height/2.5
        }

        this.inventory = new Inventory(15);
        this.inventory.createInventorySlots(this.inventory.size, 'bee');

        const beeImage = new Image();
        beeImage.src = 'img/b1.png';
        this.sprite = new Sprite(beeImage);
    }

    hasSpace(){
        return this.inventory.size > this.inventory.items.length;
    }
}