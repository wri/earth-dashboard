import React, { ElementType } from "react";
import classnames from "classnames";
import Icon, { IconNames } from "../Icon";
import styles from "./cta-button.module.scss";

type CtaButtonProps = {
  type?: "Default" | "Light";
  as?: ElementType;
  href?: string;
  text?: string;
  iconUrl?: string;
  iconName?: IconNames;
  iconSize?: number;
  className?: string;
  onClick?: () => void;
};

/** Styled icon button. */
const CtaButton = ({
  type,
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
  return (
    <CtaElement className={classnames(styles["c-cta-button"], className)} onClick={onClick} href={href}>
      <div className={styles["c-cta-button__content"]} style={!iconName ? { padding: "8px 24px" } : {}}>
        <span className={styles["c-cta-button__text"]} style={!iconName ? { marginRight: "0px" } : {}}>
          {text}
        </span>
        {iconName && (
          <span className={styles["c-cta-button__icon"]}>
            <Icon name={iconName} type="decorative" size={iconSize ?? 12} />
          </span>
        )}
        {/* {iconUrl && (
          <span className={styles["c-cta-button__icon"]}>
            <Icon url={iconUrl} type="decorative" size={iconSize ?? 12} />
          </span>
        )} */}
      </div>
    </CtaElement>
  );
};

export default CtaButton;
