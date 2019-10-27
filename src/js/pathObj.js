import { clock } from "./clock.js";

export class PathObj {
  constructor({ ctx, overlayCtx, points, pathColor, pathWidth }) {
    this.ctx = ctx;
    this.overlayCtx = overlayCtx;
    this.points = points;
    this.pathColor = pathColor;
    this.pathWidth = pathWidth;
    this.rotation = 0;
    this._currentPoint = {};
    this.init();
  }

  init() {
    clock.subscribe("clock", this.drawPathHighlight.bind(this, true));
  }

  /**
   * Set current object in path array to put highlihgt over and draw
   * @param {{}} point
   */
  set currentPoint(point) {
    //clear image at old position
    this.clearPathHighlight();

    //update positon
    this._currentPoint = point;

    //draw new
    this.drawPathHighlight();
  }

  /**
   * draw path from geoJson points
   */
  drawPath() {
    for (var j = 0; j < this.points.length; j++) {
      // If this is the first coordinate in a shape, start a new path
      if (j === 0) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.pathColor;
        this.ctx.lineWidth = this.pathWidth;
        this.ctx.moveTo(this.points[j].x, this.points[j].y);

        // Otherwise just keep drawing
      } else {
        this.ctx.lineTo(this.points[j].x, this.points[j].y);
      }
    }

    this.ctx.stroke();
  }

  /**
   * Draw highlihg indicator f current posiiton on path
   */
  drawPathHighlight(rotate) {
    console.log("overlayctx", rotate);
    //clear image at old position
    this.clearPathHighlight();
    this.overlayCtx.beginPath();
    this.overlayCtx.fillStyle = "rgba(255,255,255,0.4)";
    //center point
    this.overlayCtx.arc(
      this._currentPoint.x,
      this._currentPoint.y,
      5,
      0,
      2 * Math.PI
    );
    this.overlayCtx.fill();

    this.overlayCtx.strokeStyle = "rgba(255,255,255,0.8)";
    this.overlayCtx.lineWidth = 1;

    //ring
    this.overlayCtx.beginPath();
    this.overlayCtx.arc(
      this._currentPoint.x,
      this._currentPoint.y,
      30,
      0,
      2 * Math.PI
    );
    this.overlayCtx.stroke();

    //partial top ring
    this.overlayCtx.beginPath();
    this.overlayCtx.arc(
      this._currentPoint.x,
      this._currentPoint.y,
      35,
      1.5 * Math.PI,
      1.8 * Math.PI
    );
    this.overlayCtx.stroke();

    //partial bottom ring
    this.overlayCtx.beginPath();
    this.overlayCtx.arc(
      this._currentPoint.x,
      this._currentPoint.y,
      35,
      0.5 * Math.PI,
      0.8 * Math.PI
    );
    this.overlayCtx.stroke();

    //animaged inner ring
    //ring
    if (rotate)
      this.rotation >= 1 ? (this.rotation = 0) : (this.rotation += 0.05);

    this.overlayCtx.strokeStyle = "rgba(255,131,0,0.4)";
    this.overlayCtx.lineWidth = 4;
    this.overlayCtx.beginPath();
    this.overlayCtx.arc(
      this._currentPoint.x,
      this._currentPoint.y,
      23,
      0,
      2 * Math.PI
    );

    this.overlayCtx.stroke();

    this.overlayCtx.strokeStyle = "rgba(255,131,0,0.4)";
    this.overlayCtx.lineWidth = 2;
    this.overlayCtx.beginPath();
    this.overlayCtx.arc(
      this._currentPoint.x,
      this._currentPoint.y,
      23,
      this.rotation * 2 * Math.PI,
      (this.rotation + 0.25) * 2 * Math.PI
    );

    this.overlayCtx.stroke();

    this.overlayCtx.beginPath();
    this.overlayCtx.arc(
      this._currentPoint.x,
      this._currentPoint.y,
      23,
      (this.rotation + 0.5) * 2 * Math.PI,
      (this.rotation + 0.75) * 2 * Math.PI
    );
    this.overlayCtx.stroke();
  }

  clearPathHighlight() {
    this.overlayCtx.clearRect(
      this._currentPoint.x - 40,
      this._currentPoint.y - 40,
      80,
      80
    );
  }
}
