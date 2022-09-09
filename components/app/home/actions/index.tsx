import classnames from "classnames";
import { ReactNode } from "react";
import styles from "./actions.module.scss";

type ActionsProps = {
  children: ReactNode;
  isMobile: boolean;
  className?: string;
};

/** Wrapper for home page actions. */
const Actions = ({ children, isMobile, className = "" }: ActionsProps) => {
  return (
    <div className={classnames(styles["c-home-actions"], { [styles["mobile"]]: isMobile }, className)}>{children}</div>
  );
};

export default Actions;
