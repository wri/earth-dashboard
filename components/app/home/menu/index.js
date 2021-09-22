import { connect } from "react-redux";
import Menu from "./component";
import { setTemplates, setCurrentTemplate, setAnimation, setDataset, setMonitor, resetValues } from "slices/templates";

export default connect(
  state => ({
    templates: state.templates.allTemplates,
    currentTemplate: state.templates.currentTemplate,
    animationValue: state.templates.animationValue,
    monitorValue: state.templates.monitorValue,
    datasetValue: state.templates.datasetValue
  }),
  {
    setTemplates,
    setCurrentTemplate,
    setAnimationValue: setAnimation,
    setMonitorValue: setMonitor,
    setDatasetValue: setDataset,
    resetValues: resetValues
  },
  null,
  { forwardRef: true }
)(Menu);
