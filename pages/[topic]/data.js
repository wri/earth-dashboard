import React from 'react';

// services
import { fetchTopicData } from 'services/data';
import { fetchWidget } from 'services/widget';

// components
import LayoutTopicData from 'layout/app/topic/data';

function TopicDataPage() {
  return (<LayoutTopicData topicData={topicData} widgets={widgets} />);
}

TopicDataPage.getInitialProps = async (context) => {
  const topic = context.query.topic;
  const topicData = await fetchTopicData('/data/TopicPagesData.json');

  // Preload widgets data
  const dataArray = topicData?.[topic]?.diveIntoTheData?.data;
  const widgetIDs = dataArray?.map(elem => elem.id);
  const widgets = [];
  for (let i = 0; i < widgetIDs.length; i++) {
    const widget = await fetchWidget(widgetIDs[i]);
    widgets.push(widget);
  }

  return { topicData, widgets };
};

export default TopicDataPage;
