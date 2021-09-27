import React from "react";
import classnames from "classnames";
import Image from "next/image";
import PropTypes from "prop-types";

const IconButton = React.forwardRef(({ icon, className, ...rest }, ref) => {
  return (
    <button className={classnames("c-button c-button--icon", className)} ref={ref} {...rest}>
      <Image src={icon} role="presentation" alt="" />
    </button>
  );
});

IconButton.displayName = "IconButton";

IconButton.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  className: PropTypes.string
};

IconButton.defaultProps = {
  className: ""
};

export default IconButton;
