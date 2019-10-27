export class Shape {
  constructor({ctx, bounds, clickPadding}) {
    this.ctx = ctx
    this.bounds = bounds;
    this.clickPadding = clickPadding || 0;
    
  }

  contains(x, y) {
    return (
      this.bounds.x - this.clickPad <= x &&
      x <= this.bounds.x + this.bounds.width + this.clickPad &&
      this.bounds.y - this.clickPad <= y &&
      y <= this.bounds.y + this.bounds.height + this.clickPad
    );
  }  
}



export class Indicator extends Shape {
  constructor({ctx, bounds, stroke, strokeColor, clickPad}){
    super({ctx, bounds, clickPad});
    this.ctx = ctx;
    this.bounds = bounds;
    this.stroke = stroke || '';
    this.strokeColor = strokeColor || '';
    this.width = 11;
    this.offset = Math.floor(this.width/2);

  }

  draw(position) {
      this.ctx.beginPath();
      this.ctx.fillStyle = "rgba(255,255,255,0.05)";
      this.ctx.fillRect(
        this.bounds.x - this.offset + position,
        this.bounds.y + 1,
        this.width,
        this.bounds.height - 2
      );
  
      this.ctx.fillStyle = "rgba(255,255,255,0.4)";

      //top indicator
      this.ctx.moveTo(
        this.bounds.x + position,
        this.bounds.y + 10
      );
      this.ctx.lineTo(
        this.bounds.x - this.offset + position,
        this.bounds.y + 7
      );
      this.ctx.lineTo(
        this.bounds.x - this.offset + position,
        this.bounds.y + 1
      );
      this.ctx.lineTo(
        this.bounds.x - this.offset + this.width + position,
        this.bounds.y + 1
      );
      this.ctx.lineTo(
        this.bounds.x - this.offset + this.width + position,
        this.bounds.y + 7
      );
      this.ctx.lineTo(
        this.bounds.x  + position,
        this.bounds.y + 10
      );
  
      //bottom indicator
      this.ctx.moveTo(
        this.bounds.x + 1 + position,
        this.bounds.y + this.bounds.height - 10
      );
      this.ctx.lineTo(
        this.bounds.x - this.offset + position,
        this.bounds.y + this.bounds.height - 7
      );
      this.ctx.lineTo(
        this.bounds.x - this.offset + position,
        this.bounds.y + this.bounds.height - 1
      );
      this.ctx.lineTo(
        this.bounds.x - this.offset + this.width + position,
        this.bounds.y + this.bounds.height - 1
      );
      this.ctx.lineTo(
        this.bounds.x - this.offset + this.width + position,
        this.bounds.y + this.bounds.height - 7
      );
      this.ctx.lineTo(
        this.bounds.x + 1 + position,
        this.bounds.y + this.bounds.height - 10
      );
  
      this.ctx.closePath();
  
      this.ctx.fill();
  
      //time indicator
      this.ctx.beginPath();
      this.ctx.strokeStyle = "red";
      this.ctx.lineWidth = 1;
      this.ctx.moveTo(
        this.bounds.x + 1 + position,
        this.bounds.y + 11
      );
      this.ctx.lineTo(
        this.bounds.x + 1 + position,
        this.bounds.y + this.bounds.height - 11
      );
  
      this.ctx.stroke();
    }

}

export class StartIndicator extends Shape {
  constructor({ctx, bounds, stroke, strokeColor, clickPad}){
    super({ctx, bounds, clickPad});
    this.stroke = stroke;
    this.strokeColor = strokeColor;

  }

  draw(ctx) {
    
  }

}


