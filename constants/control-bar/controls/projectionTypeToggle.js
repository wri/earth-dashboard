import { setGlobe2d, setGlobe3d, isGlobe2d } from "slices/mapControls";
import twoDIcon from "public/static/icons/2dtoggle.svg";
import styles from "components/app/home/map-controls/map-controls.module.scss";

const projectionTypeToggleConfig = {
  key: "projectionTypeToggle",
  className: styles["c-map-control-toggle--2d-toggle"],
  icon: twoDIcon,
  isActiveSelector: isGlobe2d,
  getDispatch: isActive => (isActive ? setGlobe3d : setGlobe2d),
  disabled: false,
  isToggle: true,
  "aria-label": "Toggle 2D Globe"
};

export default projectionTypeToggleConfig;
