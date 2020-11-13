import React from 'react';
import PropTypes from 'prop-types';

// components
import ShareBox from '../share-box';

// utils
import { getColorByTopic } from 'utils/topics';

// styles
import styles from './share-modal.module.scss';

function ShareModal({ topic, onClose }) {

    return (
        <div className={styles['c-share-modal']}>
            <h2 style={{ color: getColorByTopic(topic) }}>Share</h2>
            <h5>Public url to share</h5>
            <ShareBox url="to be defined..." topic={topic} />
            <button className={styles['close-button']} onClick={() => onClose()} />
        </div>
    );
}

ShareModal.propTypes = {
    topic: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ShareModal;