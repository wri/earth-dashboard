import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';

// services
import { fetchTopicData } from 'services/data';

// components
import LayoutTopicData from 'layout/app/topic/data';

import { CLIMATE, OCEAN, FRESHWATER, FORESTS } from 'utils/topics';

function TopicDataPage({ topicData, widgets, topicNotFound }) {
  // This includes setting the noindex header because static files always return 
  // a status 200 but the rendered not found page page should obviously not be indexed
  if (topicNotFound) {
    return (
      <Fragment>
        <Head>
           <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </Fragment>
    );
  }
  
  return (
    <LayoutTopicData
      topicData={topicData}
      widgets={widgets}
    />);
}

TopicDataPage.getInitialProps = async (context) => {
  const topic = context?.query?.topic;
  const topicData = await fetchTopicData('/data/TopicPagesData.json');
  let topicNotFound = false;

  if (![CLIMATE, OCEAN, FRESHWATER, FORESTS].includes(topic)) {
    topicNotFound = true;
  }

  return { topicData, topicNotFound };
};

TopicDataPage.propTypes = {
  topicData: PropTypes.object.isRequired,
  widgets: PropTypes.array.isRequired
};

export default TopicDataPage;
