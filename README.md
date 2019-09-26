# simpleMap
small untility to convert a geoJSON array to X,Y coordinates on an HTML Canvas


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

## Usage
    

# author
JC Durbin

# License
Copyright (c) 2019  JC Durbin

Released under the MIT license. See LICENSE for details.
