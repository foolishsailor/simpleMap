const geoUtils = (function(){
    //get bounds of GEO data
        /**
     * Get boundaries of data as rectangle coords
     */
    return {
        getBoundingBox: function(data){
            return data.reduce(
            function(a, c) {
                return {
                xMin: c.lon < a.xMin ? c.lon : a.xMin,
                xMax: c.lon > a.xMax ? c.lon : a.xMax,
                yMin: c.lat < a.yMin ? c.lat : a.yMin,
                yMax: c.lat > a.yMax ? c.lat : a.yMax
                };
            },
            {
                xMin: data[0].lon,
                xMax: data[0].lon,
                yMin: data[0].lat,
                yMax: data[0].lat
            }
            );
        },
    
        /**
         * Convert lat/lon to mercator projection points
         */
        mercator: function(latitude, longitude){
            const RADIUS = 6378137;
            const MAX = 85.0511287798;
            const RADIANS = Math.PI / 180;
            var point = {};
      
            point.lon = RADIUS * longitude * RADIANS;
            point.lat = Math.max(Math.min(MAX, latitude), -MAX) * RADIANS;
            point.lat = RADIUS * Math.log(Math.tan(Math.PI / 4 + point.lat / 2));
      
            return point;
          }

    }  
}());
