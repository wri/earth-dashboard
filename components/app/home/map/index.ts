import { connect } from "react-redux";
import MapComponent from "./component";
import { setShouldFetchLocation, setCurrentLocation, setCurrentScale, setCurrentScaleBy } from "slices/mapControls";
import {
  setAnimation,
  setDataset,
  setMonitor,
  resetValues,
  setLayersLabelArr,
  setDateOfDataShown,
  setHeight
} from "slices/modes";
import { RootState } from "store/types";
import { setCurrentHeadline } from "slices/headlines";

export default connect(
  (state: RootState) => ({
    currentVisibleMode: state.modes.currentVisibleMode,
    loadDefaultModeValues: state.modes.loadDefaultModeValues,
    animationValue: state.modes.animationValue,
    monitorValue: state.modes.monitorValue,
    heightValue: state.modes.heightValue,
    datasetValue: state.modes.datasetValue,
    dateOfDataShown: state.modes.dateOfDataShown,
    isSettingsOpen: state.mapControls.isSettingsOpen,
    shouldFetchLocation: state.mapControls.shouldFetchLocation,
    projectionType: state.mapControls.projectionType,
    currentLocation: state.mapControls.currentLocation,
    currentScale: state.mapControls.currentScale,
    currentScaleBy: state.mapControls.currentScaleBy,
    hasReoriented: state.mapControls.hasReoriented,
    // Global Settings
    showMapGrid: state.globalSettings.showMapGrid,
    animationEnabled: state.globalSettings.showAnimations,
    highDefinitionMode: state.globalSettings.showHighDefinition,
    basemapType: state.globalSettings.basemap
  }),
  {
    setAnimationValue: setAnimation,
    setMonitorValue: setMonitor,
    setDatasetValue: setDataset,
    setHeightValue: setHeight,
    resetValues: resetValues,
    setShouldFetchLocation,
    setLayersLabelArr,
    setDateOfDataShown,
    setCurrentLocation,
    setCurrentScale,
    setCurrentScaleBy,
    setCurrentHeadline
  },
  null,
  { forwardRef: true }
)(MapComponent);
