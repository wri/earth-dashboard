import classnames from "classnames";
import styles from "./outline-button.module.scss";

type OutlineButtonProps = {
  text: string;
  className?: string;
  onClick: () => void;
};

/** Generic outline button. */
const OutlineButton = ({ text, className = "", ...rest }: OutlineButtonProps) => {
  return (
    <button className={classnames(styles["c-outline-button"], className)} {...rest}>
      {text}
    </button>
  );
};

export default OutlineButton;
