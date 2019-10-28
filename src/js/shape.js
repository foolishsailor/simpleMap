export class Slider {
  constructor({ctx, bounds, clickPadding}) {
    this.ctx = ctx
    this.bounds = bounds;
    this.clickPadding = clickPadding || 0;
    this.currentPosition = {x: this.bounds.x, y: this.bounds.y};
    
  }

  init(args){
    this.currentPosition = args.initialPosition;
    this.img.onload = () =>{
      this.ctx.drawImage(
        this.img,
        this.currentPosition.x,
        this.bounds.y,
        this.width,
        this.bounds.height      
      );
    }
    this.img.src = args.src;

  }

  get position(){
    return this.currentPosition;
  }

  set position(position){
    console.log('position', position);
    //center image on mouse
    position.x -= Math.floor(this.width/2); 
    //save position for comparing click locations
    this.currentPosition = position;
  }

  contains(position) {
    return (
      this.currentPosition.x <= position.x &&
      position.x <= this.currentPosition.x + this.width &&
      this.bounds.y <= position.y &&
      position.y <= this.bounds.y + this.bounds.height
    );
  } 

  drawImage(){    

    //draw position
    this.ctx.drawImage(
      this.img,
      this.currentPosition.x,
      this.bounds.y,
      this.width,
      this.bounds.height      
    );
  }

}



export class RangeSlider extends Slider {
  constructor({ctx, bounds, stroke, strokeColor, clickPad, imageSrc, initialPosition}){
    super({ctx, bounds, clickPad});
    this.ctx = ctx;
    this.bounds = bounds;    
    this.stroke = stroke || '';
    this.strokeColor = strokeColor || '';
    this.width = 11;
    this.offset = Math.floor(this.width/2);
    this.img = new Image();
    this.init({src: imageSrc, initialPosition:initialPosition});

  }

}




