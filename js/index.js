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

function animate(){
    window.requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    world.sprite.draw();
    collsions.sprite.draw();
    player.sprite.draw();
    foreground.sprite.draw();

    // todo for collisions:
    // bool inBounds()
    // if !inBounds(worldBoundaries) { prevent movement }
    // if inbounds(foregroundList[]) { prevent movement }
    // if inbounds(gardenBoundariesList[]) { in garden }
    // all part of moveableBoundaries array

    inGarden(world.boundaries)
    console.log(inGarden(world.boundaries))
    movePlayer();
}

const world = new World('img/map(400x-expanded).png', [200, -200, 6500, 5000]);
const collsions = new World('img/collisions_map.png');
const foreground = new World('img/foreground_map.png');
const player = new Player('bee', 20, 100, 5, 1, 1);

// coordinates where player cannot leave
// let worldBoundaries = [200, -200, 6500, 5000];
// coordinates where player cannot enter
let houseCollision = [];
let lampCollision = [];

const movables = [world.sprite, collsions.sprite, foreground.sprite];
const moveableBoundaries = [world.boundaries];


animate();

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
    console.log("MONITOR: ", mouseLocation.x, mouseLocation.y)
    console.log("WORLD: ", cameraOffset.x + mouseLocation.x, cameraOffset.y + mouseLocation.y) // sprite coords
});