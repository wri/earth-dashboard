import React from 'react';
import PropTypes from 'prop-types';

// utils
import { logEvent } from 'utils/gtag';

// styles
import styles from './mongabay-news.module.scss';

function MongabayNews({ item, showThumbnail, showDescription }) {
    const {
        link,
        title,
        enclosure: { url: imageURL },
        contentSnippet: description,
        pubDate
    } = item;

    const logArticleClick = () => logEvent({
        action: 'Click on Mongabay article',
        category: 'Outbound traffic',
        label: `Article: ${title}`
    });

    return (
        <div className={styles['c-mongabay-news']}>
            {showThumbnail &&
                <div className={styles['image-container']}>
                    <a
                        href={link}
                        target="_blank"
                        onClick={logArticleClick}
                    >
                        <img src={imageURL} />
                    </a>
                </div>
            }
            <div className={styles['text-container']}>
                <a
                    href={link}
                    target="_blank"
                    onClick={logArticleClick}
                >
                    <h5>{title}</h5>
                </a>
                {showDescription &&
                    <p>{description}</p>
                }
                <span className={styles['news-date']}>{pubDate} - Mongabay</span>
            </div>
        </div>
    );
}

MongabayNews.propTypes = {
    item: PropTypes.object.isRequired,
    showThumbnail: PropTypes.bool,
    showDescription: PropTypes.bool
};

MongabayNews.defaultProps = {
    showDescription: false,
    showThumbnail: true
}

export default MongabayNews;