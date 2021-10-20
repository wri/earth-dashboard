import { useMemo } from "react";
import PropTypes from "prop-types";
import DataLayers from "components/ui/toggle-list/data-list";
import ToggleItem from "components/ui/toggle-list/toggle-item";
import ToggleList from "components/ui/toggle-list";
import MapControls from "components/app/home/map-controls";
import DatePickerBtn from "components/app/home/date-picker-menu/button";
import classnames from "classnames";
import styles from "../menu.module.scss";
import useDataLayers from "hooks/useDataLayers";
import { DATA_LAYER_TYPES } from "constants/datalayers";
import MobileMapControlsItems from "schemas/control-bar/mobile-home-page";

const DataPanel = ({
  currentMode,
  setCurrentMode,
  modes,
  datasetValue,
  setDatasetValue,
  monitorValue,
  setMonitorValue,
  animationValue,
  animationEnabled,
  setAnimationValue,
  isMobile,
  heightValue,
  setHeightValue,
  layers
}) => {
  const animationLayers = useDataLayers(currentMode, DATA_LAYER_TYPES.animation);
  const datasetLayers = useDataLayers(currentMode, DATA_LAYER_TYPES.dataset);
  const monitorLayers = useDataLayers(currentMode, DATA_LAYER_TYPES.monitor);
  const heightLayers = useDataLayers(currentMode, DATA_LAYER_TYPES.height);

  const source = useMemo(() => {
    const layer = layers.find(layer => layer?.type === "overlay");
    return layer?.product?.source ? `Source: ${layer.product.source}` : "";
  }, [layers]);

  const description = useMemo(() => {
    const layer = datasetLayers.find(layer => layer.attributes.data_key === datasetValue);
    return layer ? `Showing: ${layer.attributes.description}` : "";
  }, [datasetLayers, datasetValue]);

  const availableModes = useMemo(() => {
    const items = [];
    if (currentMode && !currentMode.attributes.visibility.advanced_menu) {
      // Add it in to the advanced menu temporarily
      items.push(currentMode);
    }
    return [...items, ...modes.filter(mode => mode.attributes.visibility.advanced_menu)];
  }, [currentMode, modes]);

  return (
    <>
      <p className={classnames(styles["c-home-menu__tab-description"], "u-margin-none")}>
        {description} <br /> {source}
      </p>
      <div className={styles["c-home-menu__tab-panel-scroll-area"]}>
        <p className={classnames(styles["c-home-menu__powered-by"], "u-text-right", "u-margin-none")}>
          Powered by{" "}
          <a href="https://earth.nullschool.net" target="_blank" rel="nofollow noreferrer">
            earth.nullschool.net
          </a>
        </p>
        <ToggleList
          selectedValue={currentMode.id || null}
          onSelect={value => {
            setCurrentMode({ ...modes.find(mode => parseInt(value, 10) === mode.id) });
          }}
          title="Choose a mode"
          description="The modes provide an overview of the climatic condition. Each category contains data that will help you understand how that category is affected by different factors."
          className={classnames(
            styles["c-home-menu__data-selection-item"],
            styles["c-home-menu__data-selection-item--no-top-margin"]
          )}
        >
          {availableModes.map(template => (
            <ToggleItem value={template.id} className="u-margin-right-xxs u-margin-bottom-s" key={template.id}>
              {template.attributes.title}
            </ToggleItem>
          ))}
        </ToggleList>
        <div className={styles["c-home-menu__data-selection"]}>
          <DataLayers
            title="Choose Altitude (hPa)"
            description={`Atmospheric pressure (hPa) corresponds to altitude and it shows data assuming the earth is completely smooth. The "Surface" layer represents conditions at ground or water level.  This layer follows the contours of mountains, valleys, etc.`}
            isMobile={isMobile}
            value={heightValue}
            setValue={setHeightValue}
            layers={heightLayers}
            className={styles["c-home-menu__data-selection-item"]}
          />
          <DataLayers
            title="Choose an overlay"
            description="Overlays display layers of near real-time weather data. Some overlays are valid at surface level while others are valid for the entire thickness of the atmosphere."
            isMobile={isMobile}
            value={datasetValue}
            setValue={setDatasetValue}
            layers={datasetLayers}
            className={styles["c-home-menu__data-selection-item"]}
          />
          <DataLayers
            title="Choose an annotation"
            description="Annotations can be added on top of data layers. If you want to find relationships between data layers and annotations you can overlay them to identify patterns and correlations."
            isMobile={isMobile}
            value={monitorValue}
            setValue={setMonitorValue}
            layers={monitorLayers}
            className={styles["c-home-menu__data-selection-item"]}
          />
          {animationEnabled && (
            <DataLayers
              title="Choose an animation"
              description="Animate the direction of wind, currents or waves on the map."
              isMobile={isMobile}
              value={animationValue}
              setValue={setAnimationValue}
              layers={animationLayers}
              className={styles["c-home-menu__data-selection-item"]}
            />
          )}
        </div>
        {description && <p className={classnames(styles["c-home-menu__source"], "u-margin-none")}>{description}</p>}
        {source && <p className={classnames(styles["c-home-menu__source"], "u-margin-none")}>{source}</p>}
        {isMobile && (
          <>
            <DatePickerBtn />
            <MapControls controls={MobileMapControlsItems} />
          </>
        )}
      </div>
    </>
  );
};

DataPanel.propTypes = {
  currentMode: PropTypes.object,
  setCurrentMode: PropTypes.func.isRequired,
  modes: PropTypes.array,
  datasetValue: PropTypes.string.isRequired,
  setDatasetValue: PropTypes.func.isRequired,
  monitorValue: PropTypes.string.isRequired,
  setMonitorValue: PropTypes.func.isRequired,
  animationValue: PropTypes.string.isRequired,
  animationEnabled: PropTypes.bool.isRequired,
  setAnimationValue: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  layers: PropTypes.array.isRequired
};

DataPanel.defaultProps = {
  isMobile: false,
  currentMode: null,
  modes: []
};

export default DataPanel;
