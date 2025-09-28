class Building{
    constructor(name, size){
        this.name = name;
        this.size = size;
        this.shape = (name === 'hive') ? 'hexagon' : 'square';
        this.selected = false;
        
        this.src = `img/buildings/${name}.png`;
        const img = new Image();
        img.src = this.src;
        this.sprite = new Sprite(img);

        this.inventory = new Inventory(24);
        this.inventory.createInventorySlots(this.inventory.size, name, this.shape);
    }

    //select sprite
    select(){
        if(this.selected){
            hiveInvenotryContainer.classList.add('hidden');
            this.selected = false;
        }
        else{
            hiveInvenotryContainer.classList.remove('hidden');
            this.selected = true;
        }
        //todo: change image to selectedImage
    }

    hasSpace(){
        return this.inventory.size > this.inventory.items.length;
    }
}