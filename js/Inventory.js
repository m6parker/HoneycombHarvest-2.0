class Inventory{
    constructor(size, shape='square'){
        this.size = size;
        this.shape = shape;
        this.items = [];
    

        // click each item in bee inventory to other inventories
        const slots = document.querySelectorAll('.beeSlot');
        slots.forEach(slot => {
            slot.addEventListener('click', ()=> {
                selectables.forEach(location => {
                    if(location.selected){
                        this.moveItem(slot, location);

                        // everytime an item is placed in the hive, check the quest status
                        // if(location === hiveSprite){
                        //     checkQuest();
                        // }
                    }
                });
            })
        });
    }

    // item from bee inventory to location inv
    moveItem(slot, location){
        for (const [index, item] of player.inventory.items.entries()) {
            if(slot.firstChild && item.src === slot.firstChild.src){
                if(location.hasSpace()){
                    player.inventory.items.splice(index, 1);
                    // ui
                    this.addItemToLocationInventory(item, location); // pass in location to reuse for other inv
                    slot.firstChild.remove()
                    slot.classList.add('empty');
                }else{console.log('inventory full!')}
                break;
            }
        }
    }

    //individual items into open invenory
    addItemToLocationInventory(item, location){
        let slots, inventory;
        switch(location){
            case hive: { 
                slots = document.querySelectorAll('.hiveSlot');
                break;
            }
            // case greenhouseSprite: {
            //     slots = document.querySelectorAll('.greenhouseSlot'); 
            //     inventory = greenhouseInvenotry;
            //     break; 
            // }
            // case boxSprite: {
            //     slots = document.querySelectorAll('.boxSlot');
            //     inventory = boxInventory
            //     break;
            // }
            // case 'honeycombInv': {
            //     slots = document.querySelectorAll('.honeycombSlot');
            //     inventory = honeycombInventory
            //     break;
            // }
            default: { // put in bee
                slots = document.querySelectorAll('.beeSlot'); 
                inventory = player.inventory.items;
            }
        }
        
        let itemImage = document.createElement('img');
        item.className = `inv-${item.name}`;
        itemImage.src = item.src
        for(let i = 0; i < slots.length; i++){
            if(slots[i].classList.contains('empty')){
                slots[i].appendChild(itemImage);
                slots[i].classList.remove('empty');
                location.inventory.items.push(Object.assign({}, {name:item.name, src:item.src, quality:item.quality}));
                break;
            }
        };
    }

    // pace in inventory
    addToInventory(itemType, itemQuality){
        // console.log(player.inventory)
        const slots = document.querySelectorAll('.beeSlot');
        const item = document.createElement('img');
        item.src = `img/items/${itemType}.png`;
        item.className = `inv-${itemType}`;
        for(let i = 0; i < player.inventory.size; i++){
            if(slots[i].classList.contains('empty')){
                slots[i].appendChild(item);
                slots[i].classList.remove('empty');
                player.inventory.items.push(Object.assign({}, {name:itemType, src:item.src, quality:itemQuality}));
                break;
            }
        };
    }

    // creates all inventory grids ui
    createInventorySlots(size, location, shape){
        for(let i = 0; i < size; i++){
            const slot = document.createElement('div');
            slot.className = `${location}Slot`;
            slot.classList.add('empty');
            if(shape==='hexagon'){slot.classList.add('hexagon')}
            document.querySelector(`.${location}-inventory`).appendChild(slot);
        }
    }
}