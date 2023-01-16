import { connect } from "react-redux";
import { RootState } from "store/types";
import SearchDialog from "./component";
import { setIsNewsSearchOpen } from "slices/common";

export default connect(
  (state: RootState) => ({
    isOpen: state.common.isNewsSearchOpen,
    isMobile: state.common.isMobile
  }),
  {
    setIsNewsSearchOpen
  }
)(SearchDialog);
