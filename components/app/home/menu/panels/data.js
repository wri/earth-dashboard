import { useMemo } from "react";
import PropTypes from "prop-types";
import ToggleList from "components/ui/toggle-list";
import ToggleItem from "components/ui/toggle-list/toggle-item";
import InfoLabel from "components/ui/toggle-list/info-label";
import classnames from "classnames";
import styles from "../menu.module.scss";
import useDataLayers from "hooks/useDataLayers";
import { DATA_LAYER_TYPES } from "constants/datalayers";

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
  onSelectInfo
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
      (hasMonitor ? defaultKeys.indexOf(monitorValue) > -1 : true) &&
      (hasAnimation ? defaultKeys.indexOf(animationValue) > -1 : true) &&
      (hasDataset ? defaultKeys.indexOf(datasetValue) > -1 : true)
    );
  }, [animationValue, currentTemplate.attributes.data_layers, datasetValue, monitorValue]);

  return (
    <>
      <p className={classnames(styles["c-home-menu__tab-description"], "u-margin-none")}>
        Understand more about how the globe is being impacted by other factors that contribute to the climate crisis.
      </p>
      <ToggleList
        selectedValue={currentTemplateMatch ? currentTemplate.id : null}
        onSelect={value => setCurrentTemplate(templates.find(template => parseInt(value, 10) === template.id))}
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
        {datasetLayers.length > 0 && (
          <>
            {!isMobile && <InfoLabel title="Dataset" onSelectInfo={onSelectInfo} />}
            <ToggleList
              selectedValue={datasetValue}
              onSelect={value => setDatasetValue(value)}
              title="Datasets"
              hasLegend={isMobile}
              legendComponent={<InfoLabel title="Dataset" className="u-margin-right-xs" onSelectInfo={onSelectInfo} />}
              role="group"
              aria-labelledby="dataset-label"
              className={styles["c-home-menu__toggle-list"]}
              singularMode
            >
              {datasetLayers.map(layer => (
                <ToggleItem
                  key={layer.attributes.data_key}
                  value={layer.attributes.data_key}
                  className="u-margin-right-xxs u-margin-bottom-xs"
                  type="checkbox"
                >
                  {layer.attributes.title}
                </ToggleItem>
              ))}
            </ToggleList>
          </>
        )}
        {monitorLayers.length > 0 && (
          <>
            {!isMobile && <InfoLabel title="Monitor" onSelectInfo={onSelectInfo} />}
            <ToggleList
              selectedValue={monitorValue}
              onSelect={value => setMonitorValue(value)}
              title="Monitor"
              hasLegend={isMobile}
              legendComponent={<InfoLabel title="Monitor" className="u-margin-right-xs" onSelectInfo={onSelectInfo} />}
              role="group"
              aria-labelledby="monitor-label"
              className={styles["c-home-menu__toggle-list"]}
              singularMode
            >
              {monitorLayers.map(layer => (
                <ToggleItem
                  key={layer.attributes.data_key}
                  value={layer.attributes.data_key}
                  className="u-margin-right-xxs u-margin-bottom-xs"
                  type="checkbox"
                >
                  {layer.attributes.title}
                </ToggleItem>
              ))}
            </ToggleList>
          </>
        )}
        {animationLayers.length > 0 && (
          <>
            {!isMobile && <InfoLabel title="Animation" onSelectInfo={onSelectInfo} />}
            <ToggleList
              selectedValue={animationValue}
              onSelect={value => setAnimationValue(value)}
              title="Animation"
              hasLegend={isMobile}
              legendComponent={
                <InfoLabel title="Animation" className="u-margin-right-xs" onSelectInfo={onSelectInfo} />
              }
              role="group"
              aria-labelledby="animation-label"
              className={styles["c-home-menu__toggle-list"]}
              singularMode
            >
              {animationLayers.map(layer => (
                <ToggleItem
                  key={layer.attributes.data_key}
                  value={layer.attributes.data_key}
                  className="u-margin-right-xxs u-margin-bottom-xs"
                  type="checkbox"
                >
                  {layer.attributes.title}
                </ToggleItem>
              ))}
            </ToggleList>
          </>
        )}
      </div>
    </>
  );
};

DataPanel.propTypes = {
  currentTemplate: PropTypes.object,
  setCurrentTemplate: PropTypes.func.isRequired,
  templates: PropTypes.array,
  datasetValue: PropTypes.array.isRequired,
  setDatasetValue: PropTypes.func.isRequired,
  monitorValue: PropTypes.array.isRequired,
  setMonitorValue: PropTypes.func.isRequired,
  animationValue: PropTypes.array.isRequired,
  setAnimationValue: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  onSelectInfo: PropTypes.func.isRequired
};

DataPanel.defaultProps = {
  isMobile: false,
  currentTemplate: null,
  templates: []
};

export default DataPanel;
