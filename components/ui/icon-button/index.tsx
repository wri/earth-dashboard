import React from "react";
import classnames from "classnames";
import Icon, { IconProps } from "../Icon";
import styles from "./icon-button.module.scss";

type IconButtonProps = {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  small?: boolean;
  medium?: boolean;
  iconStyle?: Object;
  iconClassName?: string;
} & Pick<IconProps, "name" | "size">;

/** Styled icon button. */
const IconButton = ({
  name,
  size,
  onClick,
  className = "",
  small,
  medium,
  disabled,
  iconStyle,
  iconClassName,
  ...rest
}: IconButtonProps) => {
  return (
    <button
      className={classnames(
        styles["c-icon-button"],
        { [styles["small"]]: small, [styles["medium"]]: medium },
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <Icon name={name} size={size} className={iconClassName} style={iconStyle} type="decorative" />
    </button>
  );
};

export default IconButton;
