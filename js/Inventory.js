class Inventory{
    constructor(size, items=[], shape='square'){
        this.size = size;
        this.shape = shape;
        this.items = items;
    }

    // pace in inventory
    addToInventory(itemType, itemQuality){
        console.log(player.inventory)
        // const slots = document.querySelectorAll('.beeSlot');
        // const item = document.createElement('img');
        // item.src = `img/${itemType}.png`;
        // item.className = `inv-${itemType}`;
        for(let i = 0; i < 3; i++){
            // if(slots[i].classList.contains('empty')){
            //     slots[i].appendChild(item);
            //     slots[i].classList.remove('empty');
                player.inventory.items.push(Object.assign({}, {name:itemType, src:item.src, quality:itemQuality}));
                break;
            // }
        };
    }
}