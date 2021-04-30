import React, { useState, useMemo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three-css3drenderer';

// components
import Layout from 'layout/layout/layout-app';

// utils
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';

// styles
import styles from './news-videos.module.scss';

const OrbitControls = require('three-orbit-controls')(THREE);

let renderer, scene, camera, controls;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

const getNowThisEarthVideo = (id, x, y, z, ry, autoplay = 0) => {
  const div = document.createElement('div');
  div.style.width = '480px';
  div.style.height = '360px';
  div.style.backgroundColor = '#000';

  const iframe = document.createElement('iframe');
  iframe.style.width = '480px';
  iframe.style.height = '360px';
  iframe.style.border = '0px';
  iframe.src = ['https://www.youtube.com/embed/', id, `?rel=0&amp;autoplay=${autoplay}&mute=1`].join('');
  div.appendChild(iframe);

  const object = new CSS3DObject(div);
  object.position.set(x, y, z);
  object.rotation.y = ry;

  return object;
};

function LayoutNewsVideos({ openHeaderMenu, headerTabSelected, title, description }) {
  const isServer = typeof window === 'undefined';

  useEffect(() => {
    const sceneContainer = document.getElementById('scene-container');
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.set(500, 350, 750);

    scene = new THREE.Scene();

    renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneContainer.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.add(getNowThisEarthVideo('82Xzp14SPzQ', 0, 0, 240, 0, 1));
    group.add(getNowThisEarthVideo('RZvlrbIqLXI', 240, 0, 0, Math.PI / 2, 1));
    group.add(getNowThisEarthVideo('1sdanjnhDXg', 0, 0, - 240, Math.PI, 1));
    group.add(getNowThisEarthVideo('L6Pr2oAnvuU', - 240, 0, 0, - Math.PI / 2, 1));
    scene.add(group);

    controls = new OrbitControls(camera, renderer.domElement);
    // controls.autoRotate = true;
    // controls.autoRotateSpeed = 1;

    // Block iframe events when dragging camera
    const blocker = document.getElementById('blocker');
    blocker.style.display = 'none';

    controls.addEventListener('start', () => {
      // blocker.style.display = '';
      controls.autoRotate = false;
    });
    controls.addEventListener('end', () => {
      blocker.style.display = 'none';
      controls.autoRotate = true;
    });

    animate();
  }, []);

  const getMainContainer = (mobile) => {
    return (
      <div
        id="main-container"
        className={classnames({
          [styles['main-container']]: true,
          [styles['-desktop']]: !mobile,
          [styles['-mobile']]: mobile
        })}
      >
        {!isServer &&
          <div>
            <div id="scene-container" />
            <div id="blocker" className={styles.blocker} />
          </div>
        }
      </div>);
  };

  return (
    <Layout
      title={title}
      description={description}
      thumbnail="https://raw.githubusercontent.com/wri/earth-dashboard/main/public/static/images/share/thumbnails/homepage.jpg"
      className={styles['news-videos']}
      openHeaderMenu={openHeaderMenu}
      headerTabSelected={headerTabSelected}
      themeColor="#1a2128"
    >
      <MediaContextProvider>
        <Desktop>
          {getMainContainer(false)}
        </Desktop>
        <Mobile>
          {getMainContainer(true)}
        </Mobile>
      </MediaContextProvider>
    </Layout >
  );
}

LayoutNewsVideos.propTypes = {
  openHeaderMenu: PropTypes.bool,
  headerTabSelected: PropTypes.string
};

LayoutNewsVideos.defaultProps = {
  openHeaderMenu: false,
  headerTabSelected: 'site-navigation'
};

export default LayoutNewsVideos;
