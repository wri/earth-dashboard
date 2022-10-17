import MainContainerComponent from "./component";
import { connect } from "react-redux";
import { setIsMobile } from "slices/common";
import { RootState } from "store/types";
import {
  setModes,
  setPageTypeId,
  setCurrentMode,
  setDateOfDataShown,
  setCurrentVisibleMode,
  setPreviousPageTypeId,
  setModesLoading
} from "slices/modes";
import { setHeadlines, setHeadlinesLoading } from "slices/headlines";
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
    previousPageTypeId: state.modes.previousPageTypeId,
    currentHeadlineId: state.headlines.currentHeadlineId,
    modesLoading: state.modes.modesLoading
  }),
  {
    setModes,
    setIsMobile,
    setHeadlines,
    setHeadlinesLoading,
    setPageTypeId,
    setPreviousPageTypeId,
    setReoriented,
    setEventScaleData,
    setCurrentMode,
    setDateOfDataShown,
    setCurrentLocation,
    setCurrentScale,
    setCurrentScaleBy,
    setCurrentVisibleMode,
    setModesLoading
  }
)(MainContainerComponent);
