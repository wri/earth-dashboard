import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import Image from "next/image";
import PropTypes from "prop-types";

const MapControlButton = ({
  image,
  isActiveSelector,
  shouldDisableOnActive,
  getDispatch,
  className,
  disabled,
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
    <button
      onClick={handleOnClick}
      className={classnames("c-button c-button--icon", className)}
      disabled={isDisabled}
      {...rest}
    >
      <Image src={image} role="presentation" alt="" />
    </button>
  );
};

MapControlButton.propTypes = {
  image: PropTypes.object.isRequired,
  isActiveSelector: PropTypes.func.isRequired,
  shouldDisableOnActive: PropTypes.bool,
  disabled: PropTypes.func,
  getDispatch: PropTypes.func.isRequired,
  className: PropTypes.string
};

MapControlButton.defaultProps = {
  className: "",
  shouldDisableOnActive: false,
  disabled: false
};

export default MapControlButton;
