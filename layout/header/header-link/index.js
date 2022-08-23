import classnames from "classnames";
import PropTypes from "prop-types";
import styles from "./header-link.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

/** Navigation link for header with active underline indicator. */
const HeaderLink = ({ href, text, ...rest }) => {
  const router = useRouter();

  return (
    <div
      className={classnames({
        [styles["c-header-link"]]: true,
        [styles["c-header-link__active"]]: router.pathname === href
      })}
    >
      <Link href={href} {...rest}>
        <a>{text}</a>
      </Link>

      <div className={styles["underline"]} />
    </div>
  );
};

HeaderLink.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default HeaderLink;
