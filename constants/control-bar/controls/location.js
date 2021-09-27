import { setShouldFetchLocation, shouldFetchLocation } from "slices/mapControls";
import locationIcon from "public/static/icons/location.svg";

const location = {
  key: "location",
  icon: locationIcon,
  isActiveSelector: shouldFetchLocation,
  getDispatch: () => () => setShouldFetchLocation(true),
  shouldDisableOnActive: true,
  "aria-label": "Get current location"
};

export default location;
