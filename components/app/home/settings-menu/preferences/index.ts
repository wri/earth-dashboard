import { connect } from "react-redux";
import { getSettingValueById, setSettingById } from "slices/globalSettings";
import { setGlobe2d, setGlobe3d, isGlobe2d } from "slices/mapControls";
import { RootState } from "store/types";
import PreferencesComponent from "./component";

export default connect(
  (state: RootState) => ({
    mapGridActive: getSettingValueById("show-map-grid")(state),
    animationsActive: getSettingValueById("animations")(state),
    highDefinitionActive: getSettingValueById("high-definition-mode")(state),
    is2D: isGlobe2d(state),
    isMobile: state.common.isMobile
  }),
  {
    setSettingById,
    setGlobe3d,
    setGlobe2d
  }
)(PreferencesComponent);
