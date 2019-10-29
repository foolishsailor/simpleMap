import { RangeSlider } from "./Slider.js";

export class Timeline {
  constructor({ ctx, bounds, backgroundColor }) {
    this.ctx = ctx;
    this._bounds = bounds;
    this.backgroundColor = backgroundColor;
    this._slideBounds;
    this.rangeSlider;
    this.startSlider;
    this.endSlider;
    this.init();
  }

  init() {
    //set data sliderArea
    this._slideBounds = {
      x:  this._bounds.x + 20,
      y:  this._bounds.y + 5,
      width: this._bounds.width - 40,
      height: this._bounds.height - 10
    }

    
    this.rangeSlider = new RangeSlider({
        ctx: this.ctx,
        bounds: this._slideBounds,
        imageSrc: '../src/assets/rangeSlider.svg',
        initialPosition: {x: this._slideBounds.x, y: this._slideBounds.y},
        range:{min:this._slideBounds.x, max: this._slideBounds.width + this._slideBounds.x}
    });

    this.startSlider = new RangeSlider({
        ctx: this.ctx,
        bounds: this._slideBounds,
        imageSrc: '../src/assets/startSlider.svg',
        initialPosition: {x: this._slideBounds.x-10, y: this._slideBounds.y},
        range:{min:this._slideBounds.x-10, max: this._slideBounds.width + this._slideBounds.x-10}
    });

    this.endSlider = new RangeSlider({
      ctx: this.ctx,
      bounds: this._slideBounds,
      imageSrc: '../src/assets/endSlider.svg',
      initialPosition: {x: this._slideBounds.width+this._slideBounds.x, y: this._slideBounds.y},
      range:{min:this._slideBounds.x+10, max: this._slideBounds.width + this._slideBounds.x+10}
  });

    //draw timeline container
    this.drawContainer();
  }


  /**
   * get bounds of timeline ocntainer
   */
  get bounds() {
    return this._slideBounds;
  }

  /**
   * Check if data slider has been interacted with to update path highlight
   */
  get rangeSliderSelected() {
    return this.rangeSlider.isMovable;
  }


  /**
   * Check which if any sliders have been slected with mouse
   * @param {*} mouseDownPosition 
   */
  interact(mouseDownPosition){ 
    switch (true){
      case this.rangeSlider.contains(mouseDownPosition):       
        this.rangeSlider.isMovable = true;
        break;
      case this.startSlider.contains(mouseDownPosition):
        this.startSlider.isMovable = true;
        break;
      case this.endSlider.contains(mouseDownPosition):
        this.endSlider.isMovable = true;
        break;
    }

  }

  /**
   * Clear all interaction flags
   */
  clearInteract(){
    this.rangeSlider.isMovable = false;
    this.startSlider.isMovable = false;
    this.endSlider.isMovable = false;
  }


  /**
   * Draw position updates for any sliders that have been interaced with
   * @param {} currentPosition 
   */  
  draw(currentPosition){

     //draw timeline container
    this.drawContainer();

    //draw sliding rangeSlider
    this.rangeSlider.drawImage(currentPosition);
    this.startSlider.drawImage(currentPosition);
    this.endSlider.drawImage(currentPosition);

  }


  /**
   * Draw timeline container
   */
  drawContainer() {
    this.ctx.clearRect(
      this._bounds.x,
      this._bounds.y,
      this._bounds.width,
      this._bounds.height
    );

    this.ctx.beginPath();
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(
      this._bounds.x,
      this._bounds.y,
      this._bounds.width,
      this._bounds.height
    );

    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgba(0,0,0,0.2)';
    this.ctx.fillRect(
      this._slideBounds.x,
      this._slideBounds.y,
      this._slideBounds.width,
      this._slideBounds.height
    );
  }
}
