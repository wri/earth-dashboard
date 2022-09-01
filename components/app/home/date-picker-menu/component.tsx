import classnames from "classnames";
import DialogPanel from "components/app/home/dialog-panel";
import IconButton from "components/ui/icon-button";
import styles from "components/app/home/settings-menu/settings-menu.module.scss";
import useDialogPanel from "hooks/useDialogPanel";
import DatePicker from "components/date-picker";
import { format } from "date-fns";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

type DatePickerMenuProps = {
  isOpen: boolean;
  isMobile: boolean;
  currentDate?: Date;
  setIsDatePickerOpen: ActionCreatorWithPayload<boolean, string>;
  setDateOfDataShown: ActionCreatorWithPayload<string, string>;
};

const DatePickerMenu = ({
  isOpen,
  isMobile,
  currentDate,
  setIsDatePickerOpen,
  setDateOfDataShown
}: DatePickerMenuProps) => {
  const { firstInput, shouldAnimate, handleClose } = useDialogPanel(isOpen, () => setIsDatePickerOpen(false));

  /** Sets the current date data. */
  const handleSubmit = (date: Date) => {
    setDateOfDataShown(date.toString());
    handleClose();
  };

  return isOpen ? (
    <DialogPanel onClose={handleClose} isMobile={isMobile} shouldAnimate={shouldAnimate}>
      <div
        className={styles["c-settings-menu-modal"]}
        aria-labelledby="dateModalTitle"
        role="document"
        data-testid="menu"
      >
        <div className={classnames(styles["c-settings-menu-modal__header"], "u-text-center")}>
          <h1
            id="dateModalTitle"
            className={classnames(styles["c-settings-menu-modal__header__title"], "u-margin-bottom-none")}
          >
            Change Date
          </h1>
          <IconButton
            data-testid="close-button"
            aria-label="Close Date Picker"
            name="close"
            onClick={() => handleClose(true)}
            className={styles["c-settings-menu-modal__close"]}
          />
        </div>

        <div className={styles["c-settings-menu-modal__body"]}>
          <div className={classnames(styles["c-settings-menu-modal__scroll"], "u-text-white")}>
            <p className={styles["c-settings-menu-modal__body-title"]}>
              Showing data for: {format(currentDate ?? new Date(), "yyyy-MM-dd")} Local
            </p>
            <DatePicker
              // @ts-expect-error
              initialDate={currentDate ?? new Date()}
              onSubmit={handleSubmit}
              hasLiveDataButton
              ref={firstInput}
            />
          </div>
        </div>
      </div>
    </DialogPanel>
  ) : null;
};

export default DatePickerMenu;
