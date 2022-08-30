import { connect } from "react-redux";
import { getSettingValueById, setSettingById } from "slices/globalSettings";
import { RootState } from "store/types";
import PreferencesComponent from "./component";

export default connect(
  (state: RootState) => ({
    mapGridActive: getSettingValueById("show-map-grid")(state),
    animationsActive: getSettingValueById("animations")(state),
    highDefinitionActive: getSettingValueById("high-definition-mode")(state)
  }),
  {
    setSettingById
  }
)(PreferencesComponent);
