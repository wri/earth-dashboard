import classnames from "classnames";
import styles from "./layout.module.scss";
import ResizablePanel from "components/app/home/dialog-panel/resizable-panel";
import IconButton from "components/ui/icon-button";

const MenuLayout = ({
  title,
  isMobile,
  isClosing,
  iconName,
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
      <div className={classnames(styles["c-layout"], isClosing && styles["c-layout--closing"], className)} {...rest}>
        <div className={classnames(styles["c-layout__header"])}>
          <div
            className={classnames(
              styles["c-layout__header-content"],
              iconName == "globe" ? styles["c-layout__header-content--has-globe-icon"] : undefined
            )}
          >
            {onBack && (
              <IconButton
                className={styles["c-layout__back-button"]}
                name="arrow-left"
                medium
                onClick={onBack}
                aria-label="Back"
                size={16}
              />
            )}
            <h2 className={styles["c-layout__header-text"]}>{title}</h2>
            {onClose && <IconButton name="close" size={12} medium onClick={onClose} aria-label="Close" />}
          </div>
        </div>
        <div className={classnames(styles["c-layout__content"], "u-padding-none")}>{children}</div>
      </div>
    </ResizablePanel>
  );
};

export default MenuLayout;
