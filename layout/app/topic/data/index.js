import { connect } from "react-redux";
import TopicDataComponent from "./component";

export default connect(
  state => ({
    topic: state.routes.query.topic,
    embed: state.routes.query.embed,
    embeddedSection: state.routes.query.embeddedSection
  }),
  null
)(TopicDataComponent);
