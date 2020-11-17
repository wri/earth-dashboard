import React from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './mongabay-news.module.scss';

function MongabayNews({ item, showThumbnail, showDescription }) {
    const { link, title, enclosure: { url: imageURL }, contentSnippet: description } = item;

    return (
        <div className={styles['c-mongabay-news']}>
            {showThumbnail &&
                <div className={styles['image-container']}>
                    <img src={imageURL} />
                </div>
            }
            <div className={styles['text-container']}>
                <h3>
                    <a href={link} target="_blank">
                        {title}
                    </a>
                </h3>
                {showDescription &&
                    <p>{description}</p>
                }
            </div>
        </div>
    );
}

MongabayNews.propTypes = {
    item: PropTypes.object.isRequired,
    showThumbnail: PropTypes.bool,
    showDescription: PropTypes.bool
};

MongabayNews.propTypes = {
    showDescription: true,
    showThumbnail: true
}

export default MongabayNews;