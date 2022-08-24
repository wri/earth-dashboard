import classnames from "classnames";
import { useRouter } from "next/router";
import styles from "./header-link.module.scss";
import Link from "next/link";

type HeaderLinkProps = {
  text: string;
  href: string;
};

/** Navigation link for header with active underline indicator. */
const HeaderLink = ({ text, href, ...rest }: HeaderLinkProps) => {
  // Navigation
  const router = useRouter();

  return (
    <div
      className={classnames({
        [styles["c-header-link"]]: true,
        [styles["c-header-link__active"]]: router.pathname === href
      })}
    >
      <Link href={href} {...rest}>
        <a className={styles["text"]}>{text}</a>
      </Link>

      <div className={styles["underline"]} />
    </div>
  );
};

export default HeaderLink;
