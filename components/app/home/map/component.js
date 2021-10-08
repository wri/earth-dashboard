import { forwardRef, useEffect } from "react";
import { DATA_LAYER_TYPES, LEVELS } from "constants/datalayers";
import useCurrentPosition from "hooks/useCurrentPosition";
import basemaps from "constants/basemaps";
import PropTypes from "prop-types";
import { EarthClient } from "utils/iframeBridge/earthClient";
import { mode } from "d3-array";

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
      layers,
      setLayersLabelArr,
      setDateOfDataShown,
      showMapGrid,
      highDefinitionMode,
      basemapType,
      dateOfDataShown
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
      if (earthServer.current) {
        // TODO: Update to work with advanced menu only
        // const newLayers = [];
        // [...currentMode.attributes.data_layers.default, ...currentMode?.attributes?.data_layers.available].forEach(
        //   layer => {
        //     if (
        //       layer.attributes.data_key === animationValue ||
        //       layer.attributes.data_key === monitorValue ||
        //       layer.attributes.data_key === datasetValue
        //     ) {
        //       newLayers.push(layer.attributes.title);
        //     }
        //   }
        // );
        // setLayersLabelArr(newLayers);

        let animation = { animation_enabled: false };
        if (animationEnabled) {
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
      currentMode?.attributes?.data_layers,
      earthServer
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
      if (earthServer && currentPosition) {
        const long = +currentPosition.longitude;
        const lat = +currentPosition.latitude;

        earthServer.current.reorient({
          rotate: [-long, -lat],
          scale: "default",
          scaleBy: 5
        });

        setShouldFetchLocation(false);
      }
    }, [currentPosition, earthServer, setShouldFetchLocation]);

    // Find the Date of the Data being displayed
    useEffect(() => {
      const dates = [];

      layers?.forEach(layer => {
        if (!layer || !layer.product || !layer.product.validTime) return;

        dates.push(layer.product.validTime);
      });

      if (dates.length) {
        // Set the current date as the biggest date
        setDateOfDataShown(
          new Date(
            dates.reduce((accumulator, currentValue) => {
              if (!accumulator) return currentValue;

              if (new Date(currentValue).getTime() > new Date(accumulator).getTime()) {
                return currentValue;
              } else {
                return accumulator;
              }
            }, null)
          )
        ).toString();
      }
    }, [layers, setDateOfDataShown]);

    useEffect(() => {
      if (earthServer.current && dateOfDataShown) {
        earthServer.current.saveState({ time_cursor: dateOfDataShown });
      }
    }, [dateOfDataShown, earthServer]);

    return (
      <iframe
        id="nullSchoolIframe"
        width="100%"
        height="100%"
        src={process.env.NULL_SCHOOL_IFRAME_BASE}
        title="Null School"
        frameBorder="0"
        allowtransparency="true"
        ref={ref}
      />
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
  basemapType: PropTypes.oneOf(Object.keys(basemaps))
};

MapIframe.defaultProps = {
  currentMode: null,
  earthServer: null,
  animationValue: null,
  datasetValue: null,
  monitorValue: null
};

export default MapIframe;