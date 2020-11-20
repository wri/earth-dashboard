import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// styles
import styles from './arrow.module.scss';

function Arrow({ direction }) {
    const overflowShown = direction === 'up-and-down';

    return (
        <div className={classnames({
            [styles['c-arrow']]: true,
            [styles['-overflow-shown']]: overflowShown
        })}>
            {direction === 'up' &&
                <div className={styles['arrow-up']}>
                    <img className={styles['first-arrow-up']} src="/static/images/scrolly-telling/freshwater/arrow_up.svg" />
                    <img className={styles['second-arrow-up']} src="/static/images/scrolly-telling/freshwater/arrow_up.svg" />
                </div>
            }
            {direction === 'down' &&
                <div className={styles['arrow-down']}>
                    <img className={styles['first-arrow-down']} src="/static/images/scrolly-telling/freshwater/arrow_down.svg" />
                    <img className={styles['second-arrow-down']} src="/static/images/scrolly-telling/freshwater/arrow_down.svg" />
                </div>
            }
            {direction === 'up-and-down' &&
                <div className={styles['arrow-up-and-down']}>
                    <div className={styles['container']}>
                        <img className={styles['arrow']} src="/static/images/scrolly-telling/freshwater/arrow_up_and_down.svg" />
                        <img className={styles['divider']} src="/static/images/scrolly-telling/freshwater/divider.svg" />
                    </div>
                </div>
            }
        </div>
    );
}

Arrow.propTypes = {
    direction: PropTypes.string.isRequired
}

export default Arrow;