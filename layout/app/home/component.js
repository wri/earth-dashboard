import React from 'react';
import Particles from 'react-particles-js';
import Link from 'next/link';

// components
import Layout from 'layout/layout/layout-app';

// styles
import styles from './homepage.module.scss';

// utils
import { PARTICLES_DEFINITION } from 'utils/particles';

function LayoutHome() {

  return (
    <Layout
      title="Earth Dashboard"
      description="Earth Dashboard"
      className={styles.homepage}
    >
      <Particles 
        className={styles.particles}
        params={PARTICLES_DEFINITION}
      />

      <div className={styles['main-container']}>
        <h1>This is not a drill.</h1>
        <h1>This is now a <span className={styles['highlighted-text']}>planetary emergency</span>.</h1>
        <h5>Earth HQ provides insight and inspiration to help everyone understand and protect our home planet.</h5>
        <div className={styles['topic-links']}>
          <Link href="/climate">
            <a className={styles['climate-link']}>
              CLIMATE
            </a>
          </Link>
          <Link href="/forests">
            <a className={styles['forests-link']}>
              FORESTS
            </a>
          </Link>
          <Link href="/freshwater">
            <a className={styles['freshwater-link']}>
              FRESHWATER
            </a>
          </Link>
          <Link href="/oceans">
            <a className={styles['oceans-link']}>
              OCEANS
            </a>
          </Link>
        </div>
      </div>

    </Layout>
  );
}

export default LayoutHome;
