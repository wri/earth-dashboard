import { connect } from "react-redux";
import { BasemapType, getSettingValueById, setSettingById } from "slices/globalSettings";
import { RootState } from "store/types";
import BasemapsComponent from "./component";

export default connect(
  (state: RootState) => ({
    activeOptionId: getSettingValueById("basemap")(state) as BasemapType
  }),
  {
    setSettingById
  }
)(BasemapsComponent);
