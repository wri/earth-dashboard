import { connect } from "react-redux";

// component
import LayoutAdminData from "./component";

export default connect(
  state => ({
    user: state.user,
    query: state.routes.query
  }),
  null
)(LayoutAdminData);
