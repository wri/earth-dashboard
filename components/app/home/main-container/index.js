import MainContainerComponent from "./component";
import { connect } from "react-redux";
import { setTemplates, setAnimation, setDataset, setMonitor, resetValues } from "slices/templates";

export default connect(
  state => ({
    currentTemplate: state.templates.currentTemplate,
    animationValue: state.templates.animationValue,
    monitorValue: state.templates.monitorValue,
    datasetValue: state.templates.datasetValue
  }),
  {
    setTemplates,
    setAnimationValue: setAnimation,
    setMonitorValue: setMonitor,
    setDatasetValue: setDataset,
    resetValues: resetValues
  }
)(MainContainerComponent);
