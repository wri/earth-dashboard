import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

// utils
import { MediaContextProvider, Mobile, Desktop } from 'utils/responsive';

// styles
import styles from './water-drop-locations.module.scss';

function WaterDropLocations() {

    const getMap = (mode) =>
        <img className={classnames({
                [styles['worldmap-image']]: true,
                [styles['-desktop']]: mode === 'desktop',
                [styles['-mobile']]: mode === 'mobile'
            })} 
            src="/static/images/scrolly-telling/freshwater/worldmap.svg" 
        />;
    return (
        <div className={styles['c-water-drop-locations']}>
            <MediaContextProvider>
                <Desktop className={classnames({
                    [styles['main-container']]: true,
                    [styles['-desktop']]: true
                })}>
                    {getMap('desktop')}
                </Desktop>
                <Mobile className={classnames({
                    [styles['main-container']]: true,
                    [styles['-mobile']]: true
                })}>
                    {getMap('mobile')}
                </Mobile>
            </MediaContextProvider>
        </div>
    );
}

WaterDropLocations.propTypes = { index: PropTypes.number.isRequired };

export default WaterDropLocations;