import { connect } from "react-redux";
import { setPageTypeId } from "slices/modes";
import { RootState } from "store/types";
import ViewAllCardComponent from "./component";

export default connect(_ => ({}), {
  setPageTypeId
})(ViewAllCardComponent);
