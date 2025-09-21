
// movement

keys = {
    w: { pressed: false},
    a: { pressed: false},
    s: { pressed: false},
    d: { pressed: false}
}

window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    // up and down movement
    if(key === 'w' || key === 'arrowup'){ keys.w.pressed = true; }
    else if(key === 's' || key === 'arrowdown'){ keys.s.pressed = true; }

    // side to side movement
    if(key === 'a' || key === 'arrowleft'){ keys.a.pressed = true; player.sprite.direction = 0; }
    else if(key === 'd' || key === 'arrowright'){ keys.d.pressed = true; player.sprite.direction = 1; }

    // if (e.key === 'Tab') {
    //     e.preventDefault();
    //     document.querySelector('.content').classList.toggle('hidden');
    // }
    
});

window.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();

    switch (key){
        case 'w':{keys.w.pressed = false; break;}
        case 'a':{keys.a.pressed = false; break;}
        case 's':{keys.s.pressed = false; break;}
        case 'd':{keys.d.pressed = false; break;}
        case 'arrowup':{keys.w.pressed = false; break;}
        case 'arrowleft':{keys.a.pressed = false; break;}
        case 'arrowdown':{keys.s.pressed = false; break;}
        case 'arrowright':{keys.d.pressed = false; break;}
    }
});

let cameraOffset = { x: 0, y: 0 };
let mouseX = 0, mouseY = 0;
let worldX = 0, worldY = 0;
function movePlayer(){
    // move background + stagnant objects when bee moves
    // up and down movement
    if(keys.w.pressed){
        movables.forEach(movable => { movable.position.y += player.speed });
        cameraOffset.y -= player.speed;
    }
    else if(keys.s.pressed){
        movables.forEach(movable => { movable.position.y -= player.speed });
        cameraOffset.x += player.speed;
    }

    // side to side movement
    if(keys.a.pressed){
        movables.forEach(movable => { movable.position.x += player.speed });
        cameraOffset.y -= player.speed;
    }
    else if(keys.d.pressed){
        movables.forEach(movable => { movable.position.x -= player.speed });
        cameraOffset.x += player.speed;
    }

    //collecting items, removing image from canvas
    // for (let i = items.length - 1; i >= 0; i--) {
    //     const item = items[i];
    //     // if bee collides with item and has space to carry it
    //     if (onSprite(item) && player.sprite.space) {
    //         items.splice(i, 1);
    //         const indexInMovables = movables.indexOf(item);
    //         if (indexInMovables !== -1) {
    //             movables.splice(indexInMovables, 1);
    //         }
    //         // console.log(`${item.name} collected!`);
    //         player.inventory.addToInventory(item.name, item.quality);
    //     }
    // }
}

