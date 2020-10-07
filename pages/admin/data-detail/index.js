import React, { PureComponent } from 'react';

// components
import LayoutAdminDataDetail from 'layout/admin/data-detail';

class AdminDataDetailPage extends PureComponent {
  render() {
    console.log('context this.props', this.props);
    return (<LayoutAdminDataDetail {...this.props} />);
  }
}

export default AdminDataDetailPage;

export async function getServerSideProps(context) {
  return {
    props: {
      query: context.query
    }
  }
}
