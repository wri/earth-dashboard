import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// components
import Arrow from './arrow';

// constants
import {
    FILL_UP_ANIMATION,
    EMPTY_HALF_OUT_ANIMATION,
    BASELINE_WATER_STRESS_ANIMATION,
    WATER_STRESS_RISK_ANIMATION,
    WATER_STRESS_RISK_FINAL
} from './constants';

// utils
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';

// styles 
import styles from './water-drop.module.scss';

function WaterDrop(props) {
    const { mode } = props;
    let arrowDirection;
    switch (mode) {
        case FILL_UP_ANIMATION:
            arrowDirection = 'up';
            break;
        case EMPTY_HALF_OUT_ANIMATION:
            arrowDirection = 'down';
            break;
        case BASELINE_WATER_STRESS_ANIMATION:
            arrowDirection = 'up-and-down';
            break;
        case WATER_STRESS_RISK_ANIMATION:
            arrowDirection= 'up-and-down-low';
            break;
    }

    return (
        <div className={styles['c-water-drop']}>
            <MediaContextProvider>
                <Desktop>
                    <div className={classnames({
                        [styles.background]: true,
                        [styles['-desktop']]: true
                    })}>
                        <img src="/static/images/scrolly-telling/freshwater/isometric_terrain.svg" />
                    </div>
                    <div className={styles['water-drop']}>
                        <div className={styles.shape}>
                            <div className={styles.frame}>
                                <div className={classnames({
                                    [styles.wave]: true,
                                    [styles['-fill-up']]: mode === FILL_UP_ANIMATION,
                                    [styles['-empty-half-out']]: mode === EMPTY_HALF_OUT_ANIMATION,
                                    [styles['-baseline-water-stress']]: mode === BASELINE_WATER_STRESS_ANIMATION,
                                    [styles['-water-stress-risk']]: mode === WATER_STRESS_RISK_ANIMATION,
                                    [styles['-water-stress-risk-final']]: mode === WATER_STRESS_RISK_FINAL
                                })} />
                            </div>
                        </div>
                    </div>
                    {arrowDirection &&
                        <div className={styles['arrows-container']}>
                            <Arrow direction={arrowDirection} />
                        </div>
                    }
                </Desktop>
                <Mobile>

                </Mobile>
            </MediaContextProvider>
        </div>
    );
}

WaterDrop.propTypes = {
    mode: PropTypes.string
};

export default WaterDrop;