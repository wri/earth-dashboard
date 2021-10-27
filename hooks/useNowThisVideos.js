import { useState, useEffect } from "react";
import Parser from "rss-parser";
import { NOW_THIS_EARTH_RSS_URL } from "utils/news";
import { pluralisedTopicNames } from "constants/news";

export const parser = new Parser({
  customFields: {
    item: [
      ["media:thumbnail", "thumbnail"],
      ["media:content", "link"],
      ["media:keywords", "topic"]
    ]
  }
});

const useNowThisVideos = topic => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    setHasErrored(false);
    setVideos([]);

    try {
      const feed = await parser.parseURL(NOW_THIS_EARTH_RSS_URL);
      const videos = feed.items.filter(video => video.topic === topic || video.topic === pluralisedTopicNames[topic]);

      setVideos(videos);
    } catch (error) {
      setHasErrored(true);
    }

    setIsLoading(false);
  }, [ topic ]);

  return {
    videos,
    isLoading,
    hasErrored
  };
};

export default useNowThisVideos;
