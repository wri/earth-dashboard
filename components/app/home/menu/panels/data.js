import { useMemo } from "react";
import PropTypes from "prop-types";
import DataLayers from "components/ui/toggle-list/data-list";
import ToggleItem from "components/ui/toggle-list/toggle-item";
import ToggleList from "components/ui/toggle-list";
import MapControls from "components/app/home/map-controls";
import classnames from "classnames";
import styles from "../menu.module.scss";
import useDataLayers from "hooks/useDataLayers";
import { DATA_LAYER_TYPES } from "constants/datalayers";
import MobileMapControlsItems from "constants/control-bar/mobile-home-page";

const DataPanel = ({
  currentTemplate,
  setCurrentTemplate,
  templates,
  datasetValue,
  setDatasetValue,
  monitorValue,
  setMonitorValue,
  animationValue,
  setAnimationValue,
  isMobile,
  onSelectInfo,
  layers
}) => {
  const animationLayers = useDataLayers(currentTemplate, DATA_LAYER_TYPES.animation);
  const datasetLayers = useDataLayers(currentTemplate, DATA_LAYER_TYPES.dataset);
  const monitorLayers = useDataLayers(currentTemplate, DATA_LAYER_TYPES.monitor);
  const currentTemplateMatch = useMemo(() => {
    // Do the defaults of the template match the current layers.
    const defaults = currentTemplate.attributes.data_layers.filter(layer => layer.attributes.default_on);
    const defaultKeys = defaults.map(layer => layer.attributes.data_key);

    const hasMonitor =
      defaults.findIndex(layer => layer.attributes.category.attributes.title === DATA_LAYER_TYPES.monitor) > -1;
    const hasAnimation =
      defaults.findIndex(layer => layer.attributes.category.attributes.title === DATA_LAYER_TYPES.animation) > -1;
    const hasDataset =
      defaults.findIndex(layer => layer.attributes.category.attributes.title === DATA_LAYER_TYPES.dataset) > -1;

    return (
      (hasMonitor ? defaultKeys.indexOf(monitorValue) > -1 : !Boolean(monitorValue)) &&
      (hasAnimation ? defaultKeys.indexOf(animationValue) > -1 : !Boolean(animationValue)) &&
      (hasDataset ? defaultKeys.indexOf(datasetValue) > -1 : !Boolean(datasetValue))
    );
  }, [animationValue, currentTemplate.attributes.data_layers, datasetValue, monitorValue]);

  const source = useMemo(() => {
    const layer = layers.find(layer => layer?.type === "overlay");
    return layer ? `Source: ${layer.product.source}` : "";
  }, [layers]);

  const description = useMemo(() => {
    const layer = datasetLayers.find(layer => layer.attributes.data_key === datasetValue);
    return layer ? layer.attributes.description : "";
  }, [datasetLayers, datasetValue]);

  return (
    <>
      <p className={classnames(styles["c-home-menu__tab-description"], "u-margin-none")}>
        Understand more about how the globe is being impacted by other factors that contribute to the climate crisis.
      </p>
      <div className={styles["c-home-menu__tab-panel-scroll-area"]}>
        <ToggleList
          selectedValue={currentTemplateMatch ? currentTemplate.id : null}
          onSelect={value => {
            setCurrentTemplate({ ...templates.find(template => parseInt(value, 10) === template.id) });
          }}
          title="Templates"
        >
          {templates.map(template => (
            <ToggleItem value={template.id} className="u-margin-right-xxs u-margin-bottom-xs" key={template.id}>
              {template.attributes.title}
            </ToggleItem>
          ))}
        </ToggleList>
        <p className={styles["c-home-menu__template-description"]}>{currentTemplate.attributes.description}</p>
        <div className={styles["c-home-menu__data-selection"]}>
          <DataLayers
            title="Dataset"
            onSelectInfo={onSelectInfo}
            isMobile={isMobile}
            value={datasetValue}
            setValue={setDatasetValue}
            layers={datasetLayers}
          />
          <DataLayers
            title="Monitor"
            onSelectInfo={onSelectInfo}
            isMobile={isMobile}
            value={monitorValue}
            setValue={setMonitorValue}
            layers={monitorLayers}
          />
          <DataLayers
            title="Animation"
            onSelectInfo={onSelectInfo}
            isMobile={isMobile}
            value={animationValue}
            setValue={setAnimationValue}
            layers={animationLayers}
          />
        </div>
        {description && <p className={classnames(styles["c-home-menu__source"], "u-margin-none")}>{description}</p>}
        {source && <p className={classnames(styles["c-home-menu__source"], "u-margin-none")}>{source}</p>}
        {isMobile && <MapControls controls={MobileMapControlsItems} />}
      </div>
    </>
  );
};

DataPanel.propTypes = {
  currentTemplate: PropTypes.object,
  setCurrentTemplate: PropTypes.func.isRequired,
  templates: PropTypes.array,
  datasetValue: PropTypes.string.isRequired,
  setDatasetValue: PropTypes.func.isRequired,
  monitorValue: PropTypes.string.isRequired,
  setMonitorValue: PropTypes.func.isRequired,
  animationValue: PropTypes.string.isRequired,
  setAnimationValue: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  onSelectInfo: PropTypes.func.isRequired,
  layers: PropTypes.array.isRequired
};

DataPanel.defaultProps = {
  isMobile: false,
  currentTemplate: null,
  templates: []
};

export default DataPanel;
