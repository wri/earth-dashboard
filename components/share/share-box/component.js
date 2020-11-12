import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
    const isServer = typeof window === 'undefined';

    return (
        <div className={styles['c-share-box']}>
            <div className={styles.['url-container']}>
                <input
                    type="text"
                    value={url}
                    disabled
                />
            </div>
            <div className={styles['share-buttons']}>
                <a href={`mailto:?subject=Shared from Earth Dashboard&body= I thought you'd be interested in what I found on Earth Dashboard: ${url}`}>
                    <div className={styles['share-button']}>
                        <img src={getEmailIconPerTopic(topic)} />
                    </div>
                </a>
                <a href={`http://www.facebook.com/sharer/sharer.php?u=${url}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    <div className={styles['share-button']}>
                        <img src={getFacebookIconPerTopic(topic)} />
                    </div>
                </a>
                <a href={`https://twitter.com/share?url=${url}&text=${encodeURIComponent(
                    isServer ? '' : document.title
                )}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    <div className={styles['share-button']}>
                        <img src={getTwitterIconPerTopic(topic)} />
                    </div>
                </a>
            </div>
            <CopyToClipboard text={url}>
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
            </CopyToClipboard>
        </div>
    );
}

ShareBox.propTypes = {
    url: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired
};

export default ShareBox;