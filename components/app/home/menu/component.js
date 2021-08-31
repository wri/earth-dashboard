import { forwardRef } from "react";
import classnames from "classnames";
import styles from "./menu.module.scss";
import PropTypes from "prop-types";

const Menu = forwardRef(({ isMobile, onClose, isClosing, ...rest }, ref) => {
  return (
    <div className={classnames(styles["c-home-menu-container"], isClosing && styles["c-home-menu-container--closing"])}>
      <div className={classnames(styles["c-home-menu"], isClosing && styles["c-home-menu--closing"])} {...rest}>
        <div className={classnames([styles["c-home-menu__header"], "u-padding-horizontal-xl"])}>
          <h2 className={styles["c-home-menu__header-text"]}>Understand the emergency</h2>
          {onClose && (
            <button className={styles["c-home-menu__close-button"]} onClick={onClose} aria-label="Close menu" />
          )}
        </div>
        <div className={classnames([styles["c-home-menu__content"], "u-padding-xl"])}>
          <fieldset>
            <legend>Put controls here</legend>
            <input ref={ref} type="radio" />
          </fieldset>
        </div>
      </div>
    </div>
  );
});

Menu.displayName = "Menu";

Menu.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  isClosing: PropTypes.bool.isRequired,
  onClose: PropTypes.func
};

export default Menu;
