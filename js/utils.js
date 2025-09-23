
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
// move background + stagnant objects when bee moves
function movePlayer(){
    // up and down movement
    if(keys.w.pressed && !preventUp){
        movables.forEach(movable => { movable.position.y += player.speed });
        moveableBoundaries.forEach(coordinate => { coordinate[1] += player.speed });
        cameraOffset.y -= player.speed;
        preventDown = false;
    }
    else if(keys.s.pressed && !preventDown){
        movables.forEach(movable => { movable.position.y -= player.speed });
        moveableBoundaries.forEach(coordinate => { coordinate[1] -= player.speed });
        cameraOffset.y += player.speed;
        preventUp = false;
    }

    // side to side movement
    if(keys.a.pressed && !preventLeft){
        movables.forEach(movable => { movable.position.x += player.speed });
        moveableBoundaries.forEach(coordinate => { coordinate[0] += player.speed });
        cameraOffset.x -= player.speed;
        preventRight = false;
    }
    else if(keys.d.pressed && !preventRight){
        movables.forEach(movable => { movable.position.x -= player.speed });
        moveableBoundaries.forEach(coordinate => { coordinate[0] -= player.speed });
        cameraOffset.x += player.speed;
        preventLeft = false;
    }
}

let preventUp = false;
let preventDown = false;
let preventLeft = false;
let preventRight = false;
function checkBoundaries(boundaries){
    if(player.sprite.position.x + 32 < boundaries[0]){
        //prevent movement left
        preventLeft = true;
    }
    if(player.sprite.position.x > boundaries[0] + boundaries[2]){
        //prevent movement right
        preventRight = true;
    }
    if(player.sprite.position.y > boundaries[1] + boundaries[3]){
        //prevent movement down
        preventDown = true;
    }
    if(player.sprite.position.y + 32 < boundaries[1]){
        //prevent movement up
        preventUp = true;
    }
}


// handle collisions, restricted areas internal to the map
function keepOut(restrictedArea) {
    // restrictedArea: [x, y, width, height]
    preventUp = false;
    preventDown = false;
    preventLeft = false;
    preventRight = false;

    // check if bee is outside the restricted area
    const playerLeft = player.sprite.position.x;
    const playerRight = player.sprite.position.x + 32;
    const playerTop = player.sprite.position.y;
    const playerBottom = player.sprite.position.y + 32;

    const areaLeft = restrictedArea[0];
    const areaRight = restrictedArea[0] + restrictedArea[2];
    const areaTop = restrictedArea[1];
    const areaBottom = restrictedArea[1] + restrictedArea[3];

    if (playerRight > areaLeft && playerRight <= areaRight && playerBottom > areaTop && playerTop < areaBottom) {
        preventRight = true;
        preventUp = false;
        preventDown = false;
    }
    if (playerLeft >= areaLeft && playerLeft < areaRight && playerBottom > areaTop && playerTop < areaBottom) {
        preventLeft = true;
        preventUp = false;
        preventDown = false;
    }
    if (playerBottom > areaTop && playerBottom <= areaBottom && playerRight > areaLeft && playerLeft < areaRight) {
        preventDown = true;
        preventLeft = false;
        preventRight = false;
    }
    if (playerTop >= areaTop && playerTop < areaBottom && playerRight > areaLeft && playerLeft < areaRight) {
        preventUp = true;
        preventLeft = false;
        preventRight = false;
    }
}


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

