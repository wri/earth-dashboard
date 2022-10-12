import MainContainerComponent from "./component";
import { connect } from "react-redux";
import { setIsMobile } from "slices/common";
import { RootState } from "store/types";
import { setModes, setPageTypeId, setCurrentMode, setDateOfDataShown, setCurrentVisibleMode } from "slices/modes";
import { setHeadlines } from "slices/headlines";
import {
  setCurrentLocation,
  setCurrentScale,
  setEventScaleData,
  setReoriented,
  setCurrentScaleBy
} from "slices/mapControls";

export default connect(
  (state: RootState) => ({
    layersLabelArr: state.modes.layersLabelArr,
    shouldFadeControls: state.mapControls.isDatePickerOpen || state.mapControls.isSettingsOpen,
    currentHeadline: state.headlines.currentHeadline,
    headlines: state.headlines.headlines,
    currentMode: state.modes.currentMode,
    defaultMode: state.modes.defaultMode,
    pageTypeId: state.modes.pageTypeId,
    currentHeadlineId: state.headlines.currentHeadlineId
  }),
  {
    setModes,
    setIsMobile,
    setHeadlines,
    setPageTypeId,
    setReoriented,
    setEventScaleData,
    setCurrentMode,
    setDateOfDataShown,
    setCurrentLocation,
    setCurrentScale,
    setCurrentScaleBy,
    setCurrentVisibleMode
  }
)(MainContainerComponent);
