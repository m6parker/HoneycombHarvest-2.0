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

    movePlayer();
}

const world = new World('img/map(400x-expanded).png');
const collsions = new World('img/collisions_map.png');
const foreground = new World('img/foreground_map.png');
const player = new Player('bee', 20, 100, 5, 1, 1);

const movables = [world.sprite, collsions.sprite, foreground.sprite]

animate();

