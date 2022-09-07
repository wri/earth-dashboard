import classnames from "classnames";
import styles from "./layout.module.scss";
import ResizablePanel from "components/app/home/dialog-panel/resizable-panel";

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
            {onBack && <button className={styles["c-home-menu__back-button"]} onClick={onBack} aria-label="Back" />}
            <h2 className={styles["c-home-menu__header-text"]}>{title}</h2>
            {onClose && <button className={styles["c-home-menu__close-button"]} onClick={onClose} aria-label="Close" />}
          </div>
        </div>
        <div className={classnames(styles["c-home-menu__content"], "u-padding-none")}>{children}</div>
      </div>
    </ResizablePanel>
  );
};

export default MenuLayout;
