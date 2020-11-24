import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// styles
import styles from './arrow.module.scss';

function Arrow({ direction }) {
    const firstGroup = ['up', 'down'];
    const secondGroup = [
        'up-and-down',
        'up-and-down-low',
        'up-and-down-low-final'];

    return (
        <div className={classnames({
            [styles['c-arrow']]: true,
            [styles['-overflow-shown']]: true
        })}>
            {firstGroup.includes(direction) &&
                <div className={classnames({
                    [styles['arrow-up']]: direction === 'up',
                    [styles['arrow-down']]: direction === 'down'
                })}>
                    <div className={styles['divider-container']}>
                        {direction === 'up' &&
                            <span className={styles['supplies-text']}>⭡ supplies</span>
                        }
                        <img className={styles['divider']} src="/static/images/scrolly-telling/freshwater/divider.svg" />
                        {direction === 'down' &&
                            <span className={styles['withdrawals-text']}>withdrawals ⭣</span>
                        }
                    </div>
                    <div className={styles['arrows-container']}>
                        <div className={styles['relative-container']}>
                            <img
                                className={classnames({
                                    [styles['first-arrow-up']]: direction === 'up',
                                    [styles['first-arrow-down']]: direction === 'down'
                                })}
                                src={`/static/images/scrolly-telling/freshwater/arrow_${direction === 'up' ? 'up' : 'down'}.svg`}
                            />
                            <img
                                className={classnames({
                                    [styles['second-arrow-up']]: direction === 'up',
                                    [styles['second-arrow-down']]: direction === 'down'
                                })}
                                src={`/static/images/scrolly-telling/freshwater/arrow_${direction === 'up' ? 'up' : 'down'}.svg`}
                            />
                        </div>
                    </div>
                </div>
            }
            {secondGroup.includes(direction) &&
                <div className={styles['arrow-up-and-down']}>
                    <div className={classnames({
                        [styles['container']]: true,
                        [styles['-low']]: direction === 'up-and-down-low',
                        [styles['-final']]: direction === 'up-and-down-low-final'
                    })}>
                        <img className={styles['arrow']} src="/static/images/scrolly-telling/freshwater/arrow_up_and_down.svg" />
                        <span className={styles['withdrawals-text']}>withdrawals</span>
                        <img className={styles['divider']} src="/static/images/scrolly-telling/freshwater/divider.svg" />
                        <span className={styles['supplies-text']}>supplies</span>
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