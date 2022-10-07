import React, { forwardRef } from "react";
import classnames from "classnames";
import Icon, { IconProps } from "../Icon";
import styles from "./icon-button.module.scss";

type IconButtonProps = {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  extraSmall?: boolean;
  small?: boolean;
  medium?: boolean;
  iconStyle?: Object;
  iconClassName?: string;
} & Pick<IconProps, "name" | "size">;

/** Styled icon button. */
const IconButton = forwardRef(
  (
    {
      name,
      size,
      onClick,
      className = "",
      extraSmall,
      small,
      medium,
      disabled,
      iconStyle,
      iconClassName,
      ...rest
    }: IconButtonProps,
    ref
  ) => {
    return (
      <button
        //@ts-expect-error
        ref={ref}
        className={classnames(
          styles["c-icon-button"],
          { [styles["extra-small"]]: extraSmall, [styles["small"]]: small, [styles["medium"]]: medium },
          className
        )}
        onClick={onClick}
        disabled={disabled}
        {...rest}
      >
        <Icon name={name} size={size} className={iconClassName} style={iconStyle} type="decorative" />
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
