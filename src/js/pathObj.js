import { clock } from "./clock.js";
import { Reticule } from "./reticule.js";

export class PathObj {
  constructor({ ctx, overlayCtx, points, pathColor, pathWidth }) {
    this.ctx = ctx;
    this.overlayCtx = overlayCtx;
    this.points = points;
    this.pathColor = pathColor;
    this.pathWidth = pathWidth;    
    this._currentPoint = {};
    this.reticule = new Reticule(overlayCtx);
    this.init();
  }

  init() {
    clock.subscribe("clock", this.animateReticule.bind(this, this._currentPoint, true));
  }

  /**
   * Set current object in path array to put highlihgt over and draw
   * @param {{}} point
   */
  set currentPoint(point) {
    //update positon
    this._currentPoint = point;

    //draw new
    this.reticule.update(this._currentPoint);
  }

  animateReticule(){
    this.reticule.update(this._currentPoint, true)
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

  
}
