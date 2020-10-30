import React from 'react';
import Particles from 'react-particles-js';

// components
import Layout from 'layout/layout/layout-app';
import Login from 'components/login';

// utils
import { PARTICLES_DEFINITION } from 'utils/particles';

// styles
import styles from './sign-in.module.scss';

function SigIn() {
  return (
    <Layout
      className={styles['sign-in']}
      title="Resource Watch Sign-in/Register"
      description="Resource Watch Sign-in/Register"
    >
      <Particles
        className={styles.particles}
        params={PARTICLES_DEFINITION}
      />
      <div className="l-container">
        <div className="content">
          <Login />
        </div>
      </div>
    </Layout>
  );
}

export default SigIn;
