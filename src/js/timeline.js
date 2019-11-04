import { RangeSlider } from "./Slider.js";
import { geoUtils } from "./geoUtils.js";

export class Timeline {
  constructor({ bounds, backgroundColor, container }) {
    this.container = container;
    this.mouseDown = false;
    this.mouseDownPosition = {};
    this._bounds = bounds;
    this.currentPath;
    this.increments;
    this.backgroundColor = backgroundColor;
    this._slideBounds;
    this.rangeSlider;
    this.startSlider;
    this.endSlider;
    this.canvasBounds;
    (this.timelineCanvas = document.createElement("canvas")),
      (this.timelineOverlayCanvas = document.createElement("canvas")),
      (this.timelineOverlayContext = this.timelineOverlayCanvas.getContext(
        "2d"
      )),
      (this.timelineContext = this.timelineCanvas.getContext("2d")),
      this.init();
  }

  init() {
    //buiild timeilne

    this.timelineCanvas.id = "timelineCanvas";
    this.timelineCanvas.setAttribute("z-index", 1);
    this.timelineOverlayCanvas.id = "timelineOverlayCanvas";
    this.timelineOverlayCanvas.setAttribute("z-index", 0);

    document.getElementById(this.container).appendChild(this.timelineCanvas);
    document
      .getElementById(this.container)
      .appendChild(this.timelineOverlayCanvas);

    this.timelineContext.canvas.height = this._bounds.height;
    this.timelineContext.canvas.width = this._bounds.width;

    this.timelineOverlayContext.canvas.height = this._bounds.height;
    this.timelineOverlayContext.canvas.width = this._bounds.width;

    //attache mouse event listeners
    this.timelineOverlayContext.canvas.onmousedown = this.handleMouseDown.bind(
      this
    );
    this.timelineOverlayContext.canvas.onmouseup = this.handleMouseUp.bind(
      this
    );
    this.timelineOverlayContext.canvas.onmouseout = this.handleMouseOut.bind(
      this
    );
    this.timelineOverlayContext.canvas.onmousemove = this.handleMouseMove.bind(
      this
    );

    this.canvasBounds = this.timelineContext.canvas.getBoundingClientRect();

    //set data sliderArea
    this._slideBounds = {
      x: this._bounds.x + 20,
      y: this._bounds.y + 15,
      width: this._bounds.width - 40,
      height: this._bounds.height - 15
    };

    this.rangeSlider = new RangeSlider({
      ctx: this.timelineContext,
      bounds: this._slideBounds,
      imageSrc: "../src/assets/rangeSlider.svg",
      initialPosition: { x: this._slideBounds.x, y: this._slideBounds.y },
      range: {
        min: this._slideBounds.x,
        max: this._slideBounds.width + this._slideBounds.x
      }
    });

    this.startSlider = new RangeSlider({
      ctx: this.timelineContext,
      bounds: this._slideBounds,
      imageSrc: "../src/assets/startSlider.svg",
      initialPosition: { x: this._slideBounds.x - 10, y: this._slideBounds.y },
      range: {
        min: this._slideBounds.x - 10,
        max: this._slideBounds.width + this._slideBounds.x - 10
      }
    });

    this.endSlider = new RangeSlider({
      ctx: this.timelineContext,
      bounds: this._slideBounds,
      imageSrc: "../src/assets/endSlider.svg",
      initialPosition: {
        x: this._slideBounds.width + this._slideBounds.x,
        y: this._slideBounds.y
      },
      range: {
        min: this._slideBounds.x + 10,
        max: this._slideBounds.width + this._slideBounds.x + 10
      }
    });

    //draw timeline container
    this.drawContainer();

  }

  /**
   * get bounds of timeline ocntainer
   */
  get bounds() {
    return this._slideBounds;
  }

  /**
   * Check if data slider has been interacted with to update path highlight
   */
  get rangeSliderSelected() {
    return this.rangeSlider.isMovable;
  }


  set path(path){
    this.currentPath = path;
    
    //draw time increments
    this.drawTimeIncrements(); 

  }



  handleMouseDown(e) {
    this.mouseDown = true;

    this.mouseDownPosition = {
      x: e.clientX - this.canvasBounds.left,
      y: e.clientY - this.canvasBounds.top
    };
    this.interact(this.mouseDownPosition);
  }

  handleMouseUp() {
    this.mouseDown = false;
    this.mouseDownPosition = {};
    this.clearInteract();
    console.log("Mouse Up");
  }

  handleMouseOut() {
    this.mouseDown = false;
    this.mouseDownPosition = {};
    this.clearInteract();
    console.log("Mouse Out");
  }

  handleMouseMove(e) {
    if (this.mouseDown) {
      //update position of sliders and if slider is range slider then update path highlight
      this.draw({
        x: e.clientX - this.canvasBounds.left,
        y: e.clientY - this.canvasBounds.top
      });
    }
  }

  /**
   * Check which if any sliders have been slected with mouse
   * @param {*} mouseDownPosition
   */
  interact(mouseDownPosition) {
    switch (true) {
      case this.rangeSlider.contains(mouseDownPosition):
        this.rangeSlider.isMovable = true;
        break;
      case this.startSlider.contains(mouseDownPosition):
        this.startSlider.isMovable = true;
        break;
      case this.endSlider.contains(mouseDownPosition):
        this.endSlider.isMovable = true;
        break;
    }
  }

  /**
   * Clear all interaction flags
   */
  clearInteract() {
    this.rangeSlider.isMovable = false;
    this.startSlider.isMovable = false;
    this.endSlider.isMovable = false;
  }

  /**
   * Draw position updates for any sliders that have been interaced with
   * @param {} currentPosition
   */

  draw(currentPosition) {
    //draw timeline container
    this.drawContainer();  

    this.drawTimeIncrements();
    
    
    this.startSlider.drawImage(currentPosition);
    this.rangeSlider.drawImage(currentPosition);    
    this.endSlider.drawImage(currentPosition);

    //updateranges
    this.startSlider.range = {min: this._slideBounds.x - 10, max: this.rangeSlider.position.x - (this.startSlider.width/2)}
    this.rangeSlider.range = {min: this.startSlider.position.x + this.rangeSlider.width,  max: this.endSlider.position.x}
    this.endSlider.range = {min: this.rangeSlider.position.x + (this.endSlider.width), max: this._slideBounds.width + this._slideBounds.x + 10}


    //limit range of path to range of range slider
    if (this.rangeSliderSelected && 
      currentPosition.x <= this.rangeSlider.range.max &&
      currentPosition.x >= this.rangeSlider.range.min ) {
      //set point to highlihg and move highlight
      this.currentPath.currentPoint = Math.floor(
        (this.currentPath.points.length *
          (currentPosition.x - this._slideBounds.x)) /
          this._slideBounds.width
      );
    }

  }

  /**
   * Draw timeline container
   */
  drawContainer() {
    this.timelineContext.clearRect(
      this._bounds.x,
      this._bounds.y,
      this._bounds.width,
      this._bounds.height
    );

    this.timelineContext.beginPath();
    this.timelineContext.fillStyle = this.backgroundColor;
    this.timelineContext.fillRect(
      this._bounds.x,
      this._bounds.y,
      this._bounds.width,
      this._bounds.height
    );

    this.timelineContext.beginPath();
    this.timelineContext.fillStyle = "rgba(0,0,0,0.2)";
    this.timelineContext.fillRect(
      this._slideBounds.x,
      this._slideBounds.y,
      this._slideBounds.width,
      this._slideBounds.height
    );
  }

  /**
   * Draw time increments
   */
  drawTimeIncrements(qty){

    qty=25;

    let timeDiff = new Date(this.currentPath.points[this.currentPath.points.length-1].data.timeStamp) - new Date(this.currentPath.points[0].data.timeStamp),
        increment = (this._slideBounds.width - this.rangeSlider.width) /qty;

    this.timelineContext.font = "8px Arial";
    this.timelineContext.textAlign = "center";
    this.timelineContext.fillStyle = "rgba(255,255,255,0.8)";
    this.timelineContext.strokeStyle = "rgba(255,255,255,0.3)";
    
    for (var i=0, x=0; i<=qty; i++, x+=increment ){
      this.timelineContext.beginPath();
      this.timelineContext.fillText(geoUtils.timeConversion(timeDiff/qty*i), this._slideBounds.x + (this.rangeSlider.width/2) + x,10)
      this.timelineContext.moveTo(this._slideBounds.x + (this.rangeSlider.width/2) + x, this._slideBounds.y);
      this.timelineContext.lineTo(this._slideBounds.x + (this.rangeSlider.width/2) + x, this._slideBounds.y + this._slideBounds.height);
      this.timelineContext.stroke();
    }
    
  }

  
}
