import { useState, useEffect } from "react";
import { fetchWidgets } from "services/gca";
import TOPICS from "constants/news";
import { GCAWidget } from "./types";

type UseGCAWidgets = {
  /** True if widgets are being fetched from the endpoint. */
  isLoading: boolean;
  /** True if an error has occurred during the fetch. */
  hasErrored: boolean;
  /** An array of widgets from the endpoint. */
  widgets: GCAWidget[];
};

/**
 * Fetches widgets from the GCA endpoint based on predefined topics.
 *
 * @param topic - Widgets returned from the endpoint will be part of this topic
 */
const useGCAWidgets = (topic: keyof typeof TOPICS): UseGCAWidgets => {
  const [widgets, setWidgets] = useState<GCAWidget[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasErrored, setHasErrored] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setHasErrored(false);

      try {
        const response = await fetchWidgets({ category: topic });

        // Order the topics
        response.sort((a, b) => a.attributes.order - b.attributes.order);

        setWidgets(response as GCAWidget[]);
      } catch (err) {
        setHasErrored(true);
      }

      setIsLoading(false);
    })();
  }, [topic]);

  return {
    isLoading,
    hasErrored,
    widgets
  };
};

export default useGCAWidgets;