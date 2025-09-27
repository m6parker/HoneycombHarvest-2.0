class Item{
    constructor(name, size, type, src){
        this.name = name;
        this.size = size;
        this.type = type;
        this.src = src;
        this.quality = getRandomQuality();

        //create sprite
        const itemImage = new Image(size, size);
        itemImage.src = this.src;
        this.sprite = new Sprite(itemImage);

        items.push(this);
        
    }

    //world items
    createWorldItem(itemSprite){
        this.type = 'world';
        console.log(this)
    }

    //inventory items
    createInvItem(itemSprite){
        this.type = 'inventory';
        console.log(this)
    }

    // spawn radome
    
}