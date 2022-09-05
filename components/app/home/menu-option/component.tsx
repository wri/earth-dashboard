/* eslint-disable @next/next/no-img-element */
import styles from "./option.module.scss";
import Icon from "components/ui/Icon";
import classNames from "classnames";

export type MenuOptionProps = {
  title: string;
  description: string;
  buttonText: string;
  isFocussed: boolean;
  icon?: string;
  className?: string;
  focusAction: () => void;
  ctaAction: () => void;
};

const MenuOption = ({
  title,
  description,
  buttonText,
  icon,
  className,
  isFocussed,
  focusAction,
  ctaAction
}: MenuOptionProps) => {
  return (
    <div className={classNames(styles["c-menu-option__underlay"], className)} data-testid="option">
      <div
        className={classNames(styles["c-menu-option"], isFocussed && styles["c-menu-option__focussed"])}
        onClick={focusAction}
      >
        <div className={styles["c-menu-option__header-row"]}>
          {icon && <img className={styles["c-menu-option__image"]} src={icon} alt="" role="presentation" />}
          <h3 className={styles["c-menu-option__title"]}>{title}</h3>
        </div>
        <p className={styles["c-menu-option__subtitle"]}>{description}</p>
        <div className={styles["c-menu-option__row"]}>
          <button className={styles["c-menu-option__button"]} onClick={ctaAction}>
            <span className={styles["c-menu-option__button-text"]}>{buttonText}</span>
            <span className={styles["c-menu-option__button-icon"]}>
              <Icon name={"arrow-right"} type="decorative" size={15} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuOption;
