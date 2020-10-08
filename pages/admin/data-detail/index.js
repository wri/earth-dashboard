import React, { PureComponent } from 'react';

// components
import LayoutAdminDataDetail from 'layout/admin/data-detail';

// actions
import { setUser } from 'redactions/user';
import { setQuery } from 'redactions/routes';

class AdminDataDetailPage extends PureComponent {
  render() {
    return (<LayoutAdminDataDetail />);
  }
}

export default AdminDataDetailPage;

export async function getServerSideProps(context) {
  const { req, store, query } = context;

  if (req.user) {
    store.dispatch(setUser(user));
  }
  store.dispatch(setQuery(query));
}
