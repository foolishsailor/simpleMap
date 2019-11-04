export class Slider {
  constructor({ctx, bounds}) {
    this.ctx = ctx
    this.bounds = bounds;
    this.currentPosition = {x: this.bounds.x, y: this.bounds.y};
    this.touchOffset = 0;
    this.isMovable = false;
    
  }

  init(args){
    this.currentPosition = args.initialPosition;
    this.img.onload = () =>{
      this.ctx.drawImage(
        this.img,
        this.currentPosition.x,
        this.currentPosition.y,
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
    this.currentPosition = position;
  }

  set movable(isMovable){
    this.isMovable = isMovable;
  }

  get movable(){
    return this.isMovable;
  }

  get range(){
    return this._range;
  }

  set range(range){
    this._range = range;
  }

  /**
   * Check if mouse down in object
   * @param {} position 
   */
  contains(position) {
    if (
      this.currentPosition.x <= position.x &&
      position.x <= this.currentPosition.x + this.width &&
      this.bounds.y <= position.y &&
      position.y <= this.bounds.y + this.bounds.height
    ) {

      this.touchOffset = position.x-this.currentPosition.x;
      return true;
    }

    return false;
  } 


  drawImage(position){ 

    //checks if position to move slider exceeds slider range
    //includes the touchOffset which is the diff between the object X and the touch X to keep
    //the object tracking with mouse instead of obejct x locking to mouse X
    if (position){
      if (position.x - this.touchOffset >= this._range.min && position.x + this.touchOffset <= this._range.max){
        if (this.isMovable) this.currentPosition.x = position.x - this.touchOffset;    
      }    
    }
  
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
  constructor({ctx, bounds, stroke, strokeColor, clickPad, imageSrc, initialPosition, range}){
    super({ctx, bounds, clickPad});
    this.ctx = ctx;
    this.bounds = bounds;    
    this.stroke = stroke || '';
    this.strokeColor = strokeColor || '';
    this.width = 10;
    this.offset = Math.floor(this.width/2);
    this.img = new Image();
    this._range = range;
    this.init({src: imageSrc, initialPosition:initialPosition});

  }

}




