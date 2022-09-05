import { connect } from "react-redux";
import { BasemapType, getSettingValueById, setSettingById } from "slices/globalSettings";
import { setIsDatePickerOpen } from "slices/mapControls";
import { RootState } from "store/types";
import BasemapsComponent from "./component";

export default connect(
  (state: RootState) => ({
    activeOptionId: getSettingValueById("basemap")(state) as BasemapType,
    currentDate: new Date(state.modes.dateOfDataShown)
  }),
  {
    setSettingById,
    setIsDatePickerOpen
  }
)(BasemapsComponent);
