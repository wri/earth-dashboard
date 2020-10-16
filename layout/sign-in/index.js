// Redux
import { connect } from 'react-redux';

// actions
import { setUser } from 'slices/user';

// component
import SigIn from './component';

export default connect(
  null,
  { setUser }
)(SigIn);
