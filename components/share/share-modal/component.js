import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// components
import ShareBox from '../share-box';

// utils
import { getColorByTopic } from 'utils/topics';
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';

// styles
import styles from './share-modal.module.scss';

function ShareModal({ topic, onClose, url }) {

    const getContent = (mobile=false) =>
        <div className={classnames({
            [styles['main-container']]: true,
            [styles['-mobile']]: mobile,
            [styles['-desktop']]: !mobile
        })}>
            <h2 style={{ color: getColorByTopic(topic) }}>Share</h2>
            <h5>Public url to share</h5>
            <ShareBox url={url} topic={topic} />
            <button className={styles['close-button']} onClick={() => onClose()} />
        </div>;

    return (
        <div className={styles['c-share-modal']}>
            <MediaContextProvider>
                <Desktop>
                    {getContent(false)}
                </Desktop>
                <Mobile>
                    {getContent(true)}
                </Mobile>
            </MediaContextProvider>
        </div>
    );
}

ShareModal.propTypes = {
    topic: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ShareModal;