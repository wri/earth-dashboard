import React from 'react';

// services
import { fetchTopicData } from 'services/data';
import { fetchWidget } from 'services/widget';

// components
import LayoutTopic from 'layout/app/topic';

function TopicPage({ topicData, widgets }) {
  return (<LayoutTopic topicData={topicData} widgets={widgets} />);
}

TopicPage.getInitialProps = async (context) => {
  const topic = context.query.topic;
  const topicData = await fetchTopicData('/data/TopicPagesData.json');

  // Preload widgets data
  const dataArray = topicData?.[topic]?.topicPage?.data;
  const widgetIDs = dataArray?.filter(elem => elem.type === 'widget').map(elem => elem.id);
  const widgets = [];
  for (let i=0; i < widgetIDs.length; i++) {
    const widget = await fetchWidget(widgetIDs[i]);
    widgets.push(widget);
  }

  return { topicData, widgets };
};

export default TopicPage;
