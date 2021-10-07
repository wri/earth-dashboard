import { forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import Switch from "react-switch";
import { MediaContextProvider, Mobile, Desktop } from "utils/responsive";
import styles from "./switch.module.scss";
import PropTypes from "prop-types";

const StyledSwitch = forwardRef(({ className, label, isActiveSelector, handleChange }, ref) => {
  const dispatch = useDispatch();
  const isActive = useSelector(isActiveSelector());

  const defaultSwitchProps = {
    ref,
    onChange: checked => dispatch(handleChange(checked)),
    checked: isActive,
    offColor: "#38444F",
    onColor: "#D63C00",
    uncheckedIcon: false,
    checkedIcon: false,
    "data-testid": "test-switch"
  };

  const desktopSwitchProps = {
    handleDiameter: 32,
    height: 44,
    width: 80
  };

  const mobileSwitchProps = {
    handleDiameter: 24,
    height: 32,
    width: 58
  };

  return (
    <label className={classnames(styles["c-custom-styled-switch"], className)}>
      {label && (
        <span className={classnames(styles["c-custom-styled-switch__label"], "u-margin-bottom-none")}>{label}</span>
      )}
      <MediaContextProvider>
        <Desktop className={styles["c-custom-styled-switch__wrap"]}>
          <Switch {...defaultSwitchProps} {...desktopSwitchProps} />
        </Desktop>
        <Mobile className={styles["c-custom-styled-switch__wrap"]}>
          <Switch {...defaultSwitchProps} {...mobileSwitchProps} />
        </Mobile>
      </MediaContextProvider>
    </label>
  );
});

StyledSwitch.displayName = "StyledSwitch";

StyledSwitch.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  isActiveSelector: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

StyledSwitch.defaultProps = {};

export default StyledSwitch;
