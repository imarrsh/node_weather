module.exports = function windDirection(bearing){
  const maxDeg = 360; // full circle
  const cardinals = [
    "N","N-NE", "NE", "E-NE", "E",
    "E-SE", "SE", "S-SE", "S", "S-SW", 
    "SW", "W-SW", "W", "W-NW", "NW", "N-NW"
  ];
  // how much of the pie consitutes a region?
  const region = maxDeg / cardinals.length; // 22.5°
  // add half a region amount to the bearing
  let adjustedBearing = bearing + (region / 2);
  // if greater than max, then subtract max
  if (adjustedBearing >= maxDeg){
    adjustedBearing = adjustedBearing - maxDeg;
  }
  // return the region we're blowing at
  return cardinals[Math.floor((adjustedBearing / region))];

};
