import { setShouldFetchLocation, shouldFetchLocation, isFetchLocationDisabled } from "slices/mapControls";

const location = {
  key: "location",
  name: "location",
  isActiveSelector: shouldFetchLocation,
  getDispatch: () => () => setShouldFetchLocation(true),
  isDisabledSelector: isFetchLocationDisabled,
  "aria-label": "Get current location"
};

export default location;
