export class Reticule {
  constructor(ctx) {
    this.ctx = ctx;
    this.rotation = 0;
    this.orbitIncrement = 0;
    this._position = {};
  }  

  /**
   * Update position of reticule.
   * 
   * Position must be stored so that the original position can be cleared before drawing new position
   * otherwise there are artifacts left on screen depending how fast mous moved
   * @param {*} position 
   * @param {*} animate 
   */
  update(position, animate){
 
    //clear old position
    this.clearPathHighlight(this._position);

    //update position
    this._position = position;

    //draw new position
    this.draw(position, animate);
  }

  orbit(orbitRadius, increment) {
    return {
      x: Math.cos(increment) * orbitRadius,
      y: Math.sin(increment) * orbitRadius
    };
  }
  
  /**
   * Draw highlihg indicator f current posiiton on path
   */
  draw(currentPoint, animate) {
    if (animate) {
      this.rotation >= 1 ? (this.rotation = 0) : (this.rotation += 0.02);
      this.orbitIncrement > Math.PI * 2
        ? (this.orbitIncrement = 0)
        : (this.orbitIncrement -= 0.05);
    }

    //clear image at old position
    this.clearPathHighlight(currentPoint);

    //center point
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(255,255,255,0.4)";

    this.ctx.arc(
      currentPoint.x,
      currentPoint.y,
      3,
      0,
      2 * Math.PI
    );
    this.ctx.fill();

    //ring 1
    this.ctx.beginPath();
    this.ctx.strokeStyle = "rgba(255,255,255,0.2)";
    this.ctx.lineWidth = 1;

    this.ctx.arc(
      currentPoint.x,
      currentPoint.y,
      7,
      0,
      2 * Math.PI
    );
    this.ctx.stroke();

    //ring 2
    this.ctx.beginPath();
    this.ctx.strokeStyle = "rgba(255,255,255,0.2)";
    this.ctx.lineWidth = 2;

    this.ctx.arc(
      currentPoint.x,
      currentPoint.y,
      14,
      0,
      2 * Math.PI
    );
    this.ctx.stroke();

    //ring 2-sub top
    let orbit1 = this.orbit(14, this.orbitIncrement);
    this.ctx.beginPath();
    this.ctx.strokeStyle = "rgba(255,255,255,0.2)";
    this.ctx.lineWidth = 1;

    this.ctx.arc(
      currentPoint.x + orbit1.x,
      currentPoint.y + orbit1.y,
      3,
      0,
      2 * Math.PI
    );
    this.ctx.fill();

    //ring 2-sub bottom
    let orbit2 = this.orbit(14, this.orbitIncrement + Math.PI);
    this.ctx.beginPath();
    this.ctx.strokeStyle = "rgba(255,255,255,0.2)";
    this.ctx.lineWidth = 2;

    this.ctx.arc(
      currentPoint.x + orbit2.x,
      currentPoint.y + orbit2.y,
      3,
      0,
      2 * Math.PI
    );
    this.ctx.fill();

    //ring 3
    this.ctx.beginPath();
    this.ctx.strokeStyle = "rgba(255,255,255,0.1)";
    this.ctx.lineWidth = 4;
    this.ctx.arc(
      currentPoint.x,
      currentPoint.y,
      23,
      0,
      2 * Math.PI
    );

    this.ctx.stroke();

    //ring 3-sub top
    this.ctx.beginPath();
    this.ctx.strokeStyle = "rgba(255,255,255,0.2)";
    this.ctx.lineWidth = 2;
    this.ctx.arc(
      currentPoint.x,
      currentPoint.y,
      23,
      this.rotation * 2 * Math.PI,
      (this.rotation + 0.25) * 2 * Math.PI
    );

    this.ctx.stroke();

    //ring 3-sub bottom
    this.ctx.beginPath();
    this.ctx.strokeStyle = "rgba(255,255,255,0.2)";
    this.ctx.lineWidth = 2;
    this.ctx.arc(
      currentPoint.x,
      currentPoint.y,
      23,
      (this.rotation + 0.5) * 2 * Math.PI,
      (this.rotation + 0.75) * 2 * Math.PI
    );
    this.ctx.stroke();

    //ring 4
    this.ctx.beginPath();
    this.ctx.strokeStyle = "rgba(255,255,255,0.8)";
    this.ctx.lineWidth = 1;

    this.ctx.arc(
      currentPoint.x,
      currentPoint.y,
      30,
      0,
      2 * Math.PI
    );
    this.ctx.stroke();

    //partial outter top ring
    this.ctx.beginPath();
    this.ctx.arc(
      currentPoint.x,
      currentPoint.y,
      35,
      1.5 * Math.PI,
      1.8 * Math.PI
    );
    this.ctx.stroke();

    //partial outer bottom ring
    this.ctx.beginPath();
    this.ctx.arc(
      currentPoint.x,
      currentPoint.y,
      35,
      0.5 * Math.PI,
      0.8 * Math.PI
    );
    this.ctx.stroke();
  }

  clearPathHighlight(position) {
    this.ctx.clearRect(
        position.x - 40,
        position.y - 40,
      80,
      80
    );
  }
}
