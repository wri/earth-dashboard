import React from 'react';

// services
import { fetchTopicData } from 'services/data';

// components
import LayoutTopic from 'layout/app/topic';

function TopicPage({ topicData, widgets }) {
  return (<LayoutTopic topicData={topicData} widgets={widgets} />);
}

TopicPage.getInitialProps = async (context) => {
  const topic = context?.query?.topic;
  const topicData = await fetchTopicData('/data/TopicPagesData.json');

  // Preload widgets data
  const dataArray = topicData?.[topic]?.topicPage?.data;
  const widgetIDs = dataArray?.filter(elem => elem?.type === 'widget')?.map(elem => elem?.id);

  return { topicData, widgets: widgetIDs };
};

export default TopicPage;
