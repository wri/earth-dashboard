import { connect } from "react-redux";
import { setTippingPointOpen } from "slices/common";
import TippingPoint from "./component";

export default connect(() => {}, { setTippingPointOpen })(TippingPoint);
