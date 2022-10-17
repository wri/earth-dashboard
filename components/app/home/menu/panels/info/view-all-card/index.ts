import { connect } from "react-redux";
import { setPageTypeId } from "slices/modes";
import ViewAllCardComponent from "./component";

export default connect(_ => ({}), {
  setPageTypeId
})(ViewAllCardComponent);
