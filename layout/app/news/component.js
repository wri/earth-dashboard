import useMongabayArticles from "hooks/useMongabayArticles";
import PropTypes from "prop-types";
import { getPageMetadataByTopic } from "utils/share";
import { getColorByTopic } from "utils/topics";
import Layout from "layout/layout/layout-app";
import HeroBanner from "./hero-banner";
import AnchorCTA from "components/ui/anchor-cta";
import Section from "./section";
import EarthHQCTA from "layout/app/news/earth-hq-cta";
import NewsArticle from "components/news-article";
import VideoArticle from "components/video-article";
import Footer from "layout/footer";
import { Desktop, MediaContextProvider } from "utils/responsive";
import { CLIMATE, FRESHWATER, OCEAN, FORESTS, BIODIVERSITY } from "utils/topics";
import newsArticleStyles from "components/news-article/news-article.module.scss";
import videoArticleStyles from "components/video-article/video-article.module.scss";
import heroBannerStyles from "layout/app/news/hero-banner/hero-banner.module.scss";
import { BANNER_BODY, VIDEOS } from "test/topic-articles";
import { BG_LIGHT_SPACE, BG_GALAXY } from "constants/section-colours";

const NewsTopicLayout = ({ topic }) => {
  const { loading, newsArticles, canFetchMore, isFetchingMore, fetchMore } = useMongabayArticles(topic);
  const pageMetadata = getPageMetadataByTopic(topic) || {};
  let mostRecentArticle,
    otherArticles;

  if (!loading) {
    otherArticles = [...newsArticles];
    mostRecentArticle = otherArticles.shift();
  }

  return (
    <Layout
      title={pageMetadata.title}
      description={pageMetadata.description}
      thumbnail={pageMetadata.thumbnail}
      themeColor={getColorByTopic(topic)}
    >
      <Section
        bgColour={BG_GALAXY}
        paddingBottom={false}
        gridClassName={heroBannerStyles["c-page-section-grid-hero-banner"]}
      >
        <HeroBanner title={topic + " News"} body={BANNER_BODY} />
      </Section>

      <Section title="Most Recent">
        {/* Most Recent */}
        {mostRecentArticle ? <NewsArticle featured={true} {...mostRecentArticle} /> : <div>Loading...</div>}
      </Section>

      <Section>{/* Full width Widget */}</Section>

      <Section
        title="Must Watch"
        bgColour={BG_LIGHT_SPACE}
        gridClassName={videoArticleStyles["c-page-section-grid-video-articles"]}
      >
        {/* Must Watch */}
        {VIDEOS?.map(({ key, ...videoProps }) => (
          <VideoArticle key={key} {...videoProps} />
        ))}
      </Section>

      <Section title="More News" gridClassName={newsArticleStyles["c-page-section-grid-news-articles"]}>
        {/* More News */}
        {otherArticles?.map(({ key, ...articleProps }) => (
          <NewsArticle key={key} {...articleProps} />
        ))}
        {canFetchMore && (
          <div className={newsArticleStyles["c-page-section-grid-news-articles__load-more"]}>
            <AnchorCTA
              className={newsArticleStyles["c-page-section-grid-news-articles__load-more__btn"]}
              onClick={fetchMore}
            >
              Load More {isFetchingMore && "Loading..."}
            </AnchorCTA>
          </div>
        )}
      </Section>

      <MediaContextProvider>
        <Desktop>
          <EarthHQCTA />
        </Desktop>
      </MediaContextProvider>

      <Section bgColour={BG_GALAXY} paddingBottom={false}>
        <Footer />
      </Section>
    </Layout>
  );
};

NewsTopicLayout.propTypes = {
  topic: PropTypes.oneOf([CLIMATE, FRESHWATER, OCEAN, FORESTS, BIODIVERSITY]).isRequired
};

NewsTopicLayout.defaultProps = {};

export default NewsTopicLayout;
