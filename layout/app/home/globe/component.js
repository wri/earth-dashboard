import React from 'react';
import PropTypes from 'prop-types';
let ReactGlobe;
if (typeof window !== 'undefined') {
    ReactGlobe = require('react-globe').default;
}

// styles
import styles from './globe.module.scss';

function Globe({ width, height, style, options, onLoad, topic }) {
    const isServer = typeof window === 'undefined';

    const globeTexture = !!topic ? `/static/images/${topic}/world-map-dots-${topic}.svg` 
        : '/static/images/world-map-dots.svg';

    return (
        <div 
            className={styles['c-globe']}
            {...(!!style && { style })}
        >
            {!isServer &&
                <ReactGlobe
                    globeTexture={globeTexture}
                    globeBackgroundTexture={null}
                    globeCloudsTexture={null}
                    backgroundColor="#12171C"
                    key={`globe-${topic}`}
                    width={width}
                    height={height}
                    options={{
                        cameraAutoRotateSpeed: 0.5,
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
    onLoad: PropTypes.func,
    topic: PropTypes.string
};

Globe.defaultProps = {
    width: '100vw',
    height: '70vh',
    options: {}
};

export default Globe;
