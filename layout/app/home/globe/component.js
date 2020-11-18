import React from 'react';
import PropTypes from 'prop-types';
let ReactGlobe;
if (typeof window !== 'undefined') {
    ReactGlobe = require('react-globe').default;
}

// styles
import styles from './globe.module.scss';

function Globe({ width, height, style, options, onLoad }) {
    const isServer = typeof window === 'undefined';

    return (
        <div 
            className={styles['c-globe']}
            {...(!!style && { style })}
        >
            {!isServer &&
                <ReactGlobe
                    globeTexture="/static/images/world-map-dots.svg"
                    globeBackgroundTexture={null}
                    globeCloudsTexture={null}
                    backgroundColor="#12171C"
                    width={width}
                    height={height}
                    options={{
                        cameraAutoRotateSpeed: 1.3,
                        enableGlobeGlow: false,
                        ...options
                    }}
                    onGlobeTextureLoaded={() => onLoad()}
                />
            }
        </div>
    );
}

Globe.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    style: PropTypes.object,
    options: PropTypes.object,
    onLoad: PropTypes.func
};

Globe.defaultProps = {
    width: '100vw',
    height: '70vh',
    options: {}
};

export default Globe;
