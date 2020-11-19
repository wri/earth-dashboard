import React from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './ocean-current-box.module.scss';

function OceanCurrentBox({ title, style, direction }) {

    return (
        <div className={styles['c-ocean-current-box']} style={style}>
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles['current-container']}>
                <div className={styles.bottle}>
                    <img src="/static/images/scrolly-telling/ocean/bottle.svg" />
                </div>
                {direction === 'south' &&
                    <img
                        className={styles['south-arrow']}
                        src="/static/images/scrolly-telling/ocean/arrow-south-anticlockwise.svg"
                    />
                }
                {direction === 'north' &&
                    <img
                        className={styles['north-arrow']}
                        src="/static/images/scrolly-telling/ocean/arrow-north-clockwise.svg"
                    />
                }
            </div>
        </div>
    );
}

OceanCurrentBox.propTypes = { title: PropTypes.string.isRequired };

export default OceanCurrentBox;
