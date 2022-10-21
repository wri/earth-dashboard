import { connect } from "react-redux";
import Menu from "./component";
import { setDialogHeight } from "slices/dialog";
import { setHeadlines, setCurrentHeadline, setCurrentHeadlineId, NAME as headlinesSliceName } from "slices/headlines";

import {
  setCurrentMode,
  setAnimation,
  setDataset,
  setMonitor,
  setHeight,
  resetValues,
  setDateOfDataShown,
  pagePush,
  pagePop
} from "slices/modes";
import { RootState } from "store/types";
import { setShare } from "slices/common";

export default connect(
  (state: RootState) => ({
    modes: state.modes.allModes,
    defaultMode: state.modes.defaultMode,
    currentMode: state.modes.currentMode,
    currentHeadline: state[headlinesSliceName].currentHeadline,
    currentHeadlineId: state[headlinesSliceName].currentHeadlineId,
    animationValue: state.modes.animationValue,
    monitorValue: state.modes.monitorValue,
    datasetValue: state.modes.datasetValue,
    heightValue: state.modes.heightValue,
    animationEnabled: state.globalSettings.showAnimations,
    dialogHeight: state.dialog.dialogHeight,
    headlines: state.headlines.headlines,
    headlinesLoading: state.headlines.headlinesLoading,
    share: state.common.share
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
    setCurrentHeadlineId,
    pagePush,
    pagePop,
    setShare
  },
  null,
  { forwardRef: true }
)(Menu);
