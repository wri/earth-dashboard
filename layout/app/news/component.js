import PropTypes from "prop-types";
import { getPageMetadataByTopic } from "utils/share";
import { getColorByTopic } from "utils/topics";
import Layout from "layout/layout/layout-app";
import HeroBanner from "./hero-banner";
import Section from "./section";
import EarthHQCTA from "layout/app/news/earth-hq-cta";
import NewsArticle from "components/news-article";
import VideoArticle from "components/video-article";
import { Desktop, MediaContextProvider } from "utils/responsive";
import newsArticleStyles from "components/news-article/news-article.module.scss";
import videoArticleStyles from "components/video-article/video-article.module.scss";
import heroBannerStyles from "layout/app/news/hero-banner/hero-banner.module.scss";

import TestImage from "public/static/images/star-background.png";

const BANNER_BODY_TEST =
  "Rising global temperatures pose a threat to every corner of the globe and most aspects of human life. By altering climatic conditions, we undermine food and water security, human and ocean health and the survival of countless species. These threats intensify with each half degree that temperatures climb.";

const NEWS_ARTICLES = [
  {
    key: "1",
    title: "‘Everything is on fire’: Siberia hit by unprecedented burning",
    author: "Mongabay",
    date: new Date("28 August 2021"),
    image: TestImage,
    link: "www.google.com"
  },
  {
    key: "2",
    title: "‘Everything is on fire’: Siberia hit by unprecedented burning",
    author: "Mongabay",
    date: new Date("28 August 2021"),
    image: TestImage,
    link: "www.google.com"
  },
  {
    key: "3",
    title: "‘Everything is on fire’: Siberia hit by unprecedented burning",
    author: "Mongabay",
    date: new Date("28 August 2021"),
    image: TestImage,
    link: "www.google.com"
  },
  {
    key: "4",
    title: "‘Everything is on fire’: Siberia hit by unprecedented burning",
    author: "Mongabay",
    date: new Date("28 August 2021"),
    image: TestImage,
    link: "www.google.com"
  },
  {
    key: "5",
    title: "‘Everything is on fire’: Siberia hit by unprecedented burning",
    author: "Mongabay",
    date: new Date("28 August 2021"),
    image: TestImage,
    link: "www.google.com"
  },
  {
    key: "6",
    title: "‘Everything is on fire’: Siberia hit by unprecedented burning",
    author: "Mongabay",
    date: new Date("28 August 2021"),
    image: TestImage,
    link: "www.google.com"
  },
  {
    key: "7",
    title: "‘Everything is on fire’: Siberia hit by unprecedented burning",
    author: "Mongabay",
    date: new Date("28 August 2021"),
    image: TestImage,
    link: "www.google.com"
  }
];

const VIDEOS = [
  {
    key: "1",
    title: "‘Everything is on fire’: Siberia hit by unprecedented burning",
    duration: "2:30",
    image: TestImage,
    videoURL: "https://www.youtube.com/watch?v=AXuNQjFJIOg"
  },
  {
    key: "2",
    title: "‘Everything is on fire’: Siberia hit by unprecedented burning",
    duration: "2:30",
    image: TestImage,
    videoURL: "https://www.youtube.com/watch?v=AXuNQjFJIOg"
  },
  {
    key: "3",
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
      <Section bgColour="galaxy" pb={false} gridClassName={heroBannerStyles["c-page-section-grid-hero-banner"]}>
        <HeroBanner title={topic} body={BANNER_BODY_TEST} />
      </Section>

      <Section title="Most Recent">
        {/* Most Recent */}
        {mostRecentArticle && <NewsArticle featured={true} {...mostRecentArticle} />}
      </Section>

      <Section>{/* Full width Widget */}</Section>

      <Section
        title="Must Watch"
        bgColour="light-space"
        gridClassName={videoArticleStyles["c-page-section-grid-video-articles"]}
      >
        {/* Must Watch */}
        {VIDEOS?.map(({key, ...videoProps}) => (
          <VideoArticle key={key} {...videoProps} />
        ))}
      </Section>

      <Section title="More News" gridClassName={newsArticleStyles["c-page-section-grid-news-articles"]}>
        {/* More News */}
        {NEWS_ARTICLES?.map(({key, ...articleProps}) => (
          <NewsArticle key={key} {...articleProps} />
        ))}
      </Section>

      <MediaContextProvider>
        <Desktop>
          <EarthHQCTA />
        </Desktop>
      </MediaContextProvider>
    </Layout>
  );
};

NewsTopicLayout.propTypes = {
  topic: PropTypes.string.isRequired
};

NewsTopicLayout.defaultProps = {};

export default NewsTopicLayout;
