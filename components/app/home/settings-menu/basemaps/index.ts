import { connect } from "react-redux";
import { getSettingValueById, setSettingById } from "slices/globalSettings";
import BasemapsComponent from "./component";

export default connect(
  () => ({
    activeOptionId: getSettingValueById("basemaps")
  }),
  {
    setSettingById
  }
)(BasemapsComponent);
