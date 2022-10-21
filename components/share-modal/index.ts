import ShareModalComponent from "./component";
import { connect } from "react-redux";
import { RootState } from "store/types";
import { setIsShareOpen } from "slices/common";

export default connect(
  (state: RootState) => ({
    isMobile: state.common.isMobile,
    isShareOpen: state.common.isShareOpen,
    currentHeadline: state.headlines.currentHeadline,
    pageTypeId: state.modes.pageTypeId
  }),
  {
    setIsShareOpen
  }
)(ShareModalComponent);
