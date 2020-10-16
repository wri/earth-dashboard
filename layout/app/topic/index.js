import { connect } from 'react-redux';
import TopicComponent from './component';

export default connect(
    state => ({
      topic: state.routes.query.topic
    }),
    null
  )(TopicComponent);