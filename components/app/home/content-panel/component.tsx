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
  selectAction?: () => any;
  ctaAction?: () => any;
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
  selectAction,
  ctaAction,
  ctaLink,
  children
}: MenuOptionProps) => {
  return (
    <div
      className={classNames(
        styles["c-content-panel__underlay"],
        canFocus && styles["c-content-panel__underlay--can-focus"],
        className
      )}
      data-testid="content-panel"
      onClick={selectAction}
    >
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
              text={buttonText}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentPanel;
