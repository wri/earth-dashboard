// utils
import { GCAAPI } from "utils/axios";
import { logger } from "utils/logs";

import { INFO_PAGE_ID } from "components/app/home/main-container/component";
import { Mode } from "slices/modes";
import { Headline } from "slices/headlines";

// API docs: https://resource-watch.github.io/doc-api/index-rw.html#dataset

/**
 * Fetches climate alert with id given
 * Check out the API docs for this endpoint {@link https://test.api.earthhq.org/documentation|here}
 */
export const fetchClimateAlertById = async (id: string) => {
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
 */
export const fetchClimateAlerts = async (params?: object) => {
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
 */
export const fetchModes = async () => {
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
 */
export const fetchWidgets = async (params?: object) => {
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

/**
 * Fetch all Widgets for carousel.
 * Check out the API docs for this endpoint {@link https://test.api.earthhq.org/documentation|here}
 */
export const fetchCarouselWidgets = async () => {
  return GCAAPI.get("/widget-carousels", {
    headers: {
      ...GCAAPI.defaults.headers
    }
  })
    .then(response => {
      const {
        status,
        statusText,
        data: { data }
      } = response;

      if (status >= 300) {
        logger.error("Error fetching carousel widgets:", `${status}: ${statusText}`);
        throw new Error(statusText);
      }

      if (data.length === 0) return [];

      return data[0].relationships.widgets;
    })
    .catch(response => {
      const { status, statusText } = response;

      logger.error(`Error fetching carousel widgets: ${status}: ${statusText}`);
      throw new Error(`Error fetching carousel widgets: ${status}: ${statusText}`);
    });
};

export const fetchVideos = async (params?: object) => {
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

/** Function that given parameters returns the title for the menu. */
export const getMenuTitle = (
  currentHeadline: Headline | undefined,
  currentMode: Mode | undefined,
  pageTypeId: string
) => {
  if (currentHeadline) return currentHeadline.attributes.title;
  if (pageTypeId == INFO_PAGE_ID)
    return currentMode && currentMode.attributes.title !== "Default"
      ? currentMode.attributes.title
      : "All Extreme Events";
  return currentMode && currentMode.attributes.title !== "Default" ? currentMode.attributes.title : "Extreme Events";
};
