import WRISerializer from "wri-json-api-serializer";

// utils
import { WRIAPI } from "utils/axios";
import { logger } from "utils/logs";

/**
 * Get all tags.
 * Check out the API docs for this endpoint {@link https://resource-watch.github.io/doc-api/index-rw.html#list-concepts|here}
 * @param {Object} params Request parameters to API.
 */
export const fetchAllTags = (params = {}) => {
  logger.info("Fetch all tags");
  return WRIAPI.get("graph/query/list-concepts", {
    headers: { "Upgrade-Insecure-Requests": 1 },
    params: {
      env: process.env.API_ENV,
      application: process.env.APPLICATIONS,
      ...params
    }
  })
    .then(response => response.data.data)
    .catch(response => {
      const { status, statusText } = response;
      logger.error(`Error fetching all tags: ${status}: ${statusText}`);
      throw new Error(`Error fetching all tags: ${status}: ${statusText}`);
    });
};

/**
 * Get inferred tags.
 * Check out the API docs for this endpoint {@link https://resource-watch.github.io/doc-api/index-rw.html#get-inferred-concepts|here}
 * @param {Object} params Request parameters to API.
 */
export const fetchInferredTags = (params = {}) => {
  logger.info("Fetch inferred tags");
  return WRIAPI.get("graph/query/concepts-inferred", {
    headers: { "Upgrade-Insecure-Requests": 1 },
    params: {
      env: process.env.API_ENV,
      application: process.env.APPLICATIONS,
      ...params
    }
  })
    .then(response => response.data.data)
    .catch(response => {
      const { status, statusText } = response;
      logger.error(`Error fetching inferred tags ${status}: ${statusText}`);
      throw new Error(`Error inferred tags ${status}: ${statusText}`);
    });
};

/**
 * Send a request to count a view to the dataset.
 * Check out the API docs for this endpoint {@link https://resource-watch.github.io/doc-api/index-rw.html#count-dataset-view|here}
 * @param {String} datasetId Dataset ID
 * @param {String} token User token
 * @param {Object} params Request parameters to API.
 */
export const countDatasetView = (datasetId, token, params = {}) => {
  logger.info("Count dataset view");
  return WRIAPI.post(
    `graph/dataset/${datasetId}/visited`,
    {},
    {
      headers: { Authorization: token },
      params: {
        env: process.env.API_ENV,
        application: process.env.APPLICATIONS,
        ...params
      }
    }
  ).catch(response => {
    const { status, statusText } = response;
    logger.error(`Error in count dataset view ${datasetId}: ${status}: ${statusText}`);
    throw new Error(`Error in count dataset view ${datasetId}: ${status}: ${statusText}`);
  });
};

/**
 * Get the list of most viewed datasets.
 * Check out the API docs for this endpoint {@link https://resource-watch.github.io/doc-api/index-rw.html#most-viewed-datasets|here}
 * @param {Object} params Request parameters to API.
 * @returns {Promise<string[]>} List of sorted ids
 */
export const fetchMostViewedDatasets = (params = {}) => {
  logger.info("Fetch most viewed datasets");
  return WRIAPI.get("graph/query/most-viewed", {
    params: {
      env: process.env.API_ENV,
      application: process.env.APPLICATIONS,
      ...params
    },
    headers: { "Upgrade-Insecure-Requests": 1 }
  })
    .then(response => WRISerializer(response.data))
    .catch(response => {
      const { status, statusText } = response;
      logger.error(`Error fetching most viewed datasets: ${status}: ${statusText}`);
      throw new Error(`Error fetching most viewed datasets: ${status}: ${statusText}`);
    });
};

/**
 * Get the list of most favourited datasets.
 * Check out the API docs for this endpoint {@link https://resource-watch.github.io/doc-api/index-rw.html#most-liked-datasets|here}
 * @param {Object} params Request parameters to API.
 */
export const fetchMostFavoritedDatasets = (params = {}) => {
  logger.info("Fetch most favorited datasets");
  return WRIAPI.get("graph/query/most-liked-datasets", {
    params: {
      env: process.env.API_ENV,
      application: process.env.APPLICATIONS,
      ...params
    },
    headers: { "Upgrade-Insecure-Requests": 1 }
  })
    .then(response => WRISerializer(response.data))
    .catch(response => {
      const { status, statusText } = response;
      logger.error(`Error fetching most favorited datasets: ${status}: ${statusText}`);
      throw new Error(`Error fetching most favorited datasets: ${status}: ${statusText}`);
    });
};

/**
 * Fetch similar datasets.
 * Check out the API docs for this endpoint {@link https://resource-watch.github.io/doc-api/index-rw.html#similar-datasets-including-ancestors|here}
 * @param {Object} params Request parameters to API.
 * @param {boolean} withAncestors Flag indicating whether tags' ancestors
 * should be considered or not
 */
export const fetchSimilarDatasets = (params = {}, withAncestors = true) => {
  logger.info("Fetch similar datasets");
  const endpoint = withAncestors ? "similar-dataset-including-descendent" : "similar-dataset";
  return WRIAPI.get(`graph/query/${endpoint}`, {
    params: {
      env: process.env.API_ENV,
      application: process.env.APPLICATIONS,
      ...params
    },
    headers: { "Upgrade-Insecure-Requests": 1 }
  })
    .then(response => response.data.data)
    .catch(response => {
      const { status, statusText } = response;
      logger.error(`Error fetching similart datasets ${status}: ${statusText}`);
      throw new Error(`Error fetching similart datasets ${status}: ${statusText}`);
    });
};

export default {
  fetchMostViewedDatasets,
  fetchMostFavoritedDatasets,
  fetchSimilarDatasets,
  countDatasetView,
  fetchInferredTags,
  fetchAllTags
};
