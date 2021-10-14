import useMongabayPosts from "hooks/useMongabayPosts";
import useGCAWidgets from "hooks/useGCAWidgets";
import useNowThisVideos from "hooks/useNowThisVideos";
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
import Widget from "layout/app/news/widget";
import Footer from "layout/footer";
import { Desktop, MediaContextProvider } from "utils/responsive";
import { CLIMATE, FRESHWATER, OCEAN, FORESTS, BIODIVERSITY } from "utils/topics";
import newsArticleStyles from "components/news-article/news-article.module.scss";
import videoArticleStyles from "components/video-article/video-article.module.scss";
import heroBannerStyles from "layout/app/news/hero-banner/hero-banner.module.scss";
import { BANNER_BODY } from "test/topic-articles";
import { BG_LIGHT_SPACE, BG_GALAXY } from "constants/section-colours";

const NewsTopicLayout = ({ topic }) => {
  const {
    isLoading: isPostsLoading,
    hasErrored: hasPostsErrorred,
    posts,
    canFetchMore,
    isFetchingMore,
    fetchMore
  } = useMongabayPosts(topic);
  const { isLoading: isWidgetsLoading, hasErrored: hasWidgetsErrorred, widgets } = useGCAWidgets(topic);
  const { videos: allNowThisVideos } = useNowThisVideos(topic);
  const pageMetadata = getPageMetadataByTopic(topic) || {};

  let mostRecentArticle,
    otherArticles,
    postsLoadingMessage = "Loading...",
    availableWidgets = [...widgets],
    firstWidget = !isWidgetsLoading && !hasWidgetsErrorred && availableWidgets.shift(),
    secondWidget = !isWidgetsLoading && !hasWidgetsErrorred && availableWidgets.shift(),
    availableVideos = [...allNowThisVideos],
    videos = availableVideos.splice(0, 3);

  if (!isPostsLoading && !hasPostsErrorred) {
    otherArticles = [...posts];
    mostRecentArticle = otherArticles.shift();
  }

  if (hasPostsErrorred) {
    postsLoadingMessage = "An error has occurred when trying to loading the News Articles, please try again later";
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

      <Section title="Most Recent" gridClassName={newsArticleStyles["c-page-section-grid-news-articles-featured"]}>
        {/* Most Recent */}
        {mostRecentArticle ? (
          <div className={newsArticleStyles["c-page-section-grid-news-articles-featured__column"]}>
            <NewsArticle featured={true} {...mostRecentArticle} />
          </div>
        ) : (
          <div className={newsArticleStyles["c-page-section-grid-news-articles-featured__column"]}>
            <div>{postsLoadingMessage}</div>
          </div>
        )}
        {firstWidget && (
          <div className={newsArticleStyles["c-page-section-grid-news-articles-featured__column"]}>
            <Widget data-testid="first-widget" widget={firstWidget} />
          </div>
        )}
      </Section>

      <Section bgColour={BG_GALAXY}>
        {secondWidget && <Widget data-testid="second-widget" widget={secondWidget} />}
      </Section>

      <Section
        title="Must Watch"
        bgColour={BG_LIGHT_SPACE}
        gridClassName={videoArticleStyles["c-page-section-grid-video-articles"]}
      >
        {/* Must Watch */}
        {videos?.map(({ title, thumbnail, link }) => (
          <VideoArticle key={link.$.url} title={title} duration="1:11" image={thumbnail.$.url} videoURL={link.$.url} />
        ))}
      </Section>

      <Section title="More News" gridClassName={newsArticleStyles["c-page-section-grid-news-articles"]}>
        {/* More News */}
        {otherArticles ? (
          otherArticles.map(({ key, ...articleProps }) => <NewsArticle key={key} {...articleProps} />)
        ) : (
          <div>{postsLoadingMessage}</div>
        )}
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
