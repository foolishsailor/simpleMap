export class RectObj {
  constructor({x, y, w, h, clickPad}) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.clickPad = clickPad || 0;
    
  }

  contains(x, y) {
    return (
      this.x - this.clickPad <= x &&
      x <= this.x + this.width + this.clickPad &&
      this.y - this.clickPad <= y &&
      y <= this.y + this.height + this.clickPad
    );
  }

  
}

export class Indicator extends RectObj {
  constructor({x, y, w, h, stroke, strokeColor, clickPad}){
    super({x, y, w, h, clickPad});
    this.stroke = stroke;
    this.strokeColor = strokeColor;
  }

  draw(ctx) {
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = this.stroke;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

}
