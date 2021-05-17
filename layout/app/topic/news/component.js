import React from 'react';
import PropTypes from 'prop-types';

// components
import TopicNewsMongabay from './mongabay';
import TopicNewsNowThisEarth from './now-this-earth';

// styles
import styles from './topic-news.module.scss';

// constants
import { MONGABAY_NEWS_TYPE, NOW_THIS_EARTH_NEWS_TYPE } from './constants';

function TopicNews(props) {
  const { topic, limit, type } = props;

  return (
    <div className={styles['c-topic-news']}>
      { type === MONGABAY_NEWS_TYPE && <TopicNewsMongabay limit={limit} topic={topic} />}
      { type === NOW_THIS_EARTH_NEWS_TYPE && <TopicNewsNowThisEarth limit={limit} topic={topic} />}
    </div>
  );
}

TopicNews.propTypes = {
  topic: PropTypes.array.isRequired,
  limit: PropTypes.number,
  type: PropTypes.string
};

TopicNews.defaultProps = { limit: 3, type: MONGABAY_NEWS_TYPE };

export default TopicNews;
