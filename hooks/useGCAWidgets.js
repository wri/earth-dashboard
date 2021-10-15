import { useState, useEffect } from "react";
import { fetchWidgets } from "services/gca";

/**
 * Fetches widgets from the GCA endpoint based on predefined topics.
 * 
 * @param {String} topic - Widgets returned from the endpoint will be part of this topic
 * @returns {Object} response
 * @property {Boolean} isLoading
 *           True if widgets are being fetched from the endpoint
 * @property {Boolean} hasErrored
 *           True if an error has occurred during the fetch
 * @property {Array} widgets
 *           An array of widgets from the endpoint
 */
const useGCAWidgets = topic => {
  const [ widgets, setWidgets ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ hasErrored, setHasErrored ] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    setHasErrored(false);

    try {
      const response = await fetchWidgets({ category: topic });

      // Order the topics
      response.sort((a, b) => a.attributes.order - b.attributes.order);

      setWidgets(response);
    } catch (err) {
      setHasErrored(true)
    }

    setIsLoading(false);
  }, [topic]);

  return {
    isLoading,
    hasErrored,
    widgets
  };
};

export default useGCAWidgets;
