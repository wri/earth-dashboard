// component
import LayoutHome from "./component";
import LayoutHomeLegacy from "./component-legacy";
import PropTypes from "prop-types";

const Layout = ({ isLegacy, ...rest }) => {
  return isLegacy ? <LayoutHomeLegacy {...rest} /> : <LayoutHome {...rest} />;
};

Layout.propTypes = {
  isLegacy: PropTypes.bool
};

Layout.defaultProps = {
  isLegacy: false
};

export default Layout;
