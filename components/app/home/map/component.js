import { forwardRef, useEffect } from "react";
import { DATA_LAYER_TYPES, LEVELS } from "constants/datalayers";
import useCurrentPosition from "hooks/useCurrentPosition";
import basemaps from "constants/basemaps";
import PropTypes from "prop-types";
import { EarthClient } from "utils/iframeBridge/earthClient";
import ToolTip from "components/ui/tooltip/component";

const MapIframe = forwardRef(
  (
    {
      currentMode,
      resetValues,
      setAnimationValue,
      setDatasetValue,
      setMonitorValue,
      setHeightValue,
      animationEnabled,
      animationValue,
      datasetValue,
      monitorValue,
      heightValue,
      setShouldFetchLocation,
      shouldFetchLocation,
      projectionType,
      earthClient,
      earthServer,
      setLayersLabelArr,
      showMapGrid,
      highDefinitionMode,
      basemapType,
      dateOfDataShown,
      currentLocation,
      setCurrentLocation,
      toolTipDetails,
      currentScale,
      currentScaleBy,
      setCurrentScale,
      setCurrentScaleBy,
      hasIframeConnected
    },
    ref
  ) => {
    const { currentPosition } = useCurrentPosition(shouldFetchLocation);
    // if the current mode changes, and there is an earth client, set the data layer values
    useEffect(() => {
      if (currentMode && earthClient) {
        const newLayers = [];
        resetValues();
        const defaults = currentMode.attributes.data_layers.default;
        defaults.forEach(layer => {
          let setter = () => {};
          switch (layer.attributes.category.attributes.title) {
            case DATA_LAYER_TYPES.animation:
              setter = setAnimationValue;
              break;
            case DATA_LAYER_TYPES.dataset:
              setter = setDatasetValue;
              break;
            case DATA_LAYER_TYPES.monitor:
              setter = setMonitorValue;
              break;
            case DATA_LAYER_TYPES.height:
              setter = setHeightValue;
              break;
          }
          newLayers.push(layer.attributes.title);
          setter(layer.attributes.data_key);
        });
        if (currentMode.attributes.visibility.data_highlights) {
          // Only set the name if the current mode is a data highlight
          setLayersLabelArr([currentMode.attributes.title]);
        } else {
          setLayersLabelArr(newLayers);
        }
      }
    }, [
      currentMode,
      earthClient,
      resetValues,
      setAnimationValue,
      setDatasetValue,
      setHeightValue,
      setLayersLabelArr,
      setMonitorValue
    ]);

    // Send the correct state to the map when data layer values change.
    useEffect(() => {
      if (earthServer.current && hasIframeConnected) {
        // If a data highlight mode, set the layers label
        if (currentMode?.attributes.visibility.advanced_menu) {
          const newLayers = [];
          currentMode?.attributes?.data_layers.available.forEach(layer => {
            if (
              (layer.attributes.data_key === animationValue &&
                layer.attributes.category.attributes.title === DATA_LAYER_TYPES.animation) ||
              (layer.attributes.data_key === monitorValue &&
                layer.attributes.category.attributes.title === DATA_LAYER_TYPES.monitor) ||
              (layer.attributes.data_key === datasetValue &&
                layer.attributes.category.attributes.title === DATA_LAYER_TYPES.dataset) ||
              (layer.attributes.data_key === heightValue &&
                layer.attributes.category.attributes.title === DATA_LAYER_TYPES.height)
            ) {
              newLayers.push(layer.attributes.title);
            }
          });
          setLayersLabelArr(newLayers);
        }

        // Set the data layers
        let animation = { animation_enabled: false };

        if (animationEnabled && animationValue) {
          animation = { animation_type: animationValue, animation_enabled: true };
        }
        const monitor = monitorValue ? { annotation_type: monitorValue } : { annotation_type: "none" };
        const dataset = datasetValue ? { overlay_type: datasetValue } : { annotation_type: "none" };
        const height = heightValue ? { z_level: heightValue } : { z_level: LEVELS.surface };

        earthServer.current.saveState({ ...animation, ...monitor, ...dataset, ...height });
      }
    }, [
      animationValue,
      animationEnabled,
      datasetValue,
      monitorValue,
      heightValue,
      currentMode,
      earthServer,
      setLayersLabelArr,
      hasIframeConnected
    ]);

    // Switch between the different projection types available
    useEffect(() => {
      if (earthServer.current) {
        earthServer.current.saveState({ projection_type: projectionType });
      }
    }, [projectionType, earthServer]);

    // Update state when Global Settings are changed
    useEffect(() => {
      if (earthServer.current) {
        earthServer.current.saveState({
          show_grid_points: showMapGrid,
          hd_enabled: highDefinitionMode,
          map_scene: basemaps[basemapType]
        });
      }
    }, [earthServer, showMapGrid, highDefinitionMode, basemapType]);

    // Set the current position of the user on the map
    useEffect(() => {
      if (currentPosition) {
        setCurrentLocation([currentPosition.latitude, currentPosition.longitude]);
        setCurrentScale("default");
        setCurrentScaleBy(3);
        setShouldFetchLocation(false);
      }
    }, [currentPosition, earthServer, setCurrentLocation, setShouldFetchLocation]);

    useEffect(() => {
      if (earthServer.current && currentLocation) {
        const long = currentLocation[1];
        const lat = currentLocation[0];

        const scale = currentScale || "default";
        const scaleBy = currentScaleBy || 1;

        earthServer.current.reorient({
          rotate: [-long, -lat],
          scale,
          scaleBy
        });
      }
    }, [currentLocation, earthServer.current]);

    useEffect(() => {
      if (earthServer.current && dateOfDataShown) {
        earthServer.current.saveState({ time_cursor: dateOfDataShown });
      }
    }, [dateOfDataShown, earthServer]);

    return (
      <>
        {toolTipDetails && toolTipDetails.isVisible && (
          <ToolTip x={`${toolTipDetails.x}px`} y={`${toolTipDetails.y}px`}>
            <p className="u-margin-none">{toolTipDetails.text}</p>
          </ToolTip>
        )}
        <iframe
          id="nullSchoolIframe"
          width="100%"
          height="100%"
          src={process.env.NULL_SCHOOL_IFRAME_BASE}
          frameBorder="0"
          allowtransparency="true"
          ref={ref}
        />
      </>
    );
  }
);

MapIframe.displayName = "MapIframe";

MapIframe.propTypes = {
  currentMode: PropTypes.object,
  resetValues: PropTypes.func.isRequired,
  setAnimationValue: PropTypes.func.isRequired,
  setDatasetValue: PropTypes.func.isRequired,
  setMonitorValue: PropTypes.func.isRequired,
  animationEnabled: PropTypes.bool.isRequired,
  animationValue: PropTypes.string,
  datasetValue: PropTypes.string,
  monitorValue: PropTypes.string,
  setShouldFetchLocation: PropTypes.func.isRequired,
  shouldFetchLocation: PropTypes.bool.isRequired,
  projectionType: PropTypes.string.isRequired,
  earthClient: PropTypes.instanceOf(EarthClient),
  earthServer: PropTypes.object,
  layers: PropTypes.array,
  setDateOfDataShown: PropTypes.func.isRequired,
  showMapGrid: PropTypes.bool.isRequired,
  highDefinitionMode: PropTypes.bool.isRequired,
  basemapType: PropTypes.oneOf(Object.keys(basemaps)),
  setCurrentLocation: PropTypes.func.isRequired,
  setCurrentScale: PropTypes.func.isRequired,
  setCurrentScaleBy: PropTypes.func.isRequired,
  hasIframeConnected: PropTypes.bool
};

MapIframe.defaultProps = {
  currentMode: null,
  earthServer: null,
  animationValue: null,
  datasetValue: null,
  monitorValue: null,
  hasIframeConnected: false
};

export default MapIframe;
