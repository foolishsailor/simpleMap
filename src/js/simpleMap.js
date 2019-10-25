import {geoUtils} from './geoUtils.js';
import {mapUtils} from './mapUtils.js';


export const SimpleMap = function({
  containerName = "mapContainer",
  height = 100,
  width = 100,
  padding = 10,
  pathColor = "white",
  pathWidth = 2,
  backgroundColor,
  resize = false
}) {
  var mouseDown = false,
      startTimeIndicator = 0,
      endTimeIndicator = 0,
      canvasBounds,
      timeLineContainer,
      timeLineContainerBounds,
      pathCanvas = document.createElement("canvas"),
      overlayCanvas = document.createElement("canvas"),
      overlayContext = overlayCanvas.getContext("2d"),
      pathContext = pathCanvas.getContext("2d");
      this.points = [];

  //Draw path on map
  const drawPath = () =>{
    //get new size for map
    if (resize) {
     pathContext.canvas.height = Math.max(...this.points.map(e => e.y)) + padding;
     pathContext.canvas.width = Math.max(...this.points.map(e => e.x)) + padding;
     canvasBounds = pathContext.canvas.getBoundingClientRect();
     
   }

   //background color or transparent
   if (typeof backgroundColor != "undefined") {
     pathContext.fillStyle = backgroundColor;
     pathContext.fillRect(0, 0, pathContext.canvas.width, pathContext.canvas.height);
   }

   //draw map
   for (var j = 0; j < this.points.length; j++) {
     // If this is the first coordinate in a shape, start a new path
     if (j === 0) {
       pathContext.beginPath();
       pathContext.strokeStyle = pathColor;
       pathContext.lineWidth = pathWidth;
       pathContext.moveTo(this.points[j].x, this.points[j].y);

       // Otherwise just keep drawing
     } else {
       pathContext.lineTo(this.points[j].x, this.points[j].y);
     }
     
   }

   pathContext.stroke();

 };

 

  const handleMouseDown = (e) =>{    
    if (timeLineContainer.contains(e.clientX-canvasBounds.left, e.clientY-canvasBounds.top)) mouseDown = true;
    startTimeIndicator = e.clientX-canvasBounds.left-timeLineContainerBounds.x;
    mapUtils.drawStartIndicator(pathContext, startTimeIndicator, timeLineContainerBounds);
  }

  const handleMouseUp = () =>{
    mouseDown = false;
    console.log('Mouse Up')
  }

  const handleMouseOut = () =>{
    console.log('Mouse Out')
  }

  const handleMouseMove = (e) =>{ 
    if (mouseDown){
      let index = Math.floor(this.points.length * (e.clientX-canvasBounds.left)/timeLineContainerBounds.width);

      startTimeIndicator = e.clientX-canvasBounds.left-timeLineContainerBounds.x;
      mapUtils.drawStartIndicator(pathContext, startTimeIndicator, timeLineContainerBounds);
      mapUtils.drawPathHighlight(overlayContext, this.points[index]);
   }  

  }

  
  /********************** PUBLIC METHODS *****************/

  /**
   *   Create canvas and attach to dom element
   */  
  this.buildMap = () => {
    pathCanvas.id = 'pathCanvas';
    pathCanvas.setAttribute('z-index', 1);
    overlayCanvas.id ='overlayCanvas';
    overlayCanvas.setAttribute('z-index', 0);

    
    document.getElementById(containerName).appendChild(pathCanvas);
    document.getElementById(containerName).appendChild(overlayCanvas);
    
    pathContext.canvas.height = height;
    pathContext.canvas.width = width;

    overlayContext.canvas.height = height;
    overlayContext.canvas.width = width;

    canvasBounds = pathContext.canvas.getBoundingClientRect();

    timeLineContainerBounds  = {
      x: 10,
      y: overlayContext.canvas.height - 60,
      width: overlayContext.canvas.width - 20,
      height: 50
    };

    //attache mouse event listeners
    overlayContext.canvas.onmousedown = handleMouseDown;
    overlayContext.canvas.onmouseup = handleMouseUp;
    overlayContext.canvas.onmouseout = handleMouseOut;
    overlayContext.canvas.onmousemove = handleMouseMove;

  };

  /**
   * Add data to map
   */
  this.addData = data => {
    var bounds, xScale, yScale, scale;

    //get bounds of data using mercator projection data
    bounds = geoUtils.getBoundingBox(data);

    // Determine how much to scale our coordinates by
    xScale = (width - padding * 2) / Math.abs(bounds.xMax - bounds.xMin);
    yScale = (height - padding * 2) / Math.abs(bounds.yMax - bounds.yMin);
    scale = xScale < yScale ? xScale : yScale;

    //apply scale and padding to each point
    data.forEach(mercatorpoint => {
      mercatorpoint.x = (mercatorpoint.lon - bounds.xMin) * scale + padding;
      mercatorpoint.y = (bounds.yMax - mercatorpoint.lat) * scale + padding;
    });

    this.points = data;

  };

  this.draw = () => {
    pathContext.clearRect(0,0,pathCanvas.width,pathCanvas.height);
    drawPath();
    
    timeLineContainer = mapUtils.drawTimeline(pathContext, timeLineContainerBounds, pathWidth, pathColor);
    mapUtils.drawStartIndicator(pathContext, startTimeIndicator, timeLineContainerBounds);
  }


  /**
   *   Clear canvas 
   */
  this.eraseMap = () => {
    pathContext.clearRect(0, 0, pathCanvas.width, pathCanvas.height);
    overlayContext.clearRect(0, 0, pathCanvas.width, pathCanvas.height);
  };


  /**
   *   Remove canvas from DOM
   */
  this.removeCanvas = () => {
    let children =
      document.getElementById(containerName).querySelectorAll("canvas") || [];

    children.forEach(child => {
      child.parentNode.removeChild(child);
    });
  };
  
};








