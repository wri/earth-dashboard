import { useState, useEffect } from "react";
import { fetchCarouselWidgets, fetchWidgets } from "services/gca";
import TOPICS from "constants/news";
import { GCAWidget } from "./types";

type UseGCAWidgets = {
  /** True if widgets are being fetched from the endpoint. */
  isLoading: boolean;
  /** True if an error has occurred during the fetch. */
  hasErrored: boolean;
  /** An array of widgets from the endpoint. */
  widgets: GCAWidget[];
  /** An array of widgets for the featured carousel. */
  featuredWidgets: GCAWidget[];
};

/**
 * Fetches widgets from the GCA endpoint based on predefined topics.
 * @param topic - Widgets returned from the endpoint will be part of this topic
 */
const useGCAWidgets = (topic?: keyof typeof TOPICS): UseGCAWidgets => {
  const [widgets, setWidgets] = useState<GCAWidget[]>([]);
  const [featuredWidgets, setFeaturedWidgets] = useState<GCAWidget[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasErrored, setHasErrored] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setHasErrored(false);

      try {
        const response = await fetchWidgets({ category: topic });

        // Order the topics
        response.sort((a: any, b: any) => a.attributes.order - b.attributes.order);

        setWidgets(response as GCAWidget[]);
      } catch (err) {
        setHasErrored(true);
      }

      try {
        const response = await fetchCarouselWidgets();

        setFeaturedWidgets(response as GCAWidget[]);
      } catch (err) {
        setHasErrored(true);
      }
      setIsLoading(false);
    })();
  }, [topic]);

  return {
    isLoading,
    hasErrored,
    widgets,
    featuredWidgets
  };
};

export default useGCAWidgets;
