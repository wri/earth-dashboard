/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import styles from "./panel.module.scss";
import Icon from "components/ui/Icon";
import classNames from "classnames";
import CtaButton from "components/ui/cta-button";

export type MenuOptionProps = {
  title: string;
  icon?: string;
  className?: string;
  canFocus?: boolean;
  ctaControl?: React.ElementType;
  buttonText?: string;
  ctaAction?: () => void;
  ctaLink?: string;
  children: ReactNode;
};

const ContentPanel = ({
  title,
  icon,
  className,
  canFocus,
  ctaControl,
  buttonText,
  ctaAction,
  ctaLink,
  children
}: MenuOptionProps) => {
  const CtaElement = ctaControl || "button";
  return (
    <div className={classNames(styles["c-content-panel__underlay"], className)} data-testid="content-panel">
      <div
        tabIndex={canFocus ? 0 : undefined}
        className={classNames(styles["c-content-panel"], canFocus ? styles["c-content-panel__focusable"] : undefined)}
      >
        <div className={styles["c-content-panel__header-row"]}>
          {icon && <img className={styles["c-content-panel__image"]} src={icon} alt="" role="presentation" />}
          <h3 className={styles["c-content-panel__title"]}>{title}</h3>
        </div>
        {children}
        {(ctaAction || ctaLink) && (
          <div className={styles["c-content-panel__cta"]}>
            <CtaButton
              as={ctaControl || "button"}
              onClick={ctaAction}
              href={ctaLink}
              iconName="arrow-right"
              iconSize={15}
              text={buttonText}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentPanel;
