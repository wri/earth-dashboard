import { setShouldFetchLocation, shouldFetchLocation, isFetchLocationDisabled } from "slices/mapControls";
import locationIcon from "public/static/icons/location.svg";

const location = {
  key: "location",
  icon: locationIcon,
  isActiveSelector: shouldFetchLocation,
  getDispatch: () => () => setShouldFetchLocation(true),
  isDisabledSelector: isFetchLocationDisabled,
  "aria-label": "Get current location"
};

export default location;
