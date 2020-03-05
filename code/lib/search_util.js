  var dates = require('dates')
  
  module.exports = {
    timeToMili: timeToMili,
    insidePointRadius: insidePointRadius
  }
  
  function timeToMili(time) {
    //TODO consider zone offset
    var timeStr
    if (time instanceof Object && "hour" in time) {
      var hour = ("amPM" in time && String(time.amPM) == 'Pm') ? Number(time.hour) + 12 : Number(time.hour)
      var minute = ("minute" in time && time.minute ? time.minute : "00")
      //sanity check
      timeStr = hour + ":" + (String(minute).length < 2 ? "0" + minute : minute)
      return  dates.ZonedDateTime.parseTime(timeStr, "H:mm").getMillisFromEpoch()
    }
    return null //TODO error handling
  }

  function distance(point1, point2, unit) {
    var R = unit == "Miles" ? 3958 : 6371;  //radius of earth
    var dLat = toRad(point2.latitude-point1.latitude);
    var dLon = toRad(point2.longitude-point1.longitude);
    var lat1 = toRad(point1.latitude);
    var lat2 = toRad(point2.latitude);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
  }

  function insidePointRadius(point, pointRadius) {
    return distance(point, pointRadius.centroid, pointRadius.radius.unit) < pointRadius.radius.magnitude
  }

  // Converts numeric degrees to radians
  function toRad(value)
  {
      return value * Math.PI / 180;
  }
