import { connect } from "react-redux";
import Menu from "./component";
import { setTemplates, setCurrentTemplate } from "slices/templates";

export default connect(
  state => ({
    templates: state.templates.allTemplates,
    currentTemplate: state.templates.currentTemplate
  }),
  {
    setTemplates,
    setCurrentTemplate
  }
)(Menu);
