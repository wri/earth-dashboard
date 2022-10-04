import { useEffect } from "react";
import useMongabayPosts from "hooks/useMongabayPosts";
import useGCAWidgets from "hooks/useGCAWidgets";
import useCMSVideos from "hooks/useCMSVideos";
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
import { Desktop, MediaContextProvider } from "utils/responsive";
import { CLIMATE } from "utils/topics";
import TOPICS from "constants/news";
import newsArticleStyles from "components/news-article/news-article.module.scss";
import videoArticleStyles from "components/video-article/video-article.module.scss";
import heroBannerStyles from "layout/app/news/hero-banner/hero-banner.module.scss";
import { BG_LIGHT_SPACE, BG_GALAXY } from "constants/section-colours";
import heroBannerTexts from "constants/news/banners";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

const LIMIT = 10;
const LOAD_MORE_LIMIT = 9;

type NewsLayoutProps = {
  topic: keyof typeof TOPICS;
  isMobile: boolean;
  setIsMobile: ActionCreatorWithPayload<boolean, string>;
};

const NewsLayout = ({ topic = CLIMATE, isMobile, setIsMobile }: NewsLayoutProps) => {
  const {
    isLoading: isPostsLoading,
    hasErrored: hasPostsErrorred,
    posts,
    canFetchMore,
    isFetchingMore,
    fetchMore
  } = useMongabayPosts(topic, LIMIT);
  const { isLoading: isWidgetsLoading, hasErrored: hasWidgetsErrorred, widgets } = useGCAWidgets(topic);
  const { videos: allCMSVideos } = useCMSVideos(topic);

  const pageMetadata = getPageMetadataByTopic(topic);

  // Store the isMobile flag in the redux store
  useEffect(() => {
    setIsMobile(isMobile);
  }, [isMobile, setIsMobile]);

  let mostRecentArticle,
    otherArticles,
    postsLoadingMessage = "Loading...",
    availableWidgets = [...widgets],
    firstWidget = !isWidgetsLoading && !hasWidgetsErrorred && availableWidgets.shift(),
    secondWidget = !isWidgetsLoading && !hasWidgetsErrorred && availableWidgets.shift(),
    availableVideos = [...allCMSVideos],
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
      title={pageMetadata?.title}
      description={pageMetadata?.description}
      thumbnail={pageMetadata?.thumbnail}
      themeColor={getColorByTopic(topic)}
    >
      <Section
        bgColour={BG_GALAXY}
        paddingBottom={false}
        gridClassName={heroBannerStyles["c-page-section-grid-hero-banner"]}
      >
        <HeroBanner title={heroBannerTexts[topic]?.title || `${topic} News`} body={heroBannerTexts[topic]?.body} />
      </Section>

      <Section title="Most Recent" gridClassName={newsArticleStyles["c-page-section-grid-news-articles-featured"]}>
        {/* Most Recent */}
        {mostRecentArticle ? (
          <div className={newsArticleStyles["c-page-section-grid-news-articles-featured__column"]}>
            <NewsArticle topic={topic} {...mostRecentArticle} featured />
          </div>
        ) : (
          <div className={newsArticleStyles["c-page-section-grid-news-articles-featured__column"]}>
            <div>{postsLoadingMessage}</div>
          </div>
        )}
        {firstWidget && (
          <div className={newsArticleStyles["c-page-section-grid-news-articles-featured__column"]}>
            <Widget data-testid="first-widget" widget={firstWidget} bordered />
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
        {videos?.map(({ id, attributes: video }) => (
          <VideoArticle
            key={id}
            topic={topic}
            title={video["title"]}
            image={video["thumbnail_image"]}
            videoURL={video["url"]}
          />
        ))}
      </Section>

      <Section title="More News" gridClassName={newsArticleStyles["c-page-section-grid-news-articles"]}>
        {/* More News */}
        {otherArticles ? (
          otherArticles.map(({ key, ...articleProps }) => <NewsArticle key={key} topic={topic} {...articleProps} />)
        ) : (
          <div>{postsLoadingMessage}</div>
        )}
        {canFetchMore && (
          <div className={newsArticleStyles["c-page-section-grid-news-articles__load-more"]}>
            <AnchorCTA
              className={newsArticleStyles["c-page-section-grid-news-articles__load-more__btn"]}
              onClick={() => fetchMore(LOAD_MORE_LIMIT)}
            >
              Load More {isFetchingMore && "Loading..."}
            </AnchorCTA>
          </div>
        )}
      </Section>

      {/* @ts-expect-error */}
      <MediaContextProvider>
        <Desktop>
          <EarthHQCTA />
        </Desktop>
      </MediaContextProvider>
    </Layout>
  );
};

export default NewsLayout;
