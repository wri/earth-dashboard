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

//   // The spotlight's text or screen location has changed, so update the floating label next to the marker (if any).
//   function drawSpotlightText() {
//     const tooltip = d3.select("#tooltip");
//     const {text} = spotlight;
//     const {coordinates} = spotlight.marker.geometry;
//     if (coordinates !== undefined && text !== undefined) {
//         // Get the screen x,y position for the geo coordinates.
//         const [x, y] = currentProjection(coordinates) ?? [];
//         // Ugh. Use a _different_ technique to determine if the marker is actually visible and not hidden on the
//         // far side of the globe. Ideally the [x,y] point above would be undefined for coordinates on the far side,
//         // but unfortunately it's not. So do this check to avoid drawing a label for a marker that is not visible.
//         const isVisible = !!d3.geoPath().projection(currentProjection)(spotlight.marker);
//         if (isVisible && x >= 0 && y >= 0) {
//             tooltip
//                 .text(spotlight.text ?? null)
//                 .style("left", `${x + 10}px`)
//                 .style("top", `${y + 10}px`)
//                 .attr("hidden", null);
//             return;
//         }
//     }
//     tooltip.text(null).attr("hidden", "");
// }

export const getMarkerProperties = (marker, projection) => {
  if (marker && projection) {
    const { coordinates } = marker.geometry;
    const [x, y] = projection(coordinates) ?? [];
    const isVisible = !!d3.geoPath().projection(projection)(marker);

    return { isVisible, x, y };
  }

  return null;
};
