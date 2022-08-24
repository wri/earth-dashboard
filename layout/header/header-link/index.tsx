import classnames from "classnames";
import styles from "./header-link.module.scss";
import Link from "next/link";

type HeaderLinkProps = {
  text: string;
  active: boolean;
  onClick?: () => void;
  href?: string;
};

/** Navigation link for header with active underline indicator. */
const HeaderLink = ({ text, active, onClick, href, ...rest }: HeaderLinkProps) => {
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
        href && (
          <Link href={href} {...rest}>
            <a className={styles["text"]}>{text}</a>
          </Link>
        )
      )}

      <div className={styles["underline"]} />
    </div>
  );
};

export default HeaderLink;
