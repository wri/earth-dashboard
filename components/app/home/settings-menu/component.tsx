import classnames from "classnames";
import DialogPanel from "components/app/home/dialog-panel";
import IconButton from "components/ui/icon-button";
import styles from "./settings-menu.module.scss";
import useDialogPanel from "hooks/useDialogPanel";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import Preferences from "./preferences";

type SettingsMenuProps = {
  isOpen: boolean;
  isMobile: boolean;
  onClose: ActionCreatorWithoutPayload<string>;
};

/** Overlay settings menu for both desktop and mobile. */
const SettingsMenu = ({ isOpen, onClose, isMobile }: SettingsMenuProps) => {
  const { shouldAnimate, handleClose } = useDialogPanel(isOpen, onClose);

  return isOpen ? (
    <DialogPanel onClose={handleClose} isMobile={isMobile} shouldAnimate={shouldAnimate}>
      <div className={styles["c-settings-menu-modal"]} aria-labelledby="settingsModalTitle" role="document">
        {/* Settings */}
        <div className={classnames(styles["c-settings-menu-modal__header"], "u-text-center")}>
          <h2
            id="settingsModalTitle"
            className={classnames(styles["c-settings-menu-modal__header__title"], "u-margin-bottom-none")}
          >
            Settings
          </h2>
          <IconButton
            name="close"
            aria-label="Close Settings"
            className={styles["c-settings-menu-modal__close"]}
            onClick={() => handleClose(true)}
          />
        </div>

        {/* Form content */}
        <div className={styles["c-settings-menu-modal__body"]}>
          <div className={styles["c-settings-menu-modal__scroll"]}>
            <Preferences />
          </div>
        </div>
      </div>
    </DialogPanel>
  ) : null;
};

export default SettingsMenu;
