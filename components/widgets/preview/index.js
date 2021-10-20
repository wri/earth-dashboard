import { connect } from "react-redux";
import WidgetPreviewComponent from "./component";

export default connect(state => ({
  isMobile: state.common.isMobile
}))(WidgetPreviewComponent);
