import { connect } from "react-redux";
import { setIsCookieOpen, isGlobe2d, setSettingsClose } from "slices/mapControls";
import { RootState } from "store/types";
import FooterComponent from "./component";

export default connect(
  (state: RootState) => ({
    isCookieOpen: state.mapControls.isCookieOpen
  }),
  {
    setIsCookieOpen,
    setSettingsClose
  }
)(FooterComponent);
