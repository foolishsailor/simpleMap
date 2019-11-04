import { geoUtils } from "./geoUtils.js";
import { Timeline } from "./timeline.js";
import { Path } from "./Path.js";
import { clock } from "./clock.js";

export const SimpleMap = function({
  containerName = "mapContainer",
  tinelineContainerName = "timelineContainer",
  height = 100,
  width = 100,
  padding = 10,
  pathColor = "white",
  pathWidth = 2,
  backgroundColor,
  resize = false
}) {
  var canvasBounds,
    timeline,
    pathCanvas = document.createElement("canvas"),
    pathOverlayCanvas = document.createElement("canvas"),
    pathOverlayContext = pathOverlayCanvas.getContext("2d"),
    pathContext = pathCanvas.getContext("2d"),
    path,
    mouseDownPosition,
    mouseDown = false;

  const handleMouseDown = e => {
    mouseDown = true;
    mouseDownPosition = {
      x: e.clientX - canvasBounds.left,
      y: e.clientY - canvasBounds.top
    };
    timeline.interact(mouseDownPosition);
  };

  const handleMouseUp = () => {
    mouseDown = false;
    mouseDownPosition = {};
    console.log("Mouse Up");
  };

  const handleMouseOut = () => {
    mouseDown = false;
    mouseDownPosition = {};
    console.log("Mouse Out");
  };

  const handleMouseMove = e => {
    if (mouseDown) {

      //update position of sliders and if slider is range slider then update path highlight
      if (timeline.rangeSliderSelected) {

        //calc didstance to left or right as percentage of width to get the index of the path objects in path
   
        //set point to highlihg and move highlight
        path.currentPoint =  Math.floor(
          (path.points.length *
            (e.clientX - canvasBounds.left - timeline.bounds.x)) /
            (timeline.bounds.width)
        );
        
       
      }

    }
  };

  /********************** PUBLIC METHODS *****************/

  /**
   *   Create canvas and attach to dom element
   */

  this.buildMap = () => {
    pathCanvas.id = "pathCanvas";
    pathCanvas.setAttribute("z-index", 1);
    pathOverlayCanvas.id = "pathOverlayCanvas";
    pathOverlayCanvas.setAttribute("z-index", 0);

    document.getElementById(containerName).appendChild(pathCanvas);
    document.getElementById(containerName).appendChild(pathOverlayCanvas);

    pathContext.canvas.height = height;
    pathContext.canvas.width = width;

    //background color or transparent
    if (typeof backgroundColor != "undefined") {
      pathContext.fillStyle = backgroundColor;
      pathContext.fillRect(
        0,
        0,
        pathContext.canvas.width,
        pathContext.canvas.height
      );
    }

    pathOverlayContext.canvas.height = height;
    pathOverlayContext.canvas.width = width;

    canvasBounds = pathContext.canvas.getBoundingClientRect();

    // Build TImeline container
    timeline = new Timeline({
      container: tinelineContainerName,
      bounds: {
        x: 0,
        y: 0,
        width: pathOverlayContext.canvas.width,
        height: 60
      },
      backgroundColor: "rgba(0,0,0,0.2)"
    });

    clock.start();

    //attache mouse event listeners
    pathOverlayContext.canvas.onmousedown = handleMouseDown;
    pathOverlayContext.canvas.onmouseup = handleMouseUp;
    pathOverlayContext.canvas.onmouseout = handleMouseOut;
    pathOverlayContext.canvas.onmousemove = handleMouseMove;
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
    path = new Path({
      ctx: pathContext,
      overlayCtx: pathOverlayContext,
      points: data,
      pathWidth: 1,
      pathColor: "rgba(255,255,255,1)"
    });

    timeline.path = path;
  };

  /**
   * Draw initial rendering of path
   */
  this.loadMap = () => {
    pathContext.clearRect(0, 0, pathCanvas.width, pathCanvas.height);

    //draw geojson path
    path.drawPath();

    //set point to highlihg and move highlight
    path.currentPoint = 0;
    
  };

  /**
   *   Clear canvas
   */
  this.eraseMap = () => {
    pathContext.clearRect(0, 0, pathCanvas.width, pathCanvas.height);
    pathOverlayContext.clearRect(0, 0, pathCanvas.width, pathCanvas.height);
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
