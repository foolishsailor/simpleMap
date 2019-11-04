import {SimpleMap} from '../src/js/simpleMap.js';
import { geoUtils } from "../src/js/geoUtils.js";

let newMap = new SimpleMap({
    containerName: 'mapContainer',
    tinelineContainerName: 'timelineContainer',
    height: 500,
    width: 800,
    padding: 30,
});



newMap.buildMap();

newMap.addData(rawData.map(e => {

    //convert to mercator points
    let mercatorpoint = geoUtils.mercator(e.lat/10000000, e.lon/10000000);

    return{
        position: {
            lat: mercatorpoint.lat,
            lon: mercatorpoint.lon
        },        
        data: {
            timeStamp : e.timeStamp,
            time: e.timer,
            leg: e.leg,
            tackNumber: e.tackNumber,
            pointOfSail: e.pointOfSail,
            boatSpeed: e.boatSpeed/100,
            pitch: e.pitch/10,
            roll: e.roll/10,
            headingRaw: e.headingRaw/10,
            headingFiltered: e.headingFiltered/10,
            meanWind: e.meanWind/10,
            tackAngle: e.tackAngle/10,
            sog: e.sog/100,
            cog: e.cog/10,
            aws: e.aws/100,
            awa: e.awa/10
        }
    }
}));

newMap.loadMap();
