class Sprite{
    constructor(image){
        this.image = image;
        
        // const img = new Image();
        // img.src = `img/${image}.png`;
    }
    
    draw(position){
        context.drawImage(this.image, position.x, position.y);
    }
}