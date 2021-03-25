import React, { useState, useMemo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as THREE from 'three';

const OrbitControls = require('three-orbit-controls')(THREE);


import WindGL from 'utils/wind/WindGL';

// components
import Layout from 'layout/layout/layout-app';

// utils
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';

// styles
import styles from './canvas.module.scss';

let canvas, wind, canvasCoastline, ctx, renderer, scene, camera, texture;

function frame() {
  if (wind.windData) {
    wind.draw();
  }
  requestAnimationFrame(frame);
}

const windFiles = {
  0: '2016112000',
  6: '2016112006',
  12: '2016112012',
  18: '2016112018',
  24: '2016112100',
  30: '2016112106',
  36: '2016112112',
  42: '2016112118',
  48: '2016112200'
};

function getJSON(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('get', url, true);
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(xhr.response);
    } else {
      throw new Error(xhr.statusText);
    }
  };
  xhr.send();
}

function updateWind(name) {
  getJSON('/static/data/wind/' + windFiles[name] + '.json', (windData) => {
    const windImage = new Image();
    windData.image = windImage;
    windImage.src = '/static/data/wind/' + windFiles[name] + '.png';
    windImage.onload = () => {
      wind.setWind(windData);
    };
  });
}

function animate() {
  requestAnimationFrame(animate);
  texture.needsUpdate = true;
  renderer.render(scene, camera);
}

function LayoutHome({ openHeaderMenu, headerTabSelected, title, description }) {
  const isServer = typeof window === 'undefined';


  useEffect(() => {
    canvas = document.getElementById('canvas'); // eslint-disable-line
    const pxRatio = Math.max(Math.floor(window.devicePixelRatio) || 1, 2);
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const gl = canvas.getContext('webgl', { antialiasing: false });

    wind = window.wind = new WindGL(gl);
    wind.numParticles = 65536;

    getJSON('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_coastline.geojson', (data) => {
      canvasCoastline = document.getElementById('coastline');
      canvasCoastline.width = canvasCoastline.clientWidth * pxRatio;
      canvasCoastline.height = canvasCoastline.clientHeight * pxRatio;

      ctx = canvasCoastline.getContext('2d');
      ctx.lineWidth = pxRatio;
      ctx.lineJoin = ctx.lineCap = 'round';
      ctx.strokeStyle = 'white';
      ctx.beginPath();

      for (let i = 0; i < data.features.length; i++) {
        const line = data.features[i].geometry.coordinates;
        for (let j = 0; j < line.length; j++) {
          ctx[j ? 'lineTo' : 'moveTo'](
            (line[j][0] + 180) * canvasCoastline.width / 360,
            (-line[j][1] + 90) * canvasCoastline.height / 180);
        }
      }
      ctx.stroke();
    });

    // ------- THREE JS PART -----------
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('scene-container').appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 500;
    scene.add(camera);

    texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.01
    });
    const geometry = new THREE.SphereGeometry(300, 64, 64);
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Camera
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 2, 0);
    controls.update();

    updateWind(0);
    frame();
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
            <div id="scene-container" className={styles['three-world']} />
            <canvas id="canvas" className={styles.canvas} />
            <canvas id="coastline" className={styles['canvas-coastline']} />
          </div>
        }
      </div>);
  };

  return (
    <Layout
      title={title}
      description={description}
      thumbnail="https://raw.githubusercontent.com/wri/earth-dashboard/main/public/static/images/share/thumbnails/homepage.jpg"
      className={styles.canvas}
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

LayoutHome.propTypes = {
  openHeaderMenu: PropTypes.bool,
  headerTabSelected: PropTypes.string
};

LayoutHome.defaultProps = {
  openHeaderMenu: false,
  headerTabSelected: 'site-navigation'
};

export default LayoutHome;
