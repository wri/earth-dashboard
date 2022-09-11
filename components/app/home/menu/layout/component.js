import classnames from "classnames";
import styles from "./layout.module.scss";
import IconButton from "components/ui/icon-button";

const MenuLayout = ({ title, className, onBack, onClose, children, ...rest }) => {
  return (
    <div className={classnames(styles["c-home-menu"], className)} {...rest}>
      <div className={classnames(styles["c-home-menu__header"])}>
        <div className={classnames(styles["c-home-menu__header-content"])}>
          {onBack && (
            <IconButton
              className={styles["c-home-menu__back-button"]}
              name="back"
              size={18}
              medium
              onClick={onBack}
              aria-label="Back"
            />
          )}
          <h2 className={styles["c-home-menu__header-text"]}>{title}</h2>
          {onClose && (
            <IconButton
              className={styles["c-home-menu__close-button"]}
              name="close"
              size={14}
              medium
              onClick={onClose}
              aria-label="Close"
            />
          )}
        </div>
      </div>
      <div className={classnames(styles["c-home-menu__content"], "u-padding-none")}>{children}</div>
    </div>
  );
};

export default MenuLayout;
