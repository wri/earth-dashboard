import { connect } from 'react-redux';

// component
import LayoutHome from './component';

export default connect(
  state => ({
    isServer: state.common.isServer,
  }),
  null
)(LayoutHome);
