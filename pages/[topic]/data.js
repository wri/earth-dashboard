import React from 'react';

// services
import { fetchTopicData } from 'services/data';

// components
import LayoutTopicData from 'layout/app/topic/data';

function TopicDataPage({ topicData, widgets }) {
  return (<LayoutTopicData 
    topicData={topicData} 
    widgets={widgets} 
  />);
}

TopicDataPage.getInitialProps = async () => {
  const topicData = await fetchTopicData('/data/TopicPagesData.json');
  return { topicData };
};

export default TopicDataPage;
