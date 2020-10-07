import React, { PureComponent } from 'react';

// components
import LayoutAdminData from 'layout/admin/data';

class AdminPage extends PureComponent {
  render() {
    return (<LayoutAdminData {...this.props} />);
  }
}

export default AdminPage;

export async function getServerSideProps(context) {
  return {
    props: {
      query: context.query
    }
  }
}
