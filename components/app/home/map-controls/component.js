import classnames from "classnames";
import styles from "./map-controls.module.scss";
import PropTypes from "prop-types";
import MapControlButton from "./map-control-button";

const MapControls = ({ controls, className }) => (
  <div className={classnames(styles["c-map-controls"], className)}>
    {controls.map(({ key, ...rest }) => (
      <MapControlButton {...rest} key={key} />
    ))}
  </div>
);

MapControls.propTypes = {
  controls: PropTypes.arrayOf(
    PropTypes.shape({
      ...MapControlButton.propTypes,
      key: PropTypes.string.isRequired
    })
  ),
  className: PropTypes.string
};

MapControls.defaultProps = {
  className: ""
};

export default MapControls;
