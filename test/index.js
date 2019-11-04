import {SimpleMap} from '../src/js/simpleMap.js';
import {geoUtils} from '../src/js/geoUtils.js';

let newMap = new SimpleMap({
    containerName: 'mapContainer',
    tinelineContainerName: 'timelineContainer',
    height: 500,
    width: 1000,
    padding: 30,
});



newMap.buildMap();

newMap.addData(parseD10Data(rawData).map(e => geoUtils.mercator(e.lat, e.lon)));
newMap.loadMap();
