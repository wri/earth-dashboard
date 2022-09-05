import styles from "./option.module.scss";
import Icon from "components/ui/Icon";
import classNames from "classnames";
import Image from "next/image";

export type MenuOptionProps = {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  icon?: string;
  className?: string;
};

const MenuOption = ({ icon, title, description, buttonText, onClick, className }: MenuOptionProps) => {
  return (
    <div className={classNames(styles["c-menu-option__underlay"], className)} data-testid="option">
      <div tabIndex={1} className={classNames(styles["c-menu-option"])}>
        <div className={styles["c-menu-option__header-row"]}>
          {icon && <Image className={styles["c-menu-option__image"]} src={icon} alt="" role="presentation" />}
          <h3 className={styles["c-menu-option__title"]}>{title}</h3>
        </div>
        <p className={styles["c-menu-option__subtitle"]}>{description}</p>
        <div className={styles["c-menu-option__row"]}>
          <button className={styles["c-menu-option__button"]} onClick={onClick}>
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
