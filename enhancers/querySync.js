/**
 * Map specific URL queries to the redux state.
 * Useful for sharing the current data layer state in the URL.
 */

import {
  setAnimation,
  setDataset,
  setMonitor,
  setHeight,
  setCurrentModeId,
  NAME as modesSliceName,
  setDateOfDataShown
} from "slices/modes";
import { setCurrentHeadlineId, NAME as headlineSliceName } from "slices/headlines";
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
    headline: {
      selector: state => state[headlineSliceName].currentHeadlineId,
      action: setCurrentHeadlineId,
      stringToValue: string => Number.parseInt(string, 10) || undefined,
      valueToString: value => `${value}`
    },
    mode: {
      selector: state => state[modesSliceName].currentModeId,
      action: setCurrentModeId,
      stringToValue: string => Number.parseInt(string, 10) || 1,
      valueToString: value => `${value}`
    },
    date: {
      selector: state => state[modesSliceName].dateOfDataShown,
      action: setDateOfDataShown,
      stringToValue: string => new Date(Number.parseInt(string, 10)).toString(),
      valueToString: value => new Date(value).getTime()
    }
  },
  initialTruth: "location",
  replaceState: true
});

export default querySyncEnhancer;
