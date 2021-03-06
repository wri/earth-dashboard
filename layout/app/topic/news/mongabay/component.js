import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';

// components
import Spinner from 'components/ui/spinner';

// utils
import { logEvent } from 'utils/gtag';
import { GET_NEWS_BY_TOPIC_QUERY, MONGABAY_NEWS_DOMAIN } from 'utils/news';

// styles
import styles from './topic-news-mongabay.module.scss';

function TopicNews(props) {
  const { topic, limit } = props;
  
  const { loading, error, data, refetch } =
    useQuery(GET_NEWS_BY_TOPIC_QUERY(topic, limit), { variables: { topic } });

  useEffect(() => {
    refetch();
  }, [topic, limit]);

  return (
    <div className={styles['c-topic-news-mongabay']}>
      <Spinner className="-light -relative" isLoading={loading} />
      {!loading && !error && data.posts.nodes.map(newsElem => (
        <div
          className={styles['news-item']}
          key={`news-item-${newsElem.title}`}
        >
          <div className={styles['news-picture']}>
            <img src={newsElem.featuredImage.node.mediaItemUrl} alt="" />
          </div>
          <div className={styles['news-content']}>
            <h5>
              <a
                href={`${MONGABAY_NEWS_DOMAIN}${newsElem.uri}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => logEvent({
                  action: 'Click on Mongabay article',
                  category: 'Outbound traffic',
                  label: `Article: ${newsElem.title}`
                })}
              >
                {newsElem.title}
              </a>
            </h5>
            <span className={styles['news-date']}>{newsElem.date} - Mongabay</span>
          </div>
        </div>
      ))}
    </div>
  );
}

TopicNews.propTypes = {
  topic: PropTypes.array.isRequired,
  limit: PropTypes.number
};

TopicNews.defaultProps = { limit: 3 };

export default TopicNews;
