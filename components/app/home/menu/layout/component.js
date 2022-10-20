import { forwardRef } from "react";
import classnames from "classnames";
import styles from "./layout.module.scss";
import IconButton from "components/ui/icon-button";

const MenuLayout = forwardRef(({ title, icon = null, className, onBack, onClose, children, ...rest }, ref) => {
  return (
    <div ref={ref} className={classnames(styles["c-layout"], className)} {...rest}>
      <div className={classnames(styles["c-layout__header"])}>
        <div className={classnames(styles["c-layout__header-content"])}>
          {onBack ? (
            <IconButton
              className={styles["c-layout__back-button"]}
              name="arrow-left"
              medium
              onClick={onBack}
              aria-label="Back"
              size={18}
            />
          ) : (
            <div className={styles["c-layout__header-icon"]}>{icon}</div>
          )}
          <h2 className={styles["c-layout__header-text"]}>{title}</h2>
          {onClose && (
            <IconButton
              className={styles["c-layout__close-button"]}
              name="close"
              size={14}
              medium
              onClick={onClose}
              aria-label="Close"
            />
          )}
        </div>
      </div>
      <div className={classnames(styles["c-layout__content"], "u-padding-none")}>{children}</div>
    </div>
  );
});

MenuLayout.displayName = "MenuLayout";

export default MenuLayout;
