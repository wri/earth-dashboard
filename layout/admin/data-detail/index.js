import { connect } from 'react-redux';

// component
import LayoutAdminDataDetail from './component';

export default connect(
  state => ({
    user: state.user,
    locale: state.common.locale
  }),
  null
)(LayoutAdminDataDetail);
