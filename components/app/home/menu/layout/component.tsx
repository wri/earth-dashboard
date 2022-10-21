import { CSSProperties, forwardRef, ReactNode } from "react";
import classnames from "classnames";
import styles from "./layout.module.scss";
import IconButton from "components/ui/icon-button";

type MenuLayoutProps = {
  title: string;
  icon?: ReactNode;
  className?: string;
  onBack?: () => void;
  onClose?: () => void;
  children: ReactNode;
  style?: CSSProperties;
};

/** Layout wrapper for the menu component. */
const MenuLayout = forwardRef<HTMLDivElement, MenuLayoutProps>(
  ({ title, icon, className = "", onBack, onClose, children, style }, ref) => {
    return (
      <div ref={ref} className={classnames(styles["c-layout"], className)} style={style}>
        {/* Header */}
        <div className={classnames(styles["c-layout__header"])}>
          <div className={classnames(styles["c-layout__header-content"])}>
            {/* Header icon */}
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
              icon && <div className={styles["c-layout__header-icon"]}>{icon}</div>
            )}

            {/* Title */}
            <h2 className={styles["c-layout__header-text"]}>{title}</h2>

            {/* Close button */}
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

        {/* Content */}
        <div className={classnames(styles["c-layout__content"], "u-padding-none")}>{children}</div>
      </div>
    );
  }
);

MenuLayout.displayName = "MenuLayout";

export default MenuLayout;
