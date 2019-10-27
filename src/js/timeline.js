import {clock} from './clock.js';

export class Timeline {
  constructor({ ctx, bounds, backgroundColor }) {
    this.ctx = ctx;
    this._bounds = bounds;
    this.backgroundColor = backgroundColor;
    this._currentPosition;
    this._currentPoint = {};
    this.rotation = 0;
    this.sliderWidth = 11;
    this._slideBounds = Object.assign({}, this._bounds);
    this.init();
  }

  init() {
    this._slideBounds.width -= this.sliderWidth;
    this._currentPosition = this._slideBounds.x;
    clock.subscribe('clock', this.drawPathHighlight.bind(this, true));

  }

  updatePosition(position, point) {
    this.clearPathHighlight();
    this._currentPosition = position - this._slideBounds.x;
    this._currentPoint = point;
    this.draw();
  }

  get bounds() {
    return this._slideBounds;
  }

  draw() {
    this.drawContainer();
    this.drawCurrentPositionIndicator();
    this.drawPathHighlight();
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

  /**
   * Draw highlihg indicator f current posiiton on path
   */
  drawPathHighlight(rotate) {
    this.clearPathHighlight();
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(255,255,255,0.4)";
    //center point
    this.ctx.arc(this._currentPoint.x, this._currentPoint.y, 5, 0, 2 * Math.PI);
    this.ctx.fill();

    this.ctx.strokeStyle = "rgba(255,255,255,0.8)";
    this.ctx.lineWidth = 1;

    //ring
    this.ctx.beginPath();
    this.ctx.arc(
      this._currentPoint.x,
      this._currentPoint.y,
      30,
      0,
      2 * Math.PI
    );
    this.ctx.stroke();

    //partial top ring
    this.ctx.beginPath();
    this.ctx.arc(
      this._currentPoint.x,
      this._currentPoint.y,
      35,
      1.5 * Math.PI,
      1.8 * Math.PI
    );
    this.ctx.stroke();

    //partial bottom ring
    this.ctx.beginPath();
    this.ctx.arc(
      this._currentPoint.x,
      this._currentPoint.y,
      35,
      0.5 * Math.PI,
      0.8 * Math.PI
    );
    this.ctx.stroke();

    //animaged inner ring
    //ring
    if (rotate)
      this.rotation >= 1 ? (this.rotation = 0) : (this.rotation += 0.05);

    this.ctx.strokeStyle = "rgba(255,131,0,0.4)";
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.arc(
      this._currentPoint.x,
      this._currentPoint.y,
      23,
      0,
      2 * Math.PI
    );

    this.ctx.stroke();

    this.ctx.strokeStyle = "rgba(255,131,0,0.4)";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(
      this._currentPoint.x,
      this._currentPoint.y,
      23,
      this.rotation * 2 * Math.PI,
      (this.rotation + 0.25) * 2 * Math.PI
    );

    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(
      this._currentPoint.x,
      this._currentPoint.y,
      23,
      (this.rotation + 0.5) * 2 * Math.PI,
      (this.rotation + 0.75) * 2 * Math.PI
    );
    this.ctx.stroke();
  }

  clearPathHighlight() {
    this.ctx.clearRect(
      this._currentPoint.x - 40,
      this._currentPoint.y - 40,
      80,
      80
    );
  }

  /**
   * Draw timline indicator
   */
  drawCurrentPositionIndicator() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(255,255,255,0.05)";
    this.ctx.fillRect(
      this._slideBounds.x + this._currentPosition,
      this._slideBounds.y + 1,
      11,
      this._slideBounds.height - 2
    );

    this.ctx.fillStyle = "rgba(255,255,255,0.4)";
    //top indicator
    this.ctx.moveTo(
      this._slideBounds.x + 6 + this._currentPosition,
      this._slideBounds.y + 10
    );
    this.ctx.lineTo(
      this._slideBounds.x + this._currentPosition,
      this._slideBounds.y + 7
    );
    this.ctx.lineTo(
      this._slideBounds.x + this._currentPosition,
      this._slideBounds.y + 1
    );
    this.ctx.lineTo(
      this._slideBounds.x + 11 + this._currentPosition,
      this._slideBounds.y + 1
    );
    this.ctx.lineTo(
      this._slideBounds.x + 11 + this._currentPosition,
      this._slideBounds.y + 7
    );
    this.ctx.lineTo(
      this._slideBounds.x + 6 + this._currentPosition,
      this._slideBounds.y + 10
    );

    //top indicator
    this.ctx.moveTo(
      this._slideBounds.x + 6 + this._currentPosition,
      this._slideBounds.y + this._slideBounds.height - 10
    );
    this.ctx.lineTo(
      this._slideBounds.x + this._currentPosition,
      this._slideBounds.y + this._slideBounds.height - 7
    );
    this.ctx.lineTo(
      this._slideBounds.x + this._currentPosition,
      this._slideBounds.y + this._slideBounds.height - 1
    );
    this.ctx.lineTo(
      this._slideBounds.x + 11 + this._currentPosition,
      this._slideBounds.y + this._slideBounds.height - 1
    );
    this.ctx.lineTo(
      this._slideBounds.x + 11 + this._currentPosition,
      this._slideBounds.y + this._slideBounds.height - 7
    );
    this.ctx.lineTo(
      this._slideBounds.x + 6 + this._currentPosition,
      this._slideBounds.y + this._slideBounds.height - 10
    );

    this.ctx.closePath();

    this.ctx.fill();

    //time indicator
    this.ctx.beginPath();
    this.ctx.strokeStyle = "red";
    this.ctx.lineWidth = 1;
    this.ctx.moveTo(
      this._slideBounds.x + 6 + this._currentPosition,
      this._slideBounds.y + 11
    );
    this.ctx.lineTo(
      this._slideBounds.x + 6 + this._currentPosition,
      this._slideBounds.y + this._slideBounds.height - 11
    );

    this.ctx.stroke();
  }
}
