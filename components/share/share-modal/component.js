import React from 'react';

// components
import ShareBox from '../share-box';

// styles
import styles from './share-modal.module.scss';

function ShareModal({ topic }) {

    return (
        <div className={styles['c-share-modal']}>
            <ShareBox topic={topic} />
        </div>
    );
}

export default ShareModal;