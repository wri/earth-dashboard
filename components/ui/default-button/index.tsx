import classnames from "classnames";
import { ReactNode } from "react";
import styles from "./default-button.module.scss";

type DefaultButtonProps = {
  text: string;
  icon?: ReactNode;
  className?: string;
  onClick: () => void;
};

/** Generic button with background and option for icon. */
const DefaultButton = ({ text, icon = null, className = "", ...rest }: DefaultButtonProps) => {
  return (
    <button className={classnames(styles["c-default-button"], className)} {...rest}>
      <p className={styles["c-default-button__text"]}>{text}</p>
      <div className={styles["c-default-button__icon"]}>{icon}</div>
    </button>
  );
};

export default DefaultButton;
