import { useState, useEffect } from "react";
import Parser from "rss-parser";
import { NOW_THIS_EARTH_RSS_URL } from "utils/news";

export const parser = new Parser({
  customFields: {
    item: [
      ["media:thumbnail", "thumbnail"],
      ["media:content", "link"]
    ]
  }
});

const useNowThisVideos = topic => {
  const [ videos, setVideos ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ hasErrored, setHasErrored ] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    setHasErrored(false);

    try {
      const feed = await parser.parseURL(NOW_THIS_EARTH_RSS_URL);
      setVideos(feed.items);
    } catch (error) {
      setHasErrored(true);
    }

    setIsLoading(false);
  }, []); // TODO: Add "topic" to this array when keywords are added to the feed

  return {
    videos,
    isLoading,
    hasErrored
  };
};

export default useNowThisVideos;
