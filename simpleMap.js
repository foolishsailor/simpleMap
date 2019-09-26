const simpleMap = function({
    containerName = "mapContainer",
    itemName = "mapCanvas",
    height = 100,
    width = 100,
    padding = 10,
    pathColor = "white",
    pathWidth = 2,
    backgroundColor,
    resize = false
  }){

    var _containerName = containerName,
        _itemName = itemName,
        _height = height,
        _width = width,
        _padding = padding,
        _pathColor = pathColor,
        _pathWidth = pathWidth,
        _backgroundColor = backgroundColor,
        _resize = resize,
        _canvas = document.createElement("canvas"),
        _context = _canvas.getContext("2d");
        _context.lineCap = "round";
        
        //convert lat/lon to mercartor projection
        const _mercator = (latitude, longitude) => {
          const RADIUS = 6378137;
          const MAX = 85.0511287798;
          const RADIANS = Math.PI / 180;
          var point = {};

          point.lon = RADIUS * longitude * RADIANS;
          point.lat = Math.max(Math.min(MAX, latitude), -MAX) * RADIANS;
          point.lat = RADIUS * Math.log(Math.tan(Math.PI / 4 + point.lat / 2));

          return point;
        }

        //get bounds of GEO data
        const _getBoundingBox = (data) => {
          return data.reduce(function(a, c){
              return {      
                  xMin : c.lon < a.xMin ? c.lon : a.xMin,
                  xMax : c.lon > a.xMax ? c.lon : a.xMax,
                  yMin : c.lat < a.yMin ? c.lat : a.yMin,
                  yMax : c.lat > a.yMax ? c.lat : a.yMax

              }
            }, {
                  xMin : data[0].lon, 
                  xMax: data[0].lon,
                  yMin : data[0].lat, 
                  yMax: data[0].lat
              }
          )
        }

        

        //create canvas and attach to dom element
        this.buildMap = () =>{  
  
          _canvas.id = _itemName;      
          document.getElementById(_containerName).appendChild(_canvas);
      
          //size map
          _context.canvas.height = _height;
          _context.canvas.width = _width; 

        }

        this.eraseMap = () => {
          _context.clearRect(0, 0, _canvas.width, _canvas.height);
        }

        //clear any existing canvas in container element
        this.removeCanvas = () => {         
          
          let children = document.getElementById(_containerName).querySelectorAll("canvas") || [];
      
          children.forEach(child => {
              child.parentNode.removeChild(child);
          });
        }

        //draw map
        this.drawPath = (data) => {
          var bounds,
              xScale,
              yScale,
              scale,
              points = []; 
          
       
          // Loop over the data and convert all lat/lon to _mercator projection
          points = data.map(e => _mercator(e.lat, e.lon));
       
          //get bounds of data using _mercator projection data
          bounds = _getBoundingBox(points);
      
          // Determine how much to scale our coordinates by
          xScale = (width - padding * 2) / Math.abs(bounds.xMax - bounds.xMin);
          yScale = (height - padding * 2) / Math.abs(bounds.yMax - bounds.yMin);
          scale = xScale < yScale ? xScale : yScale;
      
          //apply scale and padding to each point
          points.forEach(mercatorpoint => {
            mercatorpoint.x = (mercatorpoint.lon - bounds.xMin) * scale + _padding;
            mercatorpoint.y = (bounds.yMax - mercatorpoint.lat) * scale + _padding;
          });
      
      
          //get new size for map
          if (_resize) {
            _context.canvas.height = Math.max(...points.map(e => e.y)) + _padding;
            _context.canvas.width = Math.max(...points.map(e => e.x)) + _padding;
          }
      
          //background color or transparent
          if (typeof _backgroundColor != "undefined") {
            _context.fillStyle = _backgroundColor;
            _context.fillRect(0, 0, _context.canvas.width, _context.canvas.height);
          }
      
          //draw map
          for (var j = 0; j < points.length; j++) {
            // If this is the first coordinate in a shape, start a new path
            if (j === 0) {
              _context.beginPath();
              _context.strokeStyle = _pathColor;
              _context.lineWidth = _pathWidth;
              _context.moveTo(points[j].x, points[j].y);
      
          // Otherwise just keep drawing
            } else {
              _context.lineTo(points[j].x, points[j].y);
            }
      
            _context.stroke();
          }
        }  
  }



