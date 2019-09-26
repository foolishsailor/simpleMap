# simpleMap
small utility to convert a geoJSON array to X,Y coordinates on an HTML Canvas


## Simple Example
### HTML
Create container element to hold the canvas element that will be created by the class

    <div id="chartContainer">
    </div>
    
### Javascript
#### Instantiate
    let newMap = new simpleMap({
        containerName: 'chartContainer',
        itemName: 'chartCanvas',
    });
#### Create and attach canvas to element
    newMap.buildMap();

#### Add data
    newMap.drawPath(data);
    
## Configuration
    new simpleMap({
                    containerName,              //Id of parent element - required
                    itemName = "mapCanvas",     //Id of canvas element to be created - required 
                    height,                     //Height of canvas - Default: 100px                    
                    width,                      //Width of canvas - Default: 100px
                    padding = 10,               //Padding around drawn path and edges of canvas - Default: 10 (px)
                    pathColor = "white",        //Color of path - Default: "white"
                    pathWidth = 2,              //Stroke width of path - Default: 2 (px)
                    backgroundColor,            //Background color of chart - Default: Transparent 
                    resize = false              //Resize the canvas element to fit drawn path and padding - Default: false
                  })

## Functions
### buildMap()
Creates canvas element and assigns the id = itemName and inserts it as a child to the containerName element 

### drawPath([data])
Takes and array of objects with Lat/Lon in Decimal format  
  #### Data Format
    [
        {
            Lat: -32.43434
            Lon: 4.51234
        },
        {
            Lat: -34.44536 
            Lon: 6.11234
        },
        {
            Lat: -32.8766 
            Lon: 8.11234
        }
    ]
    
### eraseMap()
Clears the canvas of any paths drawn on it

### removeCanvas()
Removes the canvas element entirely from the parent container


# author
JC Durbin

# License
Copyright (c) 2019  JC Durbin

Released under the MIT license. See LICENSE for details.
