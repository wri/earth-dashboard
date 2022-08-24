import classnames from "classnames";
import PropTypes from "prop-types";
import styles from "./header-link.module.scss";
import Link from "next/link";

/** Navigation link for header with active underline indicator. */
const HeaderLink = ({ text, active, onClick, href, ...rest }) => {
  return (
    <div
      className={classnames({
        [styles["c-header-link"]]: true,
        [styles["c-header-link__active"]]: active
      })}
    >
      {onClick ? (
        <button onClick={onClick} className={styles["text"]}>
          {text}
        </button>
      ) : (
        <Link href={href} {...rest}>
          <a className={styles["text"]}>{text}</a>
        </Link>
      )}

      <div className={styles["underline"]} />
    </div>
  );
};

HeaderLink.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  href: PropTypes.string
};

export default HeaderLink;
