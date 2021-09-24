import { forwardRef, useState, useEffect } from "react";
import { DATA_LAYER_MAP, DATA_LAYER_TYPES } from "constants/datalayers";
import useCurrentPosition from "hooks/useCurrentPosition";

const MapIframe = forwardRef(
  (
    {
      currentTemplate,
      resetValues,
      setAnimationValue,
      setDatasetValue,
      setMonitorValue,
      animationValue,
      datasetValue,
      monitorValue,
      setShouldFetchLocation,
      shouldFetchLocation,
      earthClient,
      earthServer,
      setLayersLabelArr
    },
    ref
  ) => {
    const { currentPosition } = useCurrentPosition(shouldFetchLocation);

    // if the current template changes, and there is an earth client, set the data layer values
    useEffect(() => {
      if (currentTemplate && earthClient) {
        const newLayers = [];
        resetValues();
        const defaults = currentTemplate.attributes.data_layers.filter(layer => layer.attributes.default_on);
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
          }
          newLayers.push(layer.attributes.title);
          setter(layer.attributes.data_key);
        });
        setLayersLabelArr(newLayers);
      }
    }, [
      currentTemplate,
      earthClient,
      resetValues,
      setAnimationValue,
      setDatasetValue,
      setLayersLabelArr,
      setMonitorValue
    ]);

    // Send the correct state to the map when data layer values change.
    useEffect(() => {
      if (earthServer.current) {
        const newLayers = [];
        currentTemplate?.attributes?.data_layers.forEach(layer => {
          if (
            layer.attributes.data_key === animationValue ||
            layer.attributes.data_key === monitorValue ||
            layer.attributes.data_key === datasetValue
          ) {
            newLayers.push(layer.attributes.title);
          }
        });
        setLayersLabelArr(newLayers);
        const animation = DATA_LAYER_MAP[animationValue] || { animation_enabled: false };
        const monitor = DATA_LAYER_MAP[monitorValue] || { annotation_type: "none" };
        const dataset = DATA_LAYER_MAP[datasetValue] || { overlay_type: "none", z_level: "surface" };

        earthServer.current.saveState({ ...animation, ...monitor, ...dataset });
      }
    }, [
      animationValue,
      datasetValue,
      monitorValue,
      currentTemplate?.attributes?.data_layers,
      earthServer,
      setLayersLabelArr
    ]);

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

export default MapIframe;
