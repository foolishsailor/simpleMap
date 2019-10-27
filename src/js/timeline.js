import { Indicator } from "./shape.js";

export class Timeline {
  constructor({ ctx, bounds, backgroundColor }) {
    this.ctx = ctx;
    this._bounds = bounds;
    this.backgroundColor = backgroundColor;
    this._currentPosition;    
    this._slideBounds = Object.assign({}, this._bounds);
    this.indicator;
    this.init();
  }

  init() {
    this._slideBounds.width -= 20;
    this._slideBounds.x += 20;
    this._currentPosition = this._slideBounds.x;

    this.indicator = new Indicator({
        ctx: this.ctx,
        bounds: this._slideBounds
    });
  }

  updatePosition(position) {
    this._currentPosition = position;
    this.draw();
  }

  get bounds() {
    return this._slideBounds;
  }

  draw() {
    this.drawContainer();
    this.indicator.draw(this._currentPosition);
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
