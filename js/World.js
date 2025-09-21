class World{
    constructor(path, boundaries=[]){
        const mapImage = new Image();
        mapImage.src = path;
        this.boundaries = boundaries;
        // this.boundaries = [boundaries.x, boundaries.y, boundaries.length, boundaries.height]
        
        this.sprite = new Sprite({
            image: mapImage, 
            position:{
                x: -500,
                y: -500
            }
        });
        
        console.log('created map.', this);
    }
}

