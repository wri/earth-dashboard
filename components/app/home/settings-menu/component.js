import classnames from "classnames";
import styles from "./settings-menu.module.scss";

const SettingsMenu = ({ isSettingsOpen, setSettingsClose }) => {
  // Should never get here anyway...
  if (!isSettingsOpen) return;

  const handleClose = e => {
    setSettingsClose();
  };

  return (
    <div className={classnames(styles["c-settings-menu"])}>
      <div className={classnames(styles["c-settings-menu__overlay"])} onClick={handleClose}></div>

      <div className={styles["c-settings-menu-modal"]}>
        <div className={classnames(styles["c-settings-menu-modal__header"], "u-text-center")}>
          <h1 className="u-margin-bottom-none">Settings</h1>
          <button type="button" className={styles["c-settings-menu-modal__close"]} aria-label="Close" onClick={handleClose}>
            <img src="/static/icons/close.svg" width="48px" height="48px" role="presentation" />
          </button>
        </div>

        <div className={classnames(styles["c-settings-menu-modal__body"])}>
          ...
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
