import classnames from "classnames";
import styles from "./layout.module.scss";
import ResizablePanel from "components/app/home/dialog-panel/resizable-panel";
import IconButton from "components/ui/icon-button";

const MenuLayout = ({
  title,
  isMobile,
  isClosing,
  className,
  dialogHeight,
  setDialogHeight,
  onBack,
  onClose,
  children,
  ...rest
}) => {
  const handleResize = (e, direction, div) => setDialogHeight({ height: div.offsetHeight });
  return (
    <ResizablePanel isMobile={isMobile} height={dialogHeight} onResize={handleResize}>
      <div
        className={classnames(styles["c-home-menu"], isClosing && styles["c-home-menu--closing"], className)}
        {...rest}
      >
        <div className={classnames(styles["c-home-menu__header"])}>
          <div className={classnames(styles["c-home-menu__header-content"])}>
            {onBack && (
              <IconButton
                className={styles["c-home-menu__back-button"]}
                name="back"
                medium
                onClick={onBack}
                aria-label="Back"
                size={16}
              />
            )}
            <h2 className={styles["c-home-menu__header-text"]}>{title}</h2>
            {onClose && <IconButton name="close" size={12} medium onClick={onClose} aria-label="Close" />}
          </div>
        </div>
        <div className={classnames(styles["c-home-menu__content"], "u-padding-none")}>{children}</div>
      </div>
    </ResizablePanel>
  );
};

export default MenuLayout;
