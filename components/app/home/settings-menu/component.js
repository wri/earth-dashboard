import { createElement } from "react";
import classnames from "classnames";
import DialogPanel from "components/app/home/dialog-panel";
import IconButton from "components/ui/icon-button";
import styles from "./settings-menu.module.scss";
import settingsFormElements from "schemas/global-settings";
import CloseIcon from "public/static/icons/close.svg";
import PropTypes from "prop-types";
import useDialogPanel from "hooks/useDialogPanel";

const SettingsMenu = ({ isOpen, onClose, isMobile }) => {
  const { firstInput, shouldAnimate, handleClose } = useDialogPanel(isOpen, onClose);

  return (
    isOpen && (
      <DialogPanel onClose={handleClose} isMobile={isMobile} shouldAnimate={shouldAnimate}>
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
              onClick={() => handleClose(true)}
            />
          </div>

          <div className={styles["c-settings-menu-modal__body"]}>
            <div className={classnames(styles["c-settings-menu-modal__scroll"], "u-text-white")}>
              {settingsFormElements.map((formEl, index) =>
                createElement(formEl.component, { key: formEl.id, ref: !index ? firstInput : null, ...formEl.props })
              )}
            </div>
          </div>
        </div>
      </DialogPanel>
    )
  );
};

SettingsMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired
};

SettingsMenu.defaultProps = {};

export default SettingsMenu;
