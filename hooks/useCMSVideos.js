import { useState, useEffect } from "react";
import { fetchVideos } from "services/gca";

const useCMSVideos = topic => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasErrored(false);
    setVideos([]);

    const fetch = async () => {
      try {
        const response = await fetchVideos({ category: topic });

        setVideos(response.data.data);
      } catch (error) {
        setHasErrored(true);
      }

      setIsLoading(false);
    };

    fetch();
  }, [topic]);

  return {
    videos,
    isLoading,
    hasErrored
  };
};

export default useCMSVideos;
