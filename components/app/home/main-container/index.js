import MainContainerComponent from "./component";
import { connect } from "react-redux";
import { NAME as controlBarSliceName } from "slices/controlBar";
import { setTemplates, setAnimation, setDataset, setMonitor, resetValues } from "slices/templates";

export default connect(
  state => ({
    currentTemplate: state.templates.currentTemplate,
    animationValue: state.templates.animationValue,
    monitorValue: state.templates.monitorValue,
    datasetValue: state.templates.datasetValue,
    isSettingsOpen: state[controlBarSliceName].isSettingsOpen
  }),
  {
    setTemplates,
    setAnimationValue: setAnimation,
    setMonitorValue: setMonitor,
    setDatasetValue: setDataset,
    resetValues: resetValues
  }
)(MainContainerComponent);
