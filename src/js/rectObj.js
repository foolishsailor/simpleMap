export class RectObj {
  constructor(x, y, w, h, stroke, strokeColor) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.stroke = stroke;
    this.strokeColor = strokeColor;
  }

  contains(x, y) {
    return (
      this.x <= x &&
      x <= this.x + this.width &&
      this.y <= y &&
      y <= this.y + this.height
    );
  }

  draw(ctx) {
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = this.stroke;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }
}
