const config = {
  // Camera settings.
  defaultZoom: 300,
  minZoom: 170,
  maxZoom: 1200,
  // Countries are shaded light if someone lives there and dark otherwise.
  lightCountryColor: "rgba(255,255,255, 1)",
  darkCountryColor: "rgba(255,255,255, 0.5)",
  // Points extend from places that people live or work.
  pointScalingFactor: 0.5,
  pointColor: "#ffffff",
  // Labels mark city names.
  labelColor: "#ffff00",
  firebaseUrl: "https://atlasatlas-1f9a2-default-rtdb.firebaseio.com"
};

export default config;
