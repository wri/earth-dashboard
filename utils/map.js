import * as d3 from "utils/d3";
import { format } from "date-fns";

export const SAMPLE_OVERLAY_INDEX = 1;
export const SAMPLE_ANNOTATION_INDEX = 2;

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

const convertVectorToScalar = vector => {
  const [x, y] = vector;
  return Math.sqrt(x * x + y * y);
};

export const getOverlayData = (samples, layers) => {
  if (!samples || !samples[SAMPLE_OVERLAY_INDEX] || !samples[SAMPLE_OVERLAY_INDEX][0]) {
    return null;
  }

  return {
    ...samples[SAMPLE_OVERLAY_INDEX][0],
    str: getFriendlyOverlayDataBySamples(samples, layers)
  };
};

export const getAnnotationData = (samples, layers) => {
  if (!samples || !samples[SAMPLE_ANNOTATION_INDEX]) {
    return null;
  }

  return {
    ...samples[SAMPLE_ANNOTATION_INDEX],
    str: getFriendlyAnnotationDataBySamples(samples, layers)
  };
};

export const getFriendlyOverlayDataBySamples = (samples, layers) => {
  return getFriendlyDataStr(samples, layers, SAMPLE_OVERLAY_INDEX);
};

export const getFriendlyAnnotationDataBySamples = (samples, layers) => {
  return getFriendlyDataStr(samples, layers, SAMPLE_ANNOTATION_INDEX);
};

export const getFriendlyDataStr = (samples, layers, index) => {
  if (!samples || !layers || layers.length < 3 || samples.length < 3) {
    return null;
  }

  const sample = samples[index];
  const layer = layers[index];

  if (!sample || !layer) {
    return null;
  }

  let value = "",
    symbol = "",
    date = "";

  if (index === SAMPLE_OVERLAY_INDEX) {
    value = sample[0].value;
    symbol = sample[0].units;
  }

  if (index === SAMPLE_ANNOTATION_INDEX) {
    value = sample.frp;
    symbol = sample.units;
    date = sample.date ? `(${format(new Date(sample.date), "MMMM yy 'at' HH:mm")})` : "";
  }

  const unitDescriptor = layer.product.units[symbol];
  const layerDescription = layer.product.description ? `${layer.product.description}: ` : "";
  const v = Array.isArray(value) ? convertVectorToScalar(value) : value; // convert wind vector to scalar
  return v === +v ? `${layerDescription}${v.toFixed(unitDescriptor.precision)} ${symbol} ${date}`.trim() : undefined;
};
