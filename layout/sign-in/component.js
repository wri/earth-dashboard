import React, { PureComponent } from 'react';

// components
import Layout from 'layout/layout/layout-app';
import Login from 'components/login';

// styles
import styles from './sign-in.module.scss';

class SigIn extends PureComponent {
  render() {
    return (
      <Layout
        className={styles['sign-in']}
        title="Resource Watch Sign-in/Register"
        description="Resource Watch Sign-in/Register"
      >
        <div className="l-container">
          <div className="content">
            <Login />
          </div>
        </div>
      </Layout>
    );
  }
}

export default SigIn;
