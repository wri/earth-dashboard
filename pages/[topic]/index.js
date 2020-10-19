import React from 'react';

// services
import { fetchTopicData } from 'services/data';

// components
import LayoutTopic from 'layout/app/topic';

function TopicPage({ topicData }) {
  return (<LayoutTopic opicData={topicData} />);
}

TopicPage.getInitialProps = async (context) => {
  const topicData = await fetchTopicData('/data/TopicPagesData.json');
  return { ...context, topicData };
};

export default TopicPage;
