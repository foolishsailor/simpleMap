import { RangeSlider } from "./shape.js";

export class Timeline {
  constructor({ ctx, bounds, backgroundColor }) {
    this.ctx = ctx;
    this._bounds = bounds;
    this.backgroundColor = backgroundColor;
    this._slideBounds = Object.assign({}, this._bounds);
    this.rangeSlider;
    this.startSlider;
    this.endSlider;
    this.init();
  }

  init() {
    this._slideBounds.width -= 20;
    this._slideBounds.x += 20;
    
    this.rangeSlider = new RangeSlider({
        ctx: this.ctx,
        bounds: this._slideBounds,
        imageSrc: '../src/assets/rangeSlider.svg',
        initialPosition: {x: this._slideBounds.x, y: this._slideBounds.y}
    });

    this.startSlider = new RangeSlider({
        ctx: this.ctx,
        bounds: this._slideBounds,
        imageSrc: '../src/assets/startSlider.svg',
        initialPosition: {x: this._slideBounds.x-10, y: this._slideBounds.y}
    });

    this.endSlider = new RangeSlider({
      ctx: this.ctx,
      bounds: this._slideBounds,
      imageSrc: '../src/assets/endSlider.svg',
      initialPosition: {x: this._slideBounds.width, y: this._slideBounds.y}
  });

    //draw timeline container
    this.drawContainer();
  }


  interact(position){
    switch (true){
      case this.rangeSlider.contains(position):
          this.rangeSlider.position = position;
          this.draw();
          return true;

      case this.startSlider.contains(position):
        this.startSlider.position = position;
        break;

      case this.endSlider.contains(position):
         this.endSlider.position = position;
         break;
    }

    this.draw(position);

  }


  get bounds() {
    return this._slideBounds;
  }

  draw(){
    //draw timeline container
    this.drawContainer();

    //draw sliding rangeSlider
    this.rangeSlider.drawImage();
    this.startSlider.drawImage();
    this.endSlider.drawImage();

  }


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
  }
}
