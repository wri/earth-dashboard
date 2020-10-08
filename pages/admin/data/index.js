import React, { PureComponent } from 'react';

// components
import LayoutAdminData from 'layout/admin/data';

// actions
import { setUser } from 'redactions/user';
import { setQuery } from 'redactions/routes';

class AdminPage extends PureComponent {
  render() {
    return (<LayoutAdminData />);
  }
}

export default AdminPage;


export async function getServerSideProps(context) {
  const { req, store, query } = context;
  console.log('context', context);

  if (req.user) {
    store.dispatch(setUser(user));
  }
  store.dispatch(setQuery(query));
}
