import { connect } from "react-redux";
import { RootState } from "store/types";
import EarthHQCTAComponent from "./component";

export default connect((state: RootState) => ({
  isMobile: state.common.isMobile
}))(EarthHQCTAComponent);
