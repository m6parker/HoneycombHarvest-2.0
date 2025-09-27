class Inventory{
    constructor(size, items=[], shape='square'){
        this.size = size;
        this.shape = shape;
        this.items = items;
    

        // click each item in bee inventory to other inventories
        // const slots = document.querySelectorAll('.beeSlot');
        // slots.forEach(slot => {
        //     slot.addEventListener('click', ()=> {
        //         selectables.forEach(location => {
        //             if(location.selected){
        //                 this.moveItem(slot, location);

        //                 // everytime an item is placed in the hive, check the quest status
        //                 if(location === hiveSprite){
        //                     checkQuest();
        //                 }
        //             }
        //         });
        //     })
        // });
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