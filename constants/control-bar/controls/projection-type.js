import { setGlobe2d, setGlobe3d, isGlobe2d } from "slices/mapControls";

const projectionTypeConfig = {
  key: "projection-type-control",
  name: "2D-toggle",
  activeName: "3D-toggle",
  isActiveSelector: isGlobe2d,
  getDispatch: isActive => (isActive ? setGlobe3d : setGlobe2d),
  disabled: false,
  "aria-label": "Toggle 2D Globe"
};

export default projectionTypeConfig;
