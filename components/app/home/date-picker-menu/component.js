import classnames from "classnames";
import DialogPanel from "components/app/home/dialog-panel";
import IconButton from "components/ui/icon-button";
import styles from "components/app/home/settings-menu/settings-menu.module.scss";
import CloseIcon from "public/static/icons/close.svg";
import PropTypes from "prop-types";
import useDialogPanel from "hooks/useDialogPanel";
import DatePicker from "components/date-picker";
import { format } from "date-fns";

const DatePickerMenu = ({ isOpen, onClose, isMobile, currentDate, setDate }) => {
  const { firstInput, shouldAnimate, handleClose } = useDialogPanel(isOpen, onClose);

  const handleSubmit = date => {
    setDate(date.toString());
    handleClose();
  };

  return (
    isOpen && (
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
              icon={CloseIcon}
              className={styles["c-settings-menu-modal__close"]}
              aria-label="Close Date Picker"
              onClick={() => handleClose(true)}
              data-testid="close-button"
            />
          </div>

          <div className={classnames(styles["c-settings-menu-modal__body"], "u-text-white")}>
            <p className={styles["c-settings-menu-modal__body-title"]}>
              Showing data for: {format(currentDate, "yyyy-MM-dd")} Local
            </p>
            <DatePicker initialDate={currentDate} onSubmit={handleSubmit} hasLiveDataButton ref={firstInput} />
          </div>
        </div>
      </DialogPanel>
    )
  );
};

DatePickerMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  currentDate: PropTypes.instanceOf(Date),
  setDate: PropTypes.func.isRequired
};

DatePickerMenu.defaultProps = {
  currentDate: new Date()
};

export default DatePickerMenu;
