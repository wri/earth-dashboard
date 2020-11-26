import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// styles
import styles from './pulsating-item.module.scss';


function PulsatingItem({ level }) {

    return (
        <div className={styles['c-pulsating-item']}>
            <div className={classnames({
                [styles['pulsating-container']]: true,
                [styles[`-level-${level}`]]: true
            })} />
            <div className={classnames({
                [styles.dot]: true,
                [styles[`-level-${level}`]]: true
            })} />
        </div>
    );
}

PulsatingItem.propTypes = {
    color: PropTypes.string.isRequired
};

PulsatingItem.defaultProps = {

};

export default PulsatingItem;