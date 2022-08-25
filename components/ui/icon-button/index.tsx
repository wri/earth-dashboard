import React from "react";
import classnames from "classnames";
import Icon, { IconProps } from "../Icon";
import styles from "./icon-button.module.scss";

type IconButtonProps = {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
} & Pick<IconProps, "name" | "size">;

/** Styled icon button. */
const IconButton = ({ name, size, onClick, className = "", disabled, ...rest }: IconButtonProps) => {
  return (
    <button className={classnames(styles["c-icon-button"], className)} onClick={onClick} disabled={disabled} {...rest}>
      <Icon name={name} size={size} type="decorative" />
    </button>
  );
};

export default IconButton;
