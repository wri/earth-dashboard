import { useState } from "react";
import classnames from "classnames";
import Switch from "react-switch";
import { MediaContextProvider, Mobile, Desktop } from "utils/responsive";
import styles from "./switch.module.scss";

const StyledSwitch = ({ className, label }) => {
  const [isChecked, setChecked] = useState(false);

  const defaultSwitchProps = {
    onChange: checked => setChecked(checked),
    checked: isChecked,
    offColor: "#38444F",
    onColor: "#D63C00",
    uncheckedIcon: false,
    checkedIcon: false
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
      {label && <span>{label}</span>}
      <MediaContextProvider>
        <Desktop>
          <Switch {...defaultSwitchProps} {...desktopSwitchProps} />
        </Desktop>
        <Mobile>
          <Switch {...defaultSwitchProps} {...mobileSwitchProps} />
        </Mobile>
      </MediaContextProvider>
    </label>
  );
};

export default StyledSwitch;
