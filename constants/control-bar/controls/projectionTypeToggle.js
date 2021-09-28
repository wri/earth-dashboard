import { setGlobe2d, setGlobe3d, isGlobe3d } from "slices/mapControls";
import twoDIcon from "public/static/icons/2dtoggle.svg";

const projectionTypeToggleConfig = {
  key: "projectionTypeToggle",
  icon: twoDIcon,
  isActiveSelector: isGlobe3d,
  getDispatch: isActive => (isActive ? setGlobe2d : setGlobe3d),
  disabled: false,
  "aria-label": "Toggle 2D Globe"
};

export default projectionTypeToggleConfig;
