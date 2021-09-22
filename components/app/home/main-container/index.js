import MainContainerComponent from "./component";
import { connect } from "react-redux";
import { NAME as mapControlsSliceName, setShouldFetchLocation } from "slices/mapControls";
import { setTemplates, setAnimation, setDataset, setMonitor, resetValues } from "slices/templates";

export default connect(
  state => ({
    currentTemplate: state.templates.currentTemplate,
    animationValue: state.templates.animationValue,
    monitorValue: state.templates.monitorValue,
    datasetValue: state.templates.datasetValue,
    isSettingsOpen: state[mapControlsSliceName].isSettingsOpen,
    shouldFetchLocation: state[mapControlsSliceName].shouldFetchLocation
  }),
  {
    setTemplates,
    setAnimationValue: setAnimation,
    setMonitorValue: setMonitor,
    setDatasetValue: setDataset,
    resetValues: resetValues,
    setShouldFetchLocation
  }
)(MainContainerComponent);
