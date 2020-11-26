import React from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './pulsating-item.module.scss';


function PulsatingItem({}) {

    return (
        <div className={styles['c-pulsating-item']}>
            <div className={styles['pulsating-container']} />
            
        </div>
    );
}

PulsatingItem.propTypes = {

};

PulsatingItem.defaultProps = {

};

export default PulsatingItem;