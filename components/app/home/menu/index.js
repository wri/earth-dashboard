import { connect } from "react-redux";
import Menu from "./component";
import { ID as animationsId } from "schemas/global-settings/animations";
import { NAME as globalSettingsSliceName } from "slices/globalSettings";
import { NAME as dialogSliceName, setDialogHeight } from "slices/dialog";
import { setHeadlines, setCurrentHeadline, setCurrentHeadlineId, NAME as headlinesSliceName } from "slices/headlines";

import {
  setCurrentMode,
  setAnimation,
  setDataset,
  setMonitor,
  setHeight,
  resetValues,
  setDateOfDataShown,
  NAME as modesSliceName
} from "slices/modes";

export default connect(
  state => ({
    modes: state[modesSliceName].allModes,
    defaultMode: state[modesSliceName].defaultMode,
    currentMode: state[modesSliceName].currentMode,
    currentHeadline: state[headlinesSliceName].currentHeadline,
    animationValue: state[modesSliceName].animationValue,
    monitorValue: state[modesSliceName].monitorValue,
    datasetValue: state[modesSliceName].datasetValue,
    heightValue: state[modesSliceName].heightValue,
    animationEnabled: state[globalSettingsSliceName][animationsId],
    dialogHeight: state[dialogSliceName].dialogHeight,
    currentHeadline: state[headlinesSliceName].currentHeadline,
    pointerHeadlines: state[headlinesSliceName].pointerHeadlines
  }),
  {
    setCurrentMode,
    setAnimationValue: setAnimation,
    setMonitorValue: setMonitor,
    setDatasetValue: setDataset,
    setHeightValue: setHeight,
    resetValues: resetValues,
    setDateOfDataShown,
    setDialogHeight,
    setHeadlines,
    setCurrentHeadline,
    setCurrentHeadlineId
  },
  null,
  { forwardRef: true }
)(Menu);
