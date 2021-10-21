import {
  setAnimation,
  setDataset,
  setMonitor,
  setHeight,
  setCurrentModeId,
  NAME as modesSliceName
} from "slices/modes";
import ReduxQuerySync from "redux-query-sync";

const querySyncEnhancer = ReduxQuerySync.enhancer({
  params: {
    height: {
      selector: state => state[modesSliceName].heightValue,
      action: setHeight
    },
    monitor: {
      selector: state => state[modesSliceName].monitorValue,
      action: setMonitor
    },
    overlay: {
      selector: state => state[modesSliceName].datasetValue,
      action: setDataset
    },
    animation: {
      selector: state => state[modesSliceName].animationValue,
      action: setAnimation
    },
    mode: {
      selector: state => state[modesSliceName].currentModeId,
      action: setCurrentModeId,
      stringToValue: string => Number.parseInt(string, 10) || 1,
      valueToString: value => `${value}`
    }
  },
  initialTruth: "location",
  replaceState: true
});

export default querySyncEnhancer;
