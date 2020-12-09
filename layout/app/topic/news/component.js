import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Parser from 'rss-parser';

// components
import Spinner from 'components/ui/spinner';

// utils
import { logEvent } from 'utils/gtag';

// constants
import { 
    CORS_PROXY,
    MONGABAY_RSS_FEED_URL
} from './constants';
import { getMongabayTagsByTopic } from 'utils/topics';

// styles
import styles from './topic-news.module.scss';

function TopicNews(props) {
    const { topic, limit } = props;
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState([]);

    useEffect(() => {
        setLoading(true);
        const urlWithProxy = 
            `${CORS_PROXY}${MONGABAY_RSS_FEED_URL}${getMongabayTagsByTopic(topic)}`;
        const parser = new Parser();
        parser.parseURL(urlWithProxy)
            .then((response) => {
                setNews(response.items.slice(0,limit));
                setLoading(false);
            })
            .catch((error) => {
                console.error(`There was an error loading the news ${urlWithProxy}: ${error}`);
                setLoading(false);
            });
    }, [topic]);

    return (
        <div className={styles['c-topic-news']}>
            <Spinner className="-light -relative" isLoading={loading} />
            {news.map((newsElem) => (
                <div
                    className={styles['news-item']}
                    key={`news-item-${newsElem.title}`}
                >
                    <div className={styles['news-picture']}>
                        <img src={newsElem.enclosure.url} />
                    </div>
                    <div className={styles['news-content']}>
                        <h5>
                            <a
                                href={newsElem.link}
                                target="_blank"
                                onClick={() => logEvent({
                                    action: 'click',
                                    category: 'Outbound traffic - Mongabay',
                                    label: `Article: ${newsElem.title}`
                                })}
                            >
                                {newsElem.title}
                            </a>
                        </h5>
                        <span className={styles['news-date']}>{newsElem.pubDate} - Mongabay</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

TopicNews.propTypes = {
    topic: PropTypes.string.isRequired,
    limit: PropTypes.number
};

TopicNews.defaultProps = {
    limit: 3
};

export default TopicNews;