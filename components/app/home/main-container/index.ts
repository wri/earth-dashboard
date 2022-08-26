import MainContainerComponent from "./component";
import { connect } from "react-redux";
import { setIsMobile } from "slices/common";
import { NAME as modesSliceName, setModes } from "slices/modes";
import { NAME as mapControlsSliceName } from "slices/mapControls";
import { NAME as headlineSliceName } from "slices/headlines";
import { RootState } from "store/types";

export default connect(
  (state: RootState) => {
    console.log(state);
    return {
      dateOfDataShown: new Date(state[modesSliceName].dateOfDataShown),
      layersLabelArr: state[modesSliceName].layersLabelArr,
      shouldFadeControls: state[mapControlsSliceName].isDatePickerOpen || state[mapControlsSliceName].isSettingsOpen,
      currentHeadline: state[headlineSliceName].currentHeadline,
      currentHeadlineId: state[headlineSliceName].currentHeadlineId
    };
  },
  {
    setModes,
    setIsMobile
  }
)(MainContainerComponent);
