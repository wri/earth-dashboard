import PropTypes from "prop-types";
import { getPageMetadataByTopic } from "utils/share";
import { getColorByTopic } from "utils/topics";
import Layout from "layout/layout/layout-app";
import HeroBanner from "./hero-banner";
import Section from "./section";
import NewsArticle from "components/news-article";
import VideoArticle from "components/video-article";
import videoArticleStyles from "components/video-article/video-article.module.scss";

import TestImage from "public/static/images/star-background.png";

const BANNER_BODY_TEST =
  "Rising global temperatures pose a threat to every corner of the globe and most aspects of human life. By altering climatic conditions, we undermine food and water security, human and ocean health and the survival of countless species. These threats intensify with each half degree that temperatures climb.";

const NEWS_ARTICLES = [
  {
    title: "‘Everything is on fire’: Siberia hit by unprecedented burning",
    author: "Mongabay",
    date: new Date("28 August 2021"),
    image: TestImage,
    link: "www.google.com"
  },
  {
    title: "‘Everything is on fire’: Siberia hit by unprecedented burning",
    author: "Mongabay",
    date: new Date("28 August 2021"),
    image: TestImage,
    link: "www.google.com"
  },
  {
    title: "‘Everything is on fire’: Siberia hit by unprecedented burning",
    author: "Mongabay",
    date: new Date("28 August 2021"),
    image: TestImage,
    link: "www.google.com"
  },
  {
    title: "‘Everything is on fire’: Siberia hit by unprecedented burning",
    author: "Mongabay",
    date: new Date("28 August 2021"),
    image: TestImage,
    link: "www.google.com"
  },
  {
    title: "‘Everything is on fire’: Siberia hit by unprecedented burning",
    author: "Mongabay",
    date: new Date("28 August 2021"),
    image: TestImage,
    link: "www.google.com"
  },
  {
    title: "‘Everything is on fire’: Siberia hit by unprecedented burning",
    author: "Mongabay",
    date: new Date("28 August 2021"),
    image: TestImage,
    link: "www.google.com"
  },
  {
    title: "‘Everything is on fire’: Siberia hit by unprecedented burning",
    author: "Mongabay",
    date: new Date("28 August 2021"),
    image: TestImage,
    link: "www.google.com"
  }
];

const VIDEOS = [
  {
    title: "‘Everything is on fire’: Siberia hit by unprecedented burning",
    duration: "2:30",
    image: TestImage,
    videoURL: "https://www.youtube.com/watch?v=AXuNQjFJIOg"
  },
  {
    title: "‘Everything is on fire’: Siberia hit by unprecedented burning",
    duration: "2:30",
    image: TestImage,
    videoURL: "https://www.youtube.com/watch?v=AXuNQjFJIOg"
  },
  {
    title: "‘Everything is on fire’: Siberia hit by unprecedented burning",
    duration: "2:30",
    image: TestImage,
    videoURL: "https://www.youtube.com/watch?v=AXuNQjFJIOg"
  }
];

const NewsTopicLayout = ({ topic }) => {
  const pageMetadata = getPageMetadataByTopic(topic) || {};

  const mostRecentArticle = NEWS_ARTICLES.shift();

  return (
    <Layout
      title={pageMetadata.title}
      description={pageMetadata.description}
      thumbnail={pageMetadata.thumbnail}
      themeColor={getColorByTopic(topic)}
    >
      <Section bgColour="galaxy" pb={false}>
        <HeroBanner title={topic} body={BANNER_BODY_TEST} />
      </Section>

      <Section title="Most Recent">
        {/* Most Recent */}
        {mostRecentArticle && <NewsArticle featured={true} {...mostRecentArticle} />}
      </Section>

      <Section>{/* Full width Widget */}</Section>

      <Section title="Must Watch" bgColour="light-space" gridClassName={videoArticleStyles["c-page-section-grid-video-articles"]}>
        {/* Must Watch */}
        {VIDEOS?.map(video => (
          <VideoArticle key={video.videoURL} {...video} />
        ))}
      </Section>

      <Section title="More News">
        {/* More News */}
        {NEWS_ARTICLES?.map(article => (
          <NewsArticle key={article.date.getTime()} {...article} />
        ))}
      </Section>
    </Layout>
  );
};

NewsTopicLayout.propTypes = {
  topic: PropTypes.string.isRequired
};

NewsTopicLayout.defaultProps = {};

export default NewsTopicLayout;
