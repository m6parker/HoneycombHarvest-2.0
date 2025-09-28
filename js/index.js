// canvas
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;
context.fillStyle = 'black';
context.fillRect(0,0,canvas.width,canvas.height);

const ResizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
ResizeCanvas();

window.addEventListener("resize", () => ResizeCanvas());

// --------------------- game loop -----------------------------
function animate(){
    window.requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    world.sprite.draw(world.position);
    player.sprite.draw(player.position);
    foreground.sprite.draw(foreground.position);
    hive.sprite.draw(hive.position);
    items.forEach(item => item.sprite.draw(item.position));


    keepOut(houseCollision);
    checkBoundaries(world.boundaries)

    movePlayer();
}

const world = new World('img/map(400x-expanded).png', [460, 10, 5888, 4606]);
const foreground = new World('img/foreground_map.png');
const player = new Player('bee', 20, 100, 5, 1, 1);
let hive = new Building('hive', 100)
hive.position = {x:1224, y:827}

// coordinates where player cannot enter
const houseCollision = [3581, 3652, 570, 64];

// designated areas
const gardenOne = [2612, 815, 705, 315]

//put flowers in the garden
spawnItems('pumpkin', 57, gardenOne);

// add everything to the correct lists before drawing them 
const movables = [world, foreground, ...items, hive];
const moveableBoundaries = [world.boundaries, houseCollision, gardenOne];
const selectables = [hive];
animate();


//----------- canvas interactions --------------------------------

document.addEventListener('mousemove', (e) => {
    mouseLocation.x = e.clientX;
    mouseLocation.y = e.clientY;

    //hover sprites       
    items.forEach(movable => {
        if(
            mouseLocation.x >= movable.position.x &&
            mouseLocation.x <= movable.position.x + movable.size + 10 &&
            mouseLocation.y >= movable.position.y &&
            mouseLocation.y <= movable.position.y + movable.size + 10
        ){
            canvas.style.cursor = 'pointer';
        }else{
            canvas.style.cursor = 'default';
        }
    });
});

const mouseLocation = { x: 0, y: 0};
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const screenX = event.clientX - rect.left;
    const screenY = event.clientY - rect.top;
    //testing
    // console.log("MONITOR: ", mouseLocation.x, mouseLocation.y)
    console.log("WORLD: ", cameraOffset.x + mouseLocation.x, cameraOffset.y + mouseLocation.y) // sprite coords

    // clicking items
    console.log(items[0].position)
    console.log(mouseLocation.x, mouseLocation.y)
    items.forEach(item => {
        if (
            mouseLocation.x >= item.position.x &&
            mouseLocation.x <= item.position.x + item.size + 10 &&
            mouseLocation.y >= item.position.y &&
            mouseLocation.y <= item.position.y + item.size + 10
        ) {
            item.selected = item.selected ? false : true;
            tooltip.classList.remove('hidden');
            tooltip.style.left = `${mouseLocation.x + 10}px`;
            tooltip.style.top = `${mouseLocation.y + 10}px`;

            tooltip.innerHTML = `${item.name}: ${item.quality}`;
        }
    });

    selectables.forEach(selectable => {
        if (
            mouseLocation.x >= selectable.position.x &&
            mouseLocation.x <= selectable.position.x + selectable.size &&
            mouseLocation.y >= selectable.position.y &&
            mouseLocation.y <= selectable.position.y + selectable.size
        ) {
            // selectable.selected = selectable.selected ? false : true;
            selectable.select();
        }
    });
});