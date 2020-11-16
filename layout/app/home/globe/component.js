import React from 'react';
import PropTypes from 'prop-types';
let ReactGlobe;
if (typeof window !== 'undefined') {
    ReactGlobe = require('react-globe').default;
}

// styles
import styles from './globe.module.scss';

function Globe({ width, height }) {
    const isServer = typeof window === 'undefined';

    return (
        <div className={styles['c-globe']}>
            {!isServer &&
                <ReactGlobe
                    globeTexture="/static/images/world-map-dots.jpg"
                    globeBackgroundTexture={null}
                    globeCloudsTexture={null}
                    backgroundColor="#1A2129"
                    width={width}
                    height={height}
                    options={{
                        cameraAutoRotateSpeed: 1.5,
                        globeGlowCoefficient: 0
                    }}
                />
            }
        </div>
    );
}

Globe.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};

Globe.defaultProps = {
    width: '100vw',
    height: '70vh'
};

export default Globe;
