import React from 'react';

// components
import ShareBox from '../share-box';

// utils
import { getColorByTopic } from 'utils/topics';

// styles
import styles from './share-modal.module.scss';

function ShareModal({ topic }) {

    return (
        <div className={styles['c-share-modal']}>
            <h2 style={{ color: getColorByTopic(topic) }}>Share</h2>
            <h5>Public url to share</h5>
            <ShareBox url="to be defined..." topic={topic} />
        </div>
    );
}

export default ShareModal;