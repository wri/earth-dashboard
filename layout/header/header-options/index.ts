import { connect } from "react-redux";
import { RootState } from "store/types";
import { setSettingsOpen, setSettingsClose } from "slices/mapControls";
import HeaderOptionsComponent from "./component";
import { setIsShareOpen, setIsNewsSearchOpen } from "slices/common";

export default connect(
  (state: RootState) => ({
    isSettingsOpen: state.mapControls.isSettingsOpen,
    isMobile: state.common.isMobile
  }),
  {
    setSettingsOpen,
    setSettingsClose,
    setIsShareOpen,
    setIsNewsSearchOpen
  }
)(HeaderOptionsComponent);
