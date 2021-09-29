import { createElement, useEffect, useRef } from "react";
import classnames from "classnames";
import DialogPanel from "components/app/home/dialog-panel";
import IconButton from "components/ui/icon-button";
import styles from "./settings-menu.module.scss";
import CloseIcon from "public/static/icons/close.svg";
import settingsFormElements from "schemas/globalSettings";
import PropTypes from "prop-types";

const SettingsMenu = ({ isSettingsOpen, setSettingsClose, isMobile }) => {
  const firstInput = useRef(null);

  useEffect(() => {
    if (firstInput.current && isSettingsOpen) {
      firstInput.current.$inputRef?.focus();
    }
  }, [firstInput, isSettingsOpen]);

  const handleClose = () => {
    setSettingsClose();
  };

  return (
    isSettingsOpen && (
      <DialogPanel onClose={handleClose} isMobile={isMobile}>
        <div className={styles["c-settings-menu-modal"]} aria-labelledby="settingsModalTitle" role="document">
          <div className={classnames(styles["c-settings-menu-modal__header"], "u-text-center")}>
            <h1
              id="settingsModalTitle"
              className={classnames(styles["c-settings-menu-modal__header__title"], "u-margin-bottom-none")}
            >
              Settings
            </h1>
            <IconButton
              icon={CloseIcon}
              className={styles["c-settings-menu-modal__close"]}
              aria-label="Close Settings"
              onClick={handleClose}
            />
          </div>

          <div className={classnames(styles["c-settings-menu-modal__body"], "u-text-white")}>
            {settingsFormElements.map((formEl, index) =>
              createElement(formEl.component, { key: formEl.id, ref: !index ? firstInput : null, ...formEl.props })
            )}
          </div>
        </div>
      </DialogPanel>
    )
  );
};

SettingsMenu.propTypes = {
  isSettingsOpen: PropTypes.bool.isRequired,
  setSettingsClose: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired
};

SettingsMenu.defaultProps = {};

export default SettingsMenu;
