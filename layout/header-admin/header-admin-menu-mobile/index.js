import { connect } from 'react-redux';

// component
import AdminHeaderMenuMobile from './component';

export default connect(
  state => ({
    header: state.headerAdmin,
    routes: state.routes
  })
)(AdminHeaderMenuMobile);
