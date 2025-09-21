class Sprite{
    constructor({image, position}){
        this.image = image;
        this.position = position;
        console.log(this)
    }

    draw(){
        context.drawImage(this.image, this.position.x, this.position.y);
    }
}