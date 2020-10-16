import { connect } from 'react-redux';
import TopicDataComponent from './component';

export default connect(
    state => ({
      topic: state.routes.query.topic
    }),
    null
  )(TopicDataComponent);