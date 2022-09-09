import classnames from "classnames";
import DialogPanel from "components/app/home/dialog-panel";
import IconButton from "components/ui/icon-button";
import styles from "./settings-menu.module.scss";
import useDialogPanel from "hooks/useDialogPanel";
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import Preferences from "./preferences";
import Icon from "components/ui/Icon";
import Basemaps from "./basemaps";
import DatePicker from "components/date-picker";
import { format } from "date-fns";
import Footer from "./footer";

type SettingsMenuProps = {
  isOpen: boolean;
  isDatePickerOpen: boolean;
  isMobile: boolean;
  currentDate?: Date;
  setSettingsClose: ActionCreatorWithoutPayload<string>;
  setDateOfDataShown: ActionCreatorWithPayload<string, string>;
  setIsDatePickerOpen: ActionCreatorWithPayload<boolean, string>;
};

/** Overlay settings menu for both desktop and mobile. */
const SettingsMenu = ({
  isOpen,
  isDatePickerOpen,
  currentDate,
  isMobile,
  setDateOfDataShown,
  setSettingsClose,
  setIsDatePickerOpen
}: SettingsMenuProps) => {
  const { shouldAnimate, handleClose } = useDialogPanel(isOpen, () => {
    setSettingsClose();
    setIsDatePickerOpen(false);
  });

  /** Sets the current date data. */
  const handleChangeDate = (date: Date) => {
    setDateOfDataShown(date.toString());
    setIsDatePickerOpen(false);
  };

  const handleBack = () => {
    setIsDatePickerOpen(false);
  };

  return isOpen ? (
    <DialogPanel onClose={handleClose} isMobile={isMobile} shouldAnimate={shouldAnimate}>
      <div className={styles["c-settings-menu-modal"]} aria-labelledby="settingsModalTitle" role="document">
        {/* Settings */}
        <div className={classnames(styles["c-settings-menu-modal__header"], "u-text-center")}>
          {/* Header */}
          <div>
            {isDatePickerOpen ? (
              <IconButton name="arrow-left" onClick={handleBack} small />
            ) : (
              <Icon name={"more"} size={30} type="decorative" className={styles["icon"]} />
            )}
            <h2 id="settingsModalTitle" className={classnames(styles["title"], "u-margin-bottom-none")}>
              {isDatePickerOpen ? "Change Date" : "More"}
            </h2>
          </div>

          {/* Close button */}
          <IconButton
            name="close"
            size={12}
            aria-label="Close Settings"
            className={styles["c-settings-menu-modal__close"]}
            onClick={handleClose}
            small
          />
        </div>

        {/* Content */}
        <div className={styles["c-settings-menu-modal__body"]}>
          <div className={styles["scroll"]}>
            {/* Dynamic views */}
            {isDatePickerOpen ? (
              // Change date
              <div className={styles["main"]}>
                <p className={styles["c-settings-menu-modal__date-text"]}>
                  Showing data for: {format(currentDate ?? new Date(), "yyyy-MM-dd")} Local
                </p>
                <DatePicker
                  // @ts-expect-error
                  initialDate={currentDate ?? new Date()}
                  onSubmit={handleChangeDate}
                  hasLiveDataButton
                  className={styles["c-settings-menu-modal__date-picker"]}
                />
              </div>
            ) : (
              // Other options
              <>
                <Preferences />
                <Basemaps />
                <Footer />
              </>
            )}
          </div>
        </div>
      </div>
    </DialogPanel>
  ) : null;
};

export default SettingsMenu;