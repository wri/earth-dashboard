import classnames from "classnames";
import Icon, { IconProps } from "../Icon";
import styles from "./icon-button.module.scss";

type IconButtonProps = {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
} & IconProps;

/** Styled icon button. */
const IconButton = ({ onClick, className = "", disabled, ...rest }: IconButtonProps) => {
  return (
    <button className={classnames(styles["c-icon-button"], className)} onClick={onClick} disabled={disabled}>
      <Icon {...rest} />
    </button>
  );
};

export default IconButton;
