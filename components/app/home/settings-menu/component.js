import { createElement } from "react";
import classnames from "classnames";
import DialogPanel from "components/app/home/dialog-panel";
import styles from "./settings-menu.module.scss";
import settingsFormElements from "schemas/global-settings";

const SettingsMenu = ({ isSettingsOpen, setSettingsClose, isMobile }) => {
  if (!isSettingsOpen) return null;

  const handleClose = e => {
    setSettingsClose();
  };

  return (
    <DialogPanel onClose={handleClose} isMobile={isMobile}>
      <div className={styles["c-settings-menu-modal"]}>
        <div className={classnames(styles["c-settings-menu-modal__header"], "u-text-center")}>
          <h1 className={classnames(styles["c-settings-menu-modal__header__title"], "u-margin-bottom-none")}>
            Settings
          </h1>
          <button
            type="button"
            className={styles["c-settings-menu-modal__close"]}
            aria-label="Close"
            onClick={handleClose}
          >
            <img src="/static/icons/close.svg" width="48px" height="48px" role="presentation" />
          </button>
        </div>

        <div className={classnames(styles["c-settings-menu-modal__body"], "u-text-white")}>
          {settingsFormElements.map(formEl => createElement(formEl.component, { key: formEl.id, ...formEl.props }))}
        </div>
      </div>
    </DialogPanel>
  );
};

export default SettingsMenu;
