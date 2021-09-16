import ToggleList from "components/ui/toggle-list";
import ToggleItem from "components/ui/toggle-list/toggle-item";
import InfoLabel from "components/ui/toggle-list/info-label";
import PropTypes from "prop-types";
import styles from "components/app/home/menu/menu.module.scss";

const DataLayers = ({ title, isMobile, onSelectInfo, value, setValue, layers }) => {
  return (
    layers.length > 0 && (
      <>
        {!isMobile && <InfoLabel title={title} onSelectInfo={onSelectInfo} />}
        <ToggleList
          selectedValue={value}
          onSelect={value => setValue(value)}
          title={title}
          hasLegend={isMobile}
          legendComponent={<InfoLabel title={title} className="u-margin-right-xs" onSelectInfo={onSelectInfo} />}
          role="group"
          aria-labelledby={`${title.toLowerCase()}-label`}
          className={styles["c-home-menu__toggle-list"]}
          singularMode
        >
          {layers.map(layer => (
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
    )
  );
};

DataLayers.propTypes = {
  title: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
  onSelectInfo: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  layers: PropTypes.array.isRequired
};

export default DataLayers;
