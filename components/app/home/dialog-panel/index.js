import { connect } from "react-redux";
import { NAME as dialogSliceName, setDialogHeight } from "slices/dialog";

import DialogPanelComponent from "./component";

export default connect(
  state => ({
    dialogHeight: state[dialogSliceName].dialogHeight,
    isCookieOpen: state.mapControls.isCookieOpen
  }),
  {
    setDialogHeight
  }
)(DialogPanelComponent);
