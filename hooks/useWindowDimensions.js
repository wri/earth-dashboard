import { useEffect, useState } from "react";

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
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
