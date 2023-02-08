import { connect } from "react-redux";
import { RootState } from "store/types";
import TippingPointModal from "./component";
import { setTippingPointOpen } from "slices/common";

export default connect(
  (state: RootState) => ({
    isTippingPointOpen: state.common.isTippingPointOpen
  }),
  {
    setTippingPointOpen
  }
)(TippingPointModal);
