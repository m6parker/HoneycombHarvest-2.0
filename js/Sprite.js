class Sprite{
    constructor(image, {position}){
        this.image = image;
        this.position = position;

        // console.log('created sprite.');
    }

    draw(){
        context.drawImage(this.image, this.position.x, this.position.y);
    }
}