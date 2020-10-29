import { useMediaQuery } from 'react-responsive';

const breakpoints = {
  small: 0,
  medium: 780,
  large: 1024,
  xlarge: 1260,
  xxlarge: 1560
};

const getShowMobileVersion = () => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: breakpoints.medium });
  const isTabletOrMobileDevice = useMediaQuery({
    query: `(max-device-width: ${breakpoints.large}px)`
  });
  return isTabletOrMobileDevice || isTabletOrMobile;
}

export {
  breakpoints,
  getShowMobileVersion
};
