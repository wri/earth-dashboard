import { useEffect, useState } from "react";
import passiveIfSupported from "helpers/passiveIfSupported";

const getWindowDimensions = () => {
  if (process.browser) {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  return {
    width: 0,
    height: 0
  };
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    if (process.browser) {
      window.addEventListener("resize", handleResize, passiveIfSupported);
      return () => window.removeEventListener("resize", handleResize, passiveIfSupported);
    }
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
