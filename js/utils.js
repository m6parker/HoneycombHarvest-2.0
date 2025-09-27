
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

    if (e.key === 'Tab') {
        e.preventDefault();
        openTab();
    }
    
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
        hideAll()
        preventDown = false;
    }
    else if(keys.s.pressed && !preventDown){
        movables.forEach(movable => { movable.position.y -= player.speed });
        moveableBoundaries.forEach(coordinate => { coordinate[1] -= player.speed });
        cameraOffset.y += player.speed;
        hideAll()
        preventUp = false;
    }

    // side to side movement
    if(keys.a.pressed && !preventLeft){
        movables.forEach(movable => { movable.position.x += player.speed });
        moveableBoundaries.forEach(coordinate => { coordinate[0] += player.speed });
        cameraOffset.x -= player.speed;
        hideAll()
        preventRight = false;
    }
    else if(keys.d.pressed && !preventRight){
        movables.forEach(movable => { movable.position.x -= player.speed });
        moveableBoundaries.forEach(coordinate => { coordinate[0] -= player.speed });
        cameraOffset.x += player.speed;
        hideAll()
        preventLeft = false;
    }

    //collecting items, removing image from canvas
    for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        // if bee collides with item and has space to carry it
        if (onSprite(item)){
            if(player.hasSpace()){
                items.splice(i, 1);
                const indexInMovables = movables.indexOf(item);
                if (indexInMovables !== -1) {
                    movables.splice(indexInMovables, 1);
                }
                // console.log(`${item.name} collected!`);
                player.inventory.addToInventory(item.name, item.quality);
            }else{
                console.log('inventory full!')
            }
        }
    }
}

let preventUp = false;
let preventDown = false;
let preventLeft = false;
let preventRight = false;
function checkBoundaries(boundaries){
    if(player.position.x + 32 < boundaries[0]){
        //prevent movement left
        preventLeft = true;
    }
    if(player.position.x > boundaries[0] + boundaries[2]){
        //prevent movement right
        preventRight = true;
    }
    if(player.position.y > boundaries[1] + boundaries[3]){
        //prevent movement down
        preventDown = true;
    }
    if(player.position.y + 32 < boundaries[1]){
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
    const playerLeft = player.position.x;
    const playerRight = player.position.x + 32;
    const playerTop = player.position.y;
    const playerBottom = player.position.y + 32;

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
        player.position.x + 32 >= gardenBounds[0] &&
        player.position.x <= gardenBounds[0] + gardenBounds[2] &&
        player.position.y <= gardenBounds[1] + gardenBounds[3] &&
        player.position.y + 32 >= gardenBounds[1]
    );
}

// if bee is over another sprite such as the hive or an item
function onSprite(sprite){
    return (
        player.position.x + player.width >= sprite.position.x  &&
        player.position.x <= sprite.position.x + sprite.size   &&
        player.position.y <= sprite.position.y + sprite.size   &&
        player.position.y + player.height >= sprite.position.y 
    );
}

const tooltip = document.querySelector('.tooltip');
function hideAll(){
    tooltip.classList.add('hidden');
}

// ------------------ items -----------------------------

function getRandomQuality(){
    return parseFloat(Math.random().toFixed(2));
}

const items = [];
function spawnItems(itemName, quantity, location){
    for (let i = 0; i < quantity; i++) {
        item = new Item(itemName, 16, 'world', `img/items/${itemName}.png`);
        const x = location[0] + Math.random() * (location[2] - 30);
        const y = location[1] + Math.random() * (location[3] - 30);
        item.position = {x, y}
    }
}


//---------------- player menu -------------------------------

// switch between tabs for each category type
function openTab(event=null, name=null) {
    const tabContents = document.getElementsByClassName("tab-content");
    const tabButtons = document.getElementsByClassName("tab-button");
    // show just the inventory when using tab button
    let currentTarget = !event ? document.querySelector('#inventory-button') : event.currentTarget;
    let tabName = !name ? 'bee-inventory' : name;

    for (let i = 0; i < tabContents.length; i++) {
        if(currentTarget.classList.contains('selected')){
            tabContents[i].style.display = "none";
            currentTarget.classList.remove('selected');
            document.querySelector('.content').classList.add('hidden');
            document.querySelector('.inv-img').src = 'img/menu/inv_closed.png';
            document.querySelector('.stats-img').src = 'img/menu/stats_closed.png';
            document.querySelector('.quests-img').src = 'img/menu/quests_closed.png';
            return;
        }
        
        // hide all elements with tab-content
        tabContents[i].style.display = "none";
    }
    
    // remove all selected buttons
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(" selected", "");
    }
    
    // show current tab, add selected to button that opened the tab
    document.getElementById(tabName).style.display = "block";
    document.querySelector('.content').classList.remove('hidden');
    currentTarget.className += " selected";

    if(tabName === 'bee-inventory'){
        document.querySelector('.inv-img').src = 'img/menu/inv_open.png';
    }else if(tabName === 'stats'){
        document.querySelector('.stats-img').src = 'img/menu/stats_closed.png';
        document.querySelector('.inv-img').src = 'img/menu/inv_closed.png';
    }else if(tabName === 'quests'){
        document.querySelector('.quests-img').src = 'img/menu/quests_closed.png';
        document.querySelector('.inv-img').src = 'img/menu/inv_closed.png';
    }
}

function setLevelUI(level){
    document.querySelector('.level-input').value = level;
}