import { createElement, useEffect, useRef, useState } from "react";
import classnames from "classnames";
import DialogPanel from "components/app/home/dialog-panel";
import IconButton from "components/ui/icon-button";
import styles from "./settings-menu.module.scss";
import settingsFormElements from "schemas/global-settings";
import dialogStyles from "components/app/home/dialog-panel/dialog-panel.module.scss";
import CloseIcon from "public/static/icons/close.svg";
import PropTypes from "prop-types";

const SettingsMenu = ({ isSettingsOpen, setSettingsClose, isMobile }) => {
  const firstInput = useRef(null);
  const [forceClose, setForceClose] = useState(false);

  useEffect(() => {
    if (firstInput.current && isSettingsOpen) {
      firstInput.current.$inputRef?.focus();
    }
  }, [firstInput, isSettingsOpen]);

  const handleClose = () => {
    setForceClose(false);
    setSettingsClose();
  };

  return (
    isSettingsOpen && (
      <DialogPanel onClose={handleClose} isMobile={isMobile} forceClose={forceClose}>
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
              onClick={() => {
                setForceClose(true);
                setTimeout(handleClose, dialogStyles["transitionDuration"]);
              }}
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
