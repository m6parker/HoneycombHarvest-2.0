class World{
    constructor(path, boundaries=[]){
        const mapImage = new Image();
        mapImage.src = path;
        this.boundaries = boundaries;
        this.position = {
            x: -500,
            y: -500
        };
        
        this.sprite = new Sprite(mapImage);
    }
}

