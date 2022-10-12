import React, { ElementType } from "react";
import classnames from "classnames";
import Icon, { IconNames } from "../Icon";
import styles from "./cta-button.module.scss";

type CtaButtonProps = {
  type?: "Default" | "Light";
  iconPosition?: "Right" | "Left";
  iconName?: IconNames;
  iconUrl?: string;
  as?: ElementType;
  href?: string;
  text?: string;
  iconSize?: number;
  className?: string;
  onClick?: () => void;
};

/** Styled icon button. */
const CtaButton = ({
  type = "Default",
  iconPosition = "Right",
  as = "button",
  href,
  text,
  iconUrl,
  iconName,
  iconSize,
  className,
  onClick
}: CtaButtonProps) => {
  const CtaElement = as;

  const renderIcon = () => (
    <>
      {iconName && (
        <span className={styles["c-cta-button__icon"]}>
          <Icon name={iconName} type="decorative" size={iconSize ?? 12} />
        </span>
      )}
      {iconUrl && (
        <span
          className={styles["c-cta-button__icon"]}
          style={{ backgroundImage: `url(${iconUrl})`, backgroundSize: "24px" }}
        />
      )}
    </>
  );

  return (
    <CtaElement className={classnames(styles["c-cta-button"], className)} onClick={onClick} href={href}>
      <div className={classnames(styles["c-cta-button__content"], type === "Light" && styles["light"])}>
        {iconPosition === "Left" && renderIcon()}
        <span className={styles["c-cta-button__text"]}>{text}</span>
        {iconPosition === "Right" && renderIcon()}
      </div>
    </CtaElement>
  );
};

export default CtaButton;
