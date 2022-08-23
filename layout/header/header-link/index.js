import classnames from "classnames";
import PropTypes from "prop-types";

const HeaderLink = ({ className, ...rest }) => {
  return (
    <a className={classnames(className)} {...rest}>
      Text
    </a>
  );
};

HeaderLink.propTypes = {
  className: PropTypes.string
};

HeaderLink.defaultProps = {
  className: ""
};

export default HeaderLink;
