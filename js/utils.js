
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
    // console.log(moveableBoundaries)
    // move background + stagnant objects when bee moves
    // up and down movement
    if(keys.w.pressed && !preventUp){
        movables.forEach(movable => { movable.position.y += player.speed });
        moveableBoundaries.forEach(coordinate => { coordinate[1] += player.speed });
        cameraOffset.y -= player.speed;
    }
    else if(keys.s.pressed && !preventDown){
        movables.forEach(movable => { movable.position.y -= player.speed });
        moveableBoundaries.forEach(coordinate => { coordinate[1] -= player.speed });
        cameraOffset.x += player.speed;
    }

    // side to side movement
    if(keys.a.pressed && !preventLeft){
        movables.forEach(movable => { movable.position.x += player.speed });
        moveableBoundaries.forEach(coordinate => { coordinate[0] += player.speed });
        cameraOffset.y -= player.speed;
    }
    else if(keys.d.pressed && !preventRight){
        movables.forEach(movable => { movable.position.x -= player.speed });
        moveableBoundaries.forEach(coordinate => { coordinate[0] -= player.speed });
        cameraOffset.x += player.speed;
    }
}

let preventUp = false;
let preventDown = false;
let preventLeft = false;
let preventRight = false;

// if bee is in a certain location in the canvas such as a garden 
function inGarden(gardenBounds){
    // console.log(gardenBounds)
    return (
        player.sprite.position.x + 32 >= gardenBounds[0] &&
        player.sprite.position.x <= gardenBounds[0] + gardenBounds[2] &&
        player.sprite.position.y <= gardenBounds[1] + gardenBounds[3] &&
        player.sprite.position.y + 32 >= gardenBounds[1]
    );
}

