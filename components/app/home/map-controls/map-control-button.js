import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import styles from "./map-controls.module.scss";
import IconButton from "components/ui/icon-button";

const MapControlButton = ({
  isActiveSelector,
  shouldDisableOnActive,
  getDispatch,
  className,
  disabled,
  isToggle,
  forceDark,
  ...rest
}) => {
  const dispatch = useDispatch();

  const isActive = useSelector(isActiveSelector);
  const isDisabled = useMemo(
    () => (shouldDisableOnActive ? isActive : disabled),
    [disabled, isActive, shouldDisableOnActive]
  );
  const dispatchFn = useMemo(() => getDispatch(isActive), [isActive, getDispatch]);

  const handleOnClick = () => {
    dispatch(dispatchFn());
  };

  return (
    <IconButton
      onClick={handleOnClick}
      className={classnames(
        "u-margin-right-xs",
        isToggle && isActive && styles["c-map-control-toggle--active"],
        forceDark && "c-button--icon-force-dark",
        className
      )}
      disabled={isDisabled}
      {...rest}
    />
  );
};

MapControlButton.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  isActiveSelector: PropTypes.func.isRequired,
  shouldDisableOnActive: PropTypes.bool,
  disabled: PropTypes.bool,
  getDispatch: PropTypes.func.isRequired,
  forceDark: PropTypes.bool,
  isToggle: PropTypes.bool,
  className: PropTypes.string
};

MapControlButton.defaultProps = {
  className: "",
  shouldDisableOnActive: false,
  disabled: false,
  isToggle: false,
  forceDark: false
};

export default MapControlButton;