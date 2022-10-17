import { connect } from "react-redux";
import { pagePush, setRoutePageTypeId } from "slices/modes";
import ViewAllCardComponent from "./component";

export default connect(_ => ({}), {
  pagePush,
  setRoutePageTypeId
})(ViewAllCardComponent);
