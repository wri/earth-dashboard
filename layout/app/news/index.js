import NewsTopicLayoutComponent from "./component";
import { connect } from "react-redux";
import { setIsMobile } from "slices/common";

export default connect(state => ({}), {
  setIsMobile
})(NewsTopicLayoutComponent);
