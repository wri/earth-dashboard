// utils
import { GCAAPI } from "utils/axios";
import { logger } from "utils/logs";

// API docs: https://resource-watch.github.io/doc-api/index-rw.html#dataset

/**
 * Fetch all headlines
 * Check out the API docs for this endpoint {@link https://test.api.earthhq.org/documentation|here}
 * @returns {Array} Array of templates.
 * be included in the response or not.
 */
export const fetchHeadlines = () => {
  return GCAAPI.get("/headlines", {
    headers: {
      ...GCAAPI.defaults.headers
    }
  }).catch(response => {
    const { status, statusText } = response;

    logger.error(`Error fetching headlines: ${status}: ${statusText}`);
    throw new Error(`Error fetching headlines: ${status}: ${statusText}`);
  });
};

/**
 * Fetch all templates
 * Check out the API docs for this endpoint {@link https://test.api.earthhq.org/documentation|here}
 * @returns {Array} Array of templates.
 * be included in the response or not.
 */
export const fetchTemplates = () => {
  return GCAAPI.get("/templates", {
    headers: {
      ...GCAAPI.defaults.headers
    }
  }).catch(response => {
    const { status, statusText } = response;

    logger.error(`Error fetching templates: ${status}: ${statusText}`);
    throw new Error(`Error fetching templates: ${status}: ${statusText}`);
  });
};
