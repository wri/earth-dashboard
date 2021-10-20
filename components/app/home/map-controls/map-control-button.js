import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import IconButton from "components/ui/icon-button";

const MapControlButton = ({
  icon,
  activeIcon,
  isActiveSelector,
  isDisabledSelector,
  getDispatch,
  className,
  activeClassName,
  disabled,
  isToggle,
  forceDark,
  ...rest
}) => {
  const dispatch = useDispatch();

  const isActive = useSelector(isActiveSelector);
  const isDisabled = useSelector(isDisabledSelector ? isDisabledSelector : () => disabled);
  const dispatchFn = useMemo(() => getDispatch(isActive), [isActive, getDispatch]);

  const handleOnClick = () => {
    dispatch(dispatchFn());
  };

  if (isActive && activeIcon) {
    icon = activeIcon;
  }

  return (
    <IconButton
      icon={icon}
      onClick={handleOnClick}
      className={classnames(
        className,
        isActive && activeClassName,
        "u-margin-right-xs",
        forceDark && "c-button--icon-force-dark"
      )}
      disabled={isDisabled}
      {...rest}
    />
  );
};

MapControlButton.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  activeIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  isActiveSelector: PropTypes.func.isRequired,
  isDisabledSelector: PropTypes.func,
  disabled: PropTypes.bool,
  getDispatch: PropTypes.func.isRequired,
  forceDark: PropTypes.bool,
  className: PropTypes.string,
  activeClassName: PropTypes.string
};

MapControlButton.defaultProps = {
  className: "",
  activeClassName: "",
  activeIcon: null,
  isDisabledSelector: null,
  disabled: false,
  forceDark: false
};

export default MapControlButton;
