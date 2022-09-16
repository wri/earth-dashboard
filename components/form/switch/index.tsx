import classnames from "classnames";
import Switch from "react-switch";
import { MediaContextProvider, Mobile, Desktop } from "utils/responsive";
import styles from "./switch.module.scss";

type FormSwitchProps = {
  label: string;
  onChange: (checked: boolean) => void;
  isActive: boolean;
  className?: string;
};

/** Styled toggle switch with on-change event handler. */
const FormSwitch = ({ label, isActive, onChange, className = "" }: FormSwitchProps) => {
  const defaultSwitchProps = {
    checked: isActive,
    offColor: "#38444F",
    onColor: "#D63C00",
    uncheckedIcon: false,
    checkedIcon: false,
    "data-testid": "test-switch",
    onChange
  };

  const desktopSwitchProps = {
    handleDiameter: 30,
    height: 40,
    width: 65
  };

  const mobileSwitchProps = {
    handleDiameter: 24,
    height: 32,
    width: 52
  };

  return (
    <label className={classnames(styles["c-custom-styled-switch"], className)}>
      {label && (
        <span className={classnames(styles["c-custom-styled-switch__label"], "u-margin-bottom-none")}>{label}</span>
      )}
      {/* @ts-expect-error */}
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
};

export default FormSwitch;
