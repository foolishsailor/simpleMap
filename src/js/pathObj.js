export class PathObj {
    constructor({ctx, points, pathColor, pathWidth}){
        this.ctx = ctx;
        this.points = points;
        this.pathColor = pathColor;
        this.pathWidth = pathWidth;        
    }

//Draw path on map
  drawPath(){
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

 };
}