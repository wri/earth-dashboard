import classnames from "classnames";
import DialogPanel from "components/app/home/dialog-panel";
import IconButton from "components/ui/icon-button";
import styles from "./settings-menu.module.scss";
import useDialogPanel from "hooks/useDialogPanel";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import Preferences from "./preferences";
import Icon from "components/ui/Icon";

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
          {/* Title */}
          <div>
            <Icon name="more" size={30} type="decorative" className={styles["icon"]} />
            <h2 id="settingsModalTitle" className={classnames(styles["title"], "u-margin-bottom-none")}>
              More
            </h2>
          </div>

          {/* Close button */}
          <IconButton
            name="close"
            aria-label="Close Settings"
            className={styles["c-settings-menu-modal__close"]}
            onClick={() => handleClose(true)}
            small
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
