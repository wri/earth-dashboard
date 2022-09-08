import ShareModalComponent from "./component";
import { connect } from "react-redux";
import { RootState } from "store/types";
import { setIsShareOpen } from "slices/common";

export default connect(
  (state: RootState) => ({
    isMobile: state.common.isMobile,
    currentHeadline: state.headlines.currentHeadline
  }),
  {
    setIsShareOpen
  }
)(ShareModalComponent);
