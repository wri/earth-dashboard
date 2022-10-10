import classnames from "classnames";
import Link from "next/link";
import styles from "components/ui/anchor-cta/anchor-cta.module.scss";
import { ReactNode } from "react";

type AnchorCTAProps = {
  className?: string;
  href?: string;
  onClick?: () => void;
  external?: boolean;
  children: ReactNode;
};

const AnchorCTA = ({ className = "", href, children, onClick, external, ...rest }: AnchorCTAProps) => {
  const anchorCTAProps = {
    className: classnames(className, styles["c-anchor-cta"]),
    onClick,
    ...(external ? { href, target: "_blank", rel: "nofollow noreferrer" } : {}),
    ...rest
  };

  return href && external ? (
    <a {...anchorCTAProps}>{children}</a>
  ) : href && !external ? (
    <Link href={href}>
      <a {...anchorCTAProps}>{children}</a>
    </Link>
  ) : (
    <button className={classnames(className, styles["c-anchor-cta"])} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default AnchorCTA;
