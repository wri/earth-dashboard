/* eslint-disable @next/next/no-img-element */
import PropTypes from "prop-types";
import styles from "./option.module.scss";
import Icon, { IconProps } from "components/ui/Icon";

const MenuOption = ({ icon, title, description, buttonText, onClick, ...rest }) => {
  return (
    <button className={styles["c-menu-option"]} onClick={onClick} data-testid="option">
      <div className={styles["c-menu-option__header-row"]}>
        {icon && <img className={styles["c-menu-option__image"]} src={icon} alt="" role="presentation" />}
        <h3 className={styles["c-menu-option__title"]}>{title}</h3>
      </div>
      <p className={styles["c-menu-option__subtitle"]}>{description}</p>
      <div className={styles["c-menu-option__row"]}>
        <button className={styles["c-menu-option__button"]}>
          <span className={styles["c-menu-option__button-text"]}>{buttonText}</span>
          <span className={styles["c-menu-option__button-icon"]}>
            <Icon name={"arrow-right"} type="decorative" size={15} />
          </span>
        </button>
      </div>
    </button>
  );
};

MenuOption.propTypes = {
  headline: PropTypes.object.isRequired,
  className: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string])
};

MenuOption.defaultProps = {
  className: "",
  as: "div"
};

export default MenuOption;
