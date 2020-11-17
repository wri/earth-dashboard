import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// constants
import {
    FILL_UP_ANIMATION,
    EMPTY_OUT_ANIMATION
} from './constants';

// styles 
import styles from './water-drop.module.scss';

function WaterDrop(props) {
    const { mode } = props;
    return (
        <div className={styles['c-water-drop']}>
            <div className={styles.shape}>
                <div className={styles.frame}>
                    <div className={classnames({
                        [styles.wave]: true,
                        [styles['-fill-up']]: mode === FILL_UP_ANIMATION,
                        [styles['-empty-out']]: mode === EMPTY_OUT_ANIMATION
                    })} />
                </div>
            </div>
        </div>
    );
}

WaterDrop.propTypes = {
    mode: PropTypes.string
};

export default WaterDrop;