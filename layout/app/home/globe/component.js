import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
let ReactGlobe;
if (typeof window !== 'undefined') {
    ReactGlobe = require('react-globe').default;
}

// styles
import styles from './globe.module.scss';

function Globe({ width, height, style, options, onLoad, topic, hideUntilLoaded }) {
    const isServer = typeof window === 'undefined';
    const [hidden, setHidden] = useState(hideUntilLoaded);
    const [loaded, setLoaded] = useState(false);

    const globeTexture = !!topic ? `/static/images/${topic}/world-map-dots-${topic}.svg` 
        : '/static/images/world-map-dots.svg';

    useEffect(() => {
        setHidden(hideUntilLoaded);
    }, [hideUntilLoaded]);

    useEffect(() => {
        setHidden(true);
        setLoaded(false);
    }, [topic]);

    return (
        <div 
            className={classnames({
                [styles['c-globe']]: true,
                [styles['-hidden']]: hidden,
                [styles['-fade-in']]: !hidden && loaded
            })}
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
                    onGlobeTextureLoaded={() => {
                        setHidden(false);
                        setLoaded(true);
                        onLoad();
                    }}
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
    topic: PropTypes.string,
    hideUntilLoaded: PropTypes.bool
};

Globe.defaultProps = {
    width: '100vw',
    height: '70vh',
    options: {},
    hideUntilLoaded: false
};

export default Globe;
