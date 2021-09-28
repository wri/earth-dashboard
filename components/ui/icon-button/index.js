import React, { createElement } from "react";
import classnames from "classnames";
import Image from "next/image";
import PropTypes from "prop-types";

const IconButton = React.forwardRef(({ icon, className, el, ...rest }, ref) =>
  createElement(
    el,
    {
      className: classnames("c-button c-button--icon", className),
      ref: ref,
      ...rest
    },
    <Image src={icon} role="presentation" alt="" />
  )
);

IconButton.displayName = "IconButton";

IconButton.propTypes = {
  el: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  className: PropTypes.string
};

IconButton.defaultProps = {
  el: "button",
  className: ""
};

export default IconButton;
