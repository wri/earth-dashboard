import MainContainerComponent from "./component";
import { connect } from "react-redux";
import { setIsMobile } from "slices/common";
import { RootState } from "store/types";
import {
  setModes,
  setCurrentMode,
  setDateOfDataShown,
  setCurrentVisibleMode,
  setModesLoading,
  pagePush
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
    currentHeadlineId: state.headlines.currentHeadlineId,
    modesLoading: state.modes.modesLoading,
    routePageTypeId: state.modes.routePageTypeId
  }),
  {
    setModes,
    setIsMobile,
    setHeadlines,
    setHeadlinesLoading,
    setReoriented,
    setEventScaleData,
    setCurrentMode,
    setDateOfDataShown,
    setCurrentLocation,
    setCurrentScale,
    setCurrentScaleBy,
    setCurrentVisibleMode,
    setModesLoading,
    pagePush
  }
)(MainContainerComponent);
