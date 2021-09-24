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
    shouldFetchLocation: state[mapControlsSliceName].shouldFetchLocation,
    projectionType: state[mapControlsSliceName].projectionType
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
