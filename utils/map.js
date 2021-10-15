import * as d3 from "utils/d3";

export const colorAt = (colors, t) => {
  const n = colors.length / 4;
  const j = Math.round(t * (n - 1)) * 4;
  return d3.rgb(colors[j], colors[j + 1], colors[j + 2], colors[j + 3] / 255);
};

export const getIndicatorGeoJson = coordinates => {
  return {
    type: "Feature",
    geometry: { type: "Point", coordinates },
    properties: {
      fill: "#D63C00",
      stroke: "white",
      strokeWidth: 4,
      pointRadius: 10
    }
  };
};

/**
 * @param {array} payload a deconstructed d3 projection
 * @returns {Function} the reconstructed d3 projection
 */
export const getNewProjection = payload => {
  const proj = payload.name === "orthographic" ? d3.geoOrthographic() : d3.geoEquirectangular();
  return proj
    .clipAngle(payload.clipAngle)
    .clipExtent(payload.clipExtent)
    .scale(payload.scale)
    .translate(payload.translate)
    .center(payload.center)
    .angle(payload.angle)
    .reflectX(payload.reflectX)
    .reflectY(payload.reflectY)
    .rotate(payload.rotate)
    .precision(payload.precision);
};

export const getMarkerProperties = (marker, projection) => {
  if (marker && projection) {
    const { coordinates } = marker.geometry;
    const [x, y] = projection(coordinates) ?? [];
    const isVisible = !!d3.geoPath().projection(projection)(marker);

    return { isVisible, x, y };
  }

  return null;
};
