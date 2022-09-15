/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import styles from "./panel.module.scss";
import classNames from "classnames";
import CtaButton from "components/ui/cta-button";

export type MenuOptionProps = {
  title?: string;
  icon?: string;
  className?: string;
  isSelected?: boolean;
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
  isSelected,
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
        data-role="content"
        className={classNames(
          styles["c-content-panel"],
          isSelected ? styles["c-content-panel--selected"] : undefined,
          canFocus ? styles["c-content-panel__focusable"] : undefined
        )}
      >
        <div
          className={classNames(
            styles["c-content-panel__header-row"],
            (!!icon && styles["c-content-panel__header-row--with-icon"]) ?? undefined
          )}
        >
          {icon && (
            <div className={styles["c-content-panel__icon-container"]}>
              <img className={styles["c-content-panel__image"]} src={icon} alt="" role="presentation" />
            </div>
          )}
          <div className={styles["c-content-panel__title-container"]}>
            <h3 className={styles["c-content-panel__title"]}>{title}</h3>
          </div>
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
