// utils
import { GCAAPI } from "utils/axios";
import { logger } from "utils/logs";

// API docs: https://resource-watch.github.io/doc-api/index-rw.html#dataset

/**
 * Fetch all Latest Extreme Events (Climate Alerts)
 * Check out the API docs for this endpoint {@link https://test.api.earthhq.org/documentation|here}
 * @returns {Array} Array of modes.
 * be included in the response or not.
 */
export const fetchClimateAlerts = params => {
  return GCAAPI.get("/climate-alerts", {
    params,
    headers: {
      ...GCAAPI.defaults.headers
    }
  }).catch(response => {
    const { status, statusText } = response;

    logger.error(`Error fetching Latest Extreme Events: ${status}: ${statusText}`);
    throw new Error(`Error fetching Latest Extreme Events: ${status}: ${statusText}`);
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

/**
 * Fetch all Widgets
 * Check out the API docs for this endpoint {@link https://test.api.earthhq.org/documentation|here}
 *
 * @param {Object} params
 * @property {String} category - filter widgets by cateogry
 *
 * @returns {Array} an array of widgets
 */
export const fetchWidgets = params => {
  return GCAAPI.get("/widgets", {
    headers: {
      ...GCAAPI.defaults.headers
    },
    params: {
      ...params
    }
  })
    .then(response => {
      const {
        status,
        statusText,
        data: { data }
      } = response;

      if (status >= 300) {
        logger.error("Error fetching widgets:", `${status}: ${statusText}`);
        throw new Error(statusText);
      }

      return data;
    })
    .catch(response => {
      const { status, statusText } = response;

      logger.error(`Error fetching widgets: ${status}: ${statusText}`);
      throw new Error(`Error fetching widgets: ${status}: ${statusText}`);
    });
};

export const fetchVideos = params => {
  return GCAAPI.get("/videos", {
    headers: {
      ...GCAAPI.defaults.headers
    },
    params: {
      ...params
    }
  }).catch(response => {
    const { status, statusText } = response;

    logger.error(`Error fetching Videos: ${status}: ${statusText}`);
    throw new Error(`Error fetching Videos: ${status}: ${statusText}`);
  });
};
