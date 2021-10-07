import { connect } from "react-redux";
import MapComponent from "./component";
import { ID as showMapGridId } from "schemas/global-settings/show-map-grid";
import { ID as animationsId } from "schemas/global-settings/animations";
import { ID as highDefinitionModeId } from "schemas/global-settings/high-definition-mode";
import { ID as basemapsId } from "schemas/global-settings/basemaps";
import { NAME as globalSettingsSliceName } from "slices/globalSettings";
import { NAME as mapControlsSliceName, setShouldFetchLocation } from "slices/mapControls";
import {
  setAnimation,
  setDataset,
  setMonitor,
  resetValues,
  setLayersLabelArr,
  setDateOfDataShown,
  NAME as modesSliceName
} from "slices/modes";

export default connect(
  state => ({
    currentMode: state[modesSliceName].currentMode,
    animationValue: state[modesSliceName].animationValue,
    monitorValue: state[modesSliceName].monitorValue,
    datasetValue: state[modesSliceName].datasetValue,
    dateOfDataShown: state[modesSliceName].dateOfDataShown,
    isSettingsOpen: state[mapControlsSliceName].isSettingsOpen,
    shouldFetchLocation: state[mapControlsSliceName].shouldFetchLocation,
    projectionType: state[mapControlsSliceName].projectionType,
    // Global Settings
    showMapGrid: state[globalSettingsSliceName][showMapGridId],
    animationEnabled: state[globalSettingsSliceName][animationsId],
    highDefinitionMode: state[globalSettingsSliceName][highDefinitionModeId],
    basemapType: state[globalSettingsSliceName][basemapsId]
  }),
  {
    setAnimationValue: setAnimation,
    setMonitorValue: setMonitor,
    setDatasetValue: setDataset,
    resetValues: resetValues,
    setShouldFetchLocation,
    setLayersLabelArr,
    setDateOfDataShown
  },
  null,
  { forwardRef: true }
)(MapComponent);
