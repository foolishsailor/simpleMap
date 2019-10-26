import {geoUtils} from './geoUtils.js';
import {Timeline} from './timeline.js';
import {PathObj} from './pathObj.js';

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
      timelineIndicator = 0,
      canvasBounds,
      timeline,     
      pathCanvas = document.createElement("canvas"),
      overlayCanvas = document.createElement("canvas"),
      overlayContext = overlayCanvas.getContext("2d"),
      pathContext = pathCanvas.getContext("2d"),
      path;


  const handleMouseDown = (e) =>{    
    mouseDown = true;
    timeline.currentPosition = e.clientX-canvasBounds.left;
  }

  const handleMouseUp = () =>{
    mouseDown = false;
    console.log('Mouse Up')
  }

  const handleMouseOut = () =>{
    mouseDown = false;
    console.log('Mouse Out')
  }

  const handleMouseMove = (e) =>{ 
    if (mouseDown && e.clientX-canvasBounds.left >= timeline.bounds.x && e.clientX-canvasBounds.left <= timeline.bounds.width){
      //calc didstance to left or right as percentage of width to get the index of the path objects in path
      let index = Math.floor(path.points.length * (e.clientX-canvasBounds.left)/timeline.bounds.width);
      timeline.updatePosition(e.clientX-canvasBounds.left, path.points[index]);
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

    //background color or transparent
    if (typeof backgroundColor != "undefined") {
      pathContext.fillStyle = backgroundColor;
      pathContext.fillRect(0, 0, pathContext.canvas.width, pathContext.canvas.height);
    }

    overlayContext.canvas.height = height;
    overlayContext.canvas.width = width;

    canvasBounds = pathContext.canvas.getBoundingClientRect();
    
    // Build TImeline container
    timeline = new Timeline({
      ctx: overlayContext,
      bounds: {
        x: 0,
        y: overlayContext.canvas.height - 60,
        width: overlayContext.canvas.width,
        height: 60
      },
      backgroundColor: 'rgba(0,0,0,0.2)'
    });   

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

    //add path
    path = new PathObj({
      ctx: pathContext,
      points: data,
      pathWidth: 1,
      pathColor: 'rgba(255,255,255,1)'      
    })

  };

  /**
   * Draw initial rendering of path
   */
  this.draw = () => {
    pathContext.clearRect(0,0,pathCanvas.width,pathCanvas.height);
    path.drawPath();

    //draw timeline container  
    timeline.updatePosition(0, path.points[0]);      
    timeline.draw();

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








