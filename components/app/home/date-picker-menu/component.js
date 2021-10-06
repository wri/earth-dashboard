import { createElement } from "react";
import classnames from "classnames";
import DialogPanel from "components/app/home/dialog-panel";
import IconButton from "components/ui/icon-button";
import styles from "components/app/home/settings-menu/settings-menu.module.scss";
import CloseIcon from "public/static/icons/close.svg";
import settingsFormElements from "schemas/globalSettings";
import PropTypes from "prop-types";
import useDialogPanel from "hooks/useDialogPanel";

const DatePickerMenu = ({ isOpen, onClose, isMobile }) => {
  const { firstInput, shouldAnimate, handleClose } = useDialogPanel(isOpen, onClose);

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

          <div className={classnames(styles["c-settings-menu-modal__body"], "u-text-white")}></div>
        </div>
      </DialogPanel>
    )
  );
};

DatePickerMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired
};

DatePickerMenu.defaultProps = {};

export default DatePickerMenu;
