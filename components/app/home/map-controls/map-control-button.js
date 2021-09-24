import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import IconButton from "components/ui/icon-button";

const MapControlButton = ({ isActiveSelector, shouldDisableOnActive, getDispatch, className, disabled, ...rest }) => {
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
      className={classnames("u-margin-right-xs", className)}
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
  className: PropTypes.string
};

MapControlButton.defaultProps = {
  className: "",
  shouldDisableOnActive: false,
  disabled: false
};

export default MapControlButton;
