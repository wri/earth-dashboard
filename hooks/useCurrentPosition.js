import { useEffect, useState } from "react";

const useCurrentPosition = shouldFetch => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(shouldFetch);

  useEffect(() => {
    const fetchLocation = async () => {
      const isBrowser = typeof window !== "undefined";
      if (!isBrowser || !window.navigator.geolocation) {
        return;
      }

      setIsFetching(true);
      setError(null);

      try {
        const { coords } = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );
        setCurrentPosition(coords);
      } catch (err) {
        setError(err);
      } finally {
        setIsFetching(false);
      }
    };

    if (shouldFetch) {
      fetchLocation();
    }
  }, [shouldFetch]);

  return { currentPosition, error, isFetching };
};

export default useCurrentPosition;
