import { connect } from "react-redux";
import TopicComponent from "./component";

export default connect(
  state => ({
    topic: state.routes.query.topic,
    embed: state.routes.query.embed
  }),
  null
)(TopicComponent);
