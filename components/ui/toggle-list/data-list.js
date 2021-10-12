import ToggleList from "components/ui/toggle-list";
import ToggleItem from "components/ui/toggle-list/toggle-item";
import PropTypes from "prop-types";
import styles from "components/app/home/menu/menu.module.scss";
import classnames from "classnames";

const DataLayers = ({ title, description, className, value, setValue, layers }) => {
  return (
    layers.length > 0 && (
      <>
        <ToggleList
          selectedValue={value}
          onSelect={value => setValue(value)}
          title={title}
          description={description}
          hasLegend
          role="group"
          aria-labelledby={`${title.toLowerCase()}-label`}
          className={classnames(styles["c-home-menu__toggle-list"], className)}
          singularMode
        >
          {layers.map(layer => (
            <ToggleItem
              key={layer.attributes.data_key}
              value={layer.attributes.data_key}
              className="u-margin-right-xxs u-margin-bottom-s"
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
  description: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  layers: PropTypes.array.isRequired
};

DataLayers.defaultProps = {
  description: "",
  className: ""
};

export default DataLayers;
