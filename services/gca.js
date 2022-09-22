// utils
import { GCAAPI } from "utils/axios";
import { logger } from "utils/logs";

import {
  DATA_LAYER_PAGE_ID,
  EXTREME_EVENTS_PAGE_HEADLINE,
  EXTREME_EVENTS_PAGE_ID,
  INFO_PAGE_HEADLINE,
  INFO_PAGE_ID
} from "components/app/home/main-container/component";

// API docs: https://resource-watch.github.io/doc-api/index-rw.html#dataset

/**
 * Fetches climate alert with id given
 * Check out the API docs for this endpoint {@link https://test.api.earthhq.org/documentation|here}
 * @returns {Object} climate alert.
 */
export const fetchClimateAlertById = id => {
  return GCAAPI.get(`/climate-alerts/${id}`, {
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

/**
 * Function that given parameters returns the title for the menu
 * @param {Headline | undefined} currentHeadline
 * @param {Mode | undefined} currentMode
 * @param {String} pageTypeId
 * @returns title for the menu
 */
export const getMenuTitle = (currentHeadline, currentMode, pageTypeId) => {
  if (currentHeadline) return currentHeadline.attributes.title;
  if (pageTypeId == INFO_PAGE_ID) return INFO_PAGE_HEADLINE;
  if (pageTypeId == EXTREME_EVENTS_PAGE_ID) return EXTREME_EVENTS_PAGE_HEADLINE;
  if (pageTypeId == DATA_LAYER_PAGE_ID && currentMode) return currentMode.attributes.title;
  return "Extreme Events";
};
