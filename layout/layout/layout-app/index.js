import { connect } from "react-redux";

// actions
import { toggleModal, setModalOptions } from "redactions/modal";
import { toggleTooltip } from "redactions/tooltip";
import { updateIsLoading } from "redactions/page";
import { setSettingsOpen, setIsCookieOpen } from "slices/mapControls";

// component
import LayoutApp from "./component";

export default connect(
  state => ({
    modal: state.modal,
    user: state.user,
    isFullScreen: true
  }),
  {
    toggleModal,
    setModalOptions,
    toggleTooltip,
    updateIsLoading,
    setSettingsOpen,
    setIsCookieOpen
  }
)(LayoutApp);
