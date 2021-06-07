import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Parser from 'rss-parser';

// components
import Spinner from 'components/ui/spinner';

// utils
import { logEvent } from 'utils/gtag';
import { NOW_THIS_EARTH_RSS_URL } from 'utils/news';

// styles
import styles from './topic-news-now-this-earth.module.scss';

const parser = new Parser();

function TopicNewsNowThisEarth(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { topic, limit } = props;

  useEffect(() => {
    setLoading(true);
    parser.parseURL(NOW_THIS_EARTH_RSS_URL)
      .then((response) => {
        console.log('response', response);
      })
      .catch(err => console.error('error!', err));
  }, [topic, limit]);

  return (
    <div className={styles['c-topic-news-now-this-earth']}>
      <Spinner className="-light -relative" isLoading={loading} />
      {!loading && data.map(newsElem => (
        <div
          className={styles['news-item']}
          key={`news-item-${newsElem.title}`}
        >
          {/* <div className={styles['news-picture']}>
            <img src={newsElem.featuredImage.node.mediaItemUrl} alt="" />
          </div>
          <div className={styles['news-content']}>
            <h5>
              <a
                href={`${MONGABAY_NEWS_DOMAIN}${newsElem.uri}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => logEvent({
                  action: 'Click on Now This Earth article',
                  category: 'Outbound traffic',
                  label: `Article: ${newsElem.title}`
                })}
              >
                {newsElem.title}
              </a>
            </h5>
            <span className={styles['news-date']}>{newsElem.date} - Mongabay</span>
          </div> */}
        </div>
      ))}
    </div>
  );
}

TopicNewsNowThisEarth.propTypes = {
  topic: PropTypes.array.isRequired,
  limit: PropTypes.number
};

TopicNewsNowThisEarth.defaultProps = { limit: 3 };

export default TopicNewsNowThisEarth;
