export const geoUtils = {
  /**
   * Get boundaries of data as rectangle coords
   */

  getBoundingBox: function(data) {
    
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
  mercator: function(latitude, longitude) {
    const RADIUS = 6378137;
    const MAX = 85.0511287798;
    const RADIANS = Math.PI / 180;
    var point = {};

    point.lon = RADIUS * longitude * RADIANS;
    point.lat = Math.max(Math.min(MAX, latitude), -MAX) * RADIANS;
    point.lat = RADIUS * Math.log(Math.tan(Math.PI / 4 + point.lat / 2));

    return point;
  },

  timeConversion(millisec) {
    var seconds = (millisec / 1000).toFixed(0);
    var minutes = Math.floor(seconds / 60);
    var hours = "";
    if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        hours = (hours >= 10) ? hours : "0" + hours;
        minutes = minutes - (hours * 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
    }

    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    if (hours != "") {
        return hours + ":" + minutes + ":" + seconds;
    }
    return minutes + ":" + seconds;
}
};
