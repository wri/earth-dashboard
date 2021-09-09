import PropTypes from "prop-types";
import ToggleList from "components/ui/toggle-list";
import ToggleItem from "components/ui/toggle-list/toggle-item";
import InfoLabel from "components/ui/toggle-list/info-label";
import classnames from "classnames";
import styles from "../menu.module.scss";

const DataPanel = ({
  templateValue,
  setTemplateValue,
  datasetValue,
  setDatasetValue,
  monitorValue,
  setMonitorValue,
  animationValue,
  setAnimationValue,
  isMobile
}) => {
  return (
    <>
      <p className={classnames(styles["c-home-menu__tab-description"], "u-margin-none")}>
        Understand more about how the globe is being impacted by other factors that contribute to the climate crisis.
      </p>
      <ToggleList selectedValue={templateValue} onSelect={value => setTemplateValue(value)} title="Templates">
        <ToggleItem value="wildfires" className="u-margin-right-xxs u-margin-bottom-xs">
          Wildfires
        </ToggleItem>
        <ToggleItem value="winds" className="u-margin-right-xxs u-margin-bottom-xs">
          Winds
        </ToggleItem>
        <ToggleItem value="atmosphere" className="u-margin-right-xxs u-margin-bottom-xs">
          Atmosphere
        </ToggleItem>
        <ToggleItem value="ocean">Ocean</ToggleItem>
      </ToggleList>
      <p className={styles["c-home-menu__template-description"]}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie felis at tortor mollis, id
        vestibulum nisl vehicula.
      </p>
      <div className={styles["c-home-menu__data-selection"]}>
        {!isMobile && <InfoLabel title="Dataset" />}
        <ToggleList
          selectedValue={datasetValue}
          onSelect={value => setDatasetValue(value)}
          title="Datasets"
          hasLegend={isMobile}
          legendComponent={<InfoLabel title="Dataset" className="u-margin-right-xs" />}
          role="group"
          aria-labelledby="dataset-label"
          className={styles["c-home-menu__toggle-list"]}
        >
          <ToggleItem value="carbon_mon" className="u-margin-right-xxs u-margin-bottom-xs" type="checkbox">
            Carbon Monoxide
          </ToggleItem>
          <ToggleItem value="smoke" className="u-margin-right-xxs u-margin-bottom-xs" type="checkbox">
            Smoke
          </ToggleItem>
          <ToggleItem value="part_mat" className="u-margin-right-xxs u-margin-bottom-xs" type="checkbox">
            Particulate Matter
          </ToggleItem>
        </ToggleList>
        {!isMobile && <InfoLabel title="Monitor" />}
        <ToggleList
          selectedValue={monitorValue}
          onSelect={value => setMonitorValue(value)}
          title="Monitor"
          hasLegend={isMobile}
          legendComponent={<InfoLabel title="Monitor" className="u-margin-right-xs" />}
          role="group"
          aria-labelledby="monitor-label"
          className={styles["c-home-menu__toggle-list"]}
        >
          <ToggleItem value="fires" className="u-margin-right-xxs u-margin-bottom-xs" type="checkbox">
            Fires
          </ToggleItem>
        </ToggleList>
        {!isMobile && <InfoLabel title="Animation" />}
        <ToggleList
          selectedValue={animationValue}
          onSelect={value => setAnimationValue(value)}
          title="Animation"
          hasLegend={isMobile}
          legendComponent={<InfoLabel title="Animation" className="u-margin-right-xs" />}
          role="group"
          aria-labelledby="animation-label"
          className={styles["c-home-menu__toggle-list"]}
        >
          <ToggleItem value="wind" className="u-margin-right-xxs u-margin-bottom-xs" type="checkbox">
            Wind
          </ToggleItem>
        </ToggleList>
      </div>
    </>
  );
};

DataPanel.propTypes = {
  templateValue: PropTypes.string.isRequired,
  setTemplateValue: PropTypes.func.isRequired,
  datasetValue: PropTypes.array.isRequired,
  setDatasetValue: PropTypes.func.isRequired,
  monitorValue: PropTypes.array.isRequired,
  setMonitorValue: PropTypes.func.isRequired,
  animationValue: PropTypes.array.isRequired,
  setAnimationValue: PropTypes.func.isRequired,
  isMobile: PropTypes.bool
};

DataPanel.defaultProps = {
  isMobile: false
};

export default DataPanel;
