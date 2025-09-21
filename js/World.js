class World{
    constructor(path){
        const mapImage = new Image();
        mapImage.src = path
        
        this.sprite = new Sprite(mapImage, {position:{x: -500, y:-500}});
        
        console.log('created map.');
    }
}

