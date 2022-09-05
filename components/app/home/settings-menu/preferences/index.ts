import { connect } from "react-redux";
import { getSettingValueById, setSettingById } from "slices/globalSettings";
import { setGlobe2d, setGlobe3d, isGlobe2d } from "slices/mapControls";
import { RootState } from "store/types";
import PreferencesComponent from "./component";

export default connect(
  (state: RootState) => ({
    mapGridActive: getSettingValueById("showMapGrid")(state) as boolean,
    animationsActive: getSettingValueById("showAnimations")(state) as boolean,
    highDefinitionActive: getSettingValueById("showHighDefinition")(state) as boolean,
    is2D: isGlobe2d(state),
    isMobile: state.common.isMobile
  }),
  {
    setSettingById,
    setGlobe3d,
    setGlobe2d
  }
)(PreferencesComponent);
