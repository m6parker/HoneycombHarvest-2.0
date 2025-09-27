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
    items.forEach(item => item.sprite.draw(item.position));


    keepOut(houseCollision);
    checkBoundaries(world.boundaries)

    movePlayer();
}

const world = new World('img/map(400x-expanded).png', [460, 10, 5888, 4606]);
const foreground = new World('img/foreground_map.png');
const player = new Player('bee', 20, 100, 5, 1, 1);

// coordinates where player cannot enter
const houseCollision = [3581, 3652, 570, 64];

// designated areas
const gardenOne = [2612, 815, 705, 315]

//put flowers in the garden
spawnItems('pumpkin', 15, gardenOne);

// add everything to the correct lists before drawing them 
const movables = [world, foreground, ...items];
const moveableBoundaries = [world.boundaries, houseCollision, gardenOne];
animate();


//----------- canvas interactions --------------------------------

document.addEventListener('mousemove', (e) => {
    mouseLocation.x = e.clientX;
    mouseLocation.y = e.clientY;

    //hover sprites       
    // selectables.forEach(movable => {
    //     if(
    //         mouseLocation.x >= movable.position.x &&
    //         mouseLocation.x <= movable.position.x + movable.width &&
    //         mouseLocation.y >= movable.position.y &&
    //         mouseLocation.y <= movable.position.y + movable.height
    //     ){
    //         canvas.style.cursor = 'pointer';
    //     }
    // });
});

const mouseLocation = { x: 0, y: 0};
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const screenX = event.clientX - rect.left;
    const screenY = event.clientY - rect.top;
    //testing
    // console.log("MONITOR: ", mouseLocation.x, mouseLocation.y)
    console.log("WORLD: ", cameraOffset.x + mouseLocation.x, cameraOffset.y + mouseLocation.y) // sprite coords
});