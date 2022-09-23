import classnames from "classnames";
import { useRouter } from "next/router";
import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import styles from "./header-link.module.scss";
import Link from "next/link";

interface IHeaderLinkProps
  extends Omit<DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> {
  text: string;
  href: string;
  isActive?: boolean;
}

/** Navigation link for header with active underline indicator. */
const HeaderLink = ({ text, href, isActive, ...rest }: IHeaderLinkProps) => {
  // Navigation
  const router = useRouter();

  return (
    <div
      className={classnames({
        [styles["c-header-link"]]: true,
        [styles["c-header-link__active"]]: typeof isActive === "boolean" ? isActive : router.pathname === href
      })}
    >
      <Link href={href}>
        <a className={styles["text"]} {...rest}>
          {text}
        </a>
      </Link>

      <div className={styles["underline"]} />
    </div>
  );
};

export default HeaderLink;
