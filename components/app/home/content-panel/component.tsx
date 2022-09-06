/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import styles from "./panel.module.scss";
import Icon from "components/ui/Icon";
import classNames from "classnames";

export type MenuOptionProps = {
  title: string;
  buttonText?: string;
  ctaAction?: () => void;
  icon?: string;
  className?: string;
  children: ReactNode;
  canFocus?: boolean;
};

const ContentPanel = ({ icon, title, buttonText, canFocus, ctaAction, className, children }: MenuOptionProps) => (
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
      {ctaAction && (
        <div className={styles["c-content-panel__row"]}>
          <button className={styles["c-content-panel__button"]} onClick={ctaAction}>
            <span className={styles["c-content-panel__button-text"]}>{buttonText}</span>
            <span className={styles["c-content-panel__button-icon"]}>
              <Icon name={"arrow-right"} type="decorative" size={15} />
            </span>
          </button>
        </div>
      )}
    </div>
  </div>
);

export default ContentPanel;
