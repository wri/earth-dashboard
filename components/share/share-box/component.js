import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// utils
import {
    getEmailIconPerTopic,
    getTwitterIconPerTopic,
    getFacebookIconPerTopic,
    CLIMATE,
    FORESTS,
    FRESHWATER,
    OCEANS
} from 'utils/topics';

// styles
import styles from './share-box.module.scss';

function ShareBox({ url, topic }) {
    return (
        <div className={styles['c-share-box']}>
            <div className={styles.['url-container']}>
                <span>{url}</span>
            </div>
            <div className={styles['share-buttons']}>
                <div className={styles['share-button']}>
                    <img src={getEmailIconPerTopic(topic)} />
                </div>
                <div className={styles['share-button']}>
                    <img src={getFacebookIconPerTopic(topic)} />
                </div>
                <div className={styles['share-button']}>
                    <img src={getTwitterIconPerTopic(topic)} />
                </div>
            </div>
            <button
                className={classnames({
                    '-forests': topic === FORESTS,
                    '-oceans': topic === OCEANS,
                    '-climate': topic === CLIMATE,
                    '-freshwater': topic === FRESHWATER,
                    [styles['copy-link-button']]: true
                })}
            >
                Copy link
            </button>
        </div>
    );
}

ShareBox.propTypes = {
    url: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired
};

export default ShareBox;