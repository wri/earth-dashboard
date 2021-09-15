// utils
import { GCAAPI } from "utils/axios";
import { logger } from "utils/logs";

// API docs: https://resource-watch.github.io/doc-api/index-rw.html#dataset

/**
 * Fetch all templates
 * Check out the API docs for this endpoint {@link |here}
 * @returns {Array} Array of templates.
 * be included in the response or not.
 */
export const fetchTemplates = () => {
  return GCAAPI.get("/templates", {
    headers: {
      ...GCAAPI.defaults.headers
    },
    params: {
      env: process.env.API_ENV,
      application: process.env.APPLICATIONS
    }
  }).catch(response => {
    const { status, statusText } = response;

    logger.error(`Error fetching templates: ${status}: ${statusText}`);
    throw new Error(`Error fetching templates: ${status}: ${statusText}`);
  });
};
