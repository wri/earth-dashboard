// utils
import { GCAAPI } from "utils/axios";
import { logger } from "utils/logs";

// API docs: https://resource-watch.github.io/doc-api/index-rw.html#dataset

/**
 * Fetch all climate alerts (headlines)
 * Check out the API docs for this endpoint {@link https://test.api.earthhq.org/documentation|here}
 * @returns {Array} Array of modes.
 * be included in the response or not.
 */
export const fetchClimateAlerts = () => {
  return GCAAPI.get("/climate-alerts", {
    headers: {
      ...GCAAPI.defaults.headers
    }
  }).catch(response => {
    const { status, statusText } = response;

    logger.error(`Error fetching climate alerts: ${status}: ${statusText}`);
    throw new Error(`Error fetching climate alerts: ${status}: ${statusText}`);
  });
};

/**
 * Fetch all modes
 * Check out the API docs for this endpoint {@link https://test.api.earthhq.org/documentation|here}
 * @returns {Array} Array of modes.
 * be included in the response or not.
 */
export const fetchModes = () => {
  return GCAAPI.get("/modes", {
    headers: {
      ...GCAAPI.defaults.headers
    }
  }).catch(response => {
    const { status, statusText } = response;

    logger.error(`Error fetching modes: ${status}: ${statusText}`);
    throw new Error(`Error fetching modes: ${status}: ${statusText}`);
  });
};
