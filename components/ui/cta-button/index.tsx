import React, { ElementType, ReactNode } from "react";
import classnames from "classnames";
import Icon, { IconProps, IconNames } from "../Icon";
import styles from "./cta-button.module.scss";

type CtaButtonProps = {
  as?: ElementType;
  href?: string;
  text?: string;
  iconName: IconNames;
  iconSize: number;
  onClick?: () => void;
};

/** Styled icon button. */
const CtaButton = ({ as = "button", href, text, iconName, iconSize, onClick }: CtaButtonProps) => {
  const CtaElement = as;
  return (
    <CtaElement className={styles["c-cta-button"]} onClick={onClick} href={href}>
      <div className={styles["c-cta-button__content"]}>
        <span className={styles["c-cta-button__text"]}>{text}</span>
        <span className={styles["c-cta-button__icon"]}>
          <Icon name={iconName} type="decorative" size={iconSize} />
        </span>
      </div>
    </CtaElement>
  );
};

export default CtaButton;
