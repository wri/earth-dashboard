import React from 'react';
let ReactGlobe;
if (typeof window !== 'undefined') {
    ReactGlobe = require('react-globe').default;
}

// styles
import styles from './globe.module.scss';

function Globe() {
    const isServer = typeof window === 'undefined';

    return (
        <div className={styles['c-globe']}>
            {!isServer &&
                <ReactGlobe
                    globeTexture="/static/images/world-map-dots.jpg"
                    globeBackgroundTexture={null}
                    backgroundColor="#1A2129"
                    width="70vw"
                    height="70vh"
                    options={{
                        cameraAutoRotateSpeed: 1.5,
                        globeGlowRadiusScale: 0
                    }}
                />
            }
        </div>
    );
}

export default Globe;
