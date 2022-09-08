import React from "react";
import classnames from "classnames";
import Icon, { IconProps, IconNames } from "../Icon";
import styles from "./cta-button.module.scss";

type CtaButtonProps = {
  onClick: () => void;
  text: string;
  iconName: IconNames;
  iconSize: number;
};

/** Styled icon button. */
const CtaButton = ({ onClick, text, iconName, iconSize }: CtaButtonProps) => {
  return (
    <button className={styles["c-cta-button"]} onClick={onClick}>
      <div className={styles["c-cta-button__content"]}>
        <span className={styles["c-cta-button__text"]}>{text}</span>
        <span className={styles["c-cta-button__icon"]}>
          <Icon name={iconName} type="decorative" size={iconSize} />
        </span>
      </div>
    </button>
  );
};

export default CtaButton;
