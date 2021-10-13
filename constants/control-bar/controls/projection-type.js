import { setGlobe2d, setGlobe3d, isGlobe2d } from "slices/mapControls";
import twoDIcon from "public/static/icons/2D-toggle.svg";
import threeDIcon from "public/static/icons/3D-toggle.svg";
import styles from "components/app/home/map-controls/map-controls.module.scss";

const projectionTypeConfig = {
  key: "projection-type-control",
  className: styles["c-map-controls--projection-type"],
  icon: twoDIcon,
  activeIcon: threeDIcon,
  isActiveSelector: isGlobe2d,
  getDispatch: isActive => (isActive ? setGlobe3d : setGlobe2d),
  disabled: false,
  "aria-label": "Toggle 2D Globe"
};

export default projectionTypeConfig;
