import { Fragment } from "react";
import PropTypes from "prop-types";
import DefaultErrorPage from "next/error";
import Head from "next/head";

// services
import { fetchTopicData } from "services/data";

// components
import NewsTopicLayout from "layout/app/news";
import { Mobile, Desktop, MediaContextProvider } from "utils/responsive";

import { CLIMATE, OCEAN, FRESHWATER, FORESTS, BIODIVERSITY } from "utils/topics";

function TopicPage({ topic, topicData, widgets, topicNotFound }) {
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
    <MediaContextProvider>
      <Desktop>
        <NewsTopicLayout topic={topic} isMobile={false} />
      </Desktop>
      <Mobile>
        <NewsTopicLayout topic={topic} isMobile={true} />
      </Mobile>
    </MediaContextProvider>
  );

  // Legacy
  //   \/
  //return <LayoutTopic topicData={topicData} widgets={widgets} />;
}

TopicPage.getInitialProps = async context => {
  const topic = context?.query?.topic;
  let topicNotFound = false;

  if (![CLIMATE, OCEAN, FRESHWATER, FORESTS, BIODIVERSITY].includes(topic)) {
    topicNotFound = true;
  }
  const topicData = await fetchTopicData("/data/TopicPagesData.json");

  // Preload widgets data
  const dataArray = topicData?.[topic]?.topicPage?.data;
  const widgetIDs = dataArray?.filter(elem => elem?.type === "widget")?.map(elem => elem?.id);

  return { topic, topicData, widgets: widgetIDs, topicNotFound };
};

TopicPage.propTypes = {
  topicData: PropTypes.object.isRequired,
  widgets: PropTypes.array.isRequired
};

export default TopicPage;
