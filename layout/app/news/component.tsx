import { useEffect } from "react";
import useMongabayPosts from "hooks/useMongabayPosts";
import useGCAWidgets from "hooks/useGCAWidgets";
import useCMSVideos from "hooks/useCMSVideos";
import { getColorByTopic } from "utils/topics";
import Layout from "layout/layout/layout-app";
import AnchorCTA from "components/ui/anchor-cta";
import Section from "./section";
import EarthHQCTA from "layout/app/news/earth-hq-cta";
import NewsArticle from "components/news-article";
import VideoArticle from "components/video-article";
import Widget from "layout/app/news/widget";
import { Desktop, MediaContextProvider, Mobile } from "utils/responsive";
import { CLIMATE } from "utils/topics";
import TOPICS from "constants/news";
import styles from "./news.module.scss";
import newsArticleStyles from "components/news-article/news-article.module.scss";
import videoArticleStyles from "components/video-article/video-article.module.scss";
import { BG_LIGHT_SPACE, BG_GALAXY } from "constants/section-colours";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import IconButton from "components/ui/icon-button";
import SearchDialog from "./search/search-dialog";

const LIMIT = 10;
const LOAD_MORE_LIMIT = 9;

type NewsLayoutProps = {
  topic: keyof typeof TOPICS;
  isMobile?: boolean;
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
  } = useMongabayPosts(LIMIT);
  const { isLoading: isWidgetsLoading, hasErrored: hasWidgetsErrorred, widgets } = useGCAWidgets(topic);
  const { videos: allCMSVideos } = useCMSVideos(topic);

  // Store the isMobile flag in the redux store
  useEffect(() => {
    setIsMobile(!!isMobile);
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

  /** Scrolls to top. */
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <Layout title="News" themeColor={getColorByTopic(topic)}>
      {/* To top button */}
      <IconButton name="arrow-up" size={16} onClick={handleScrollToTop} className={styles["c-news__top-button"]} />

      <Section title="Most Recent" gridClassName={newsArticleStyles["c-page-section-grid-news-articles-featured"]}>
        {/* Most Recent */}
        {mostRecentArticle ? (
          <div className={newsArticleStyles["c-page-section-grid-news-articles-featured__article"]}>
            <NewsArticle topic={topic} {...mostRecentArticle} featured />
          </div>
        ) : (
          <div className={newsArticleStyles["c-page-section-grid-news-articles-featured__article"]}>
            <div>{postsLoadingMessage}</div>
          </div>
        )}
        {firstWidget && (
          <div className={newsArticleStyles["c-page-section-grid-news-articles-featured__widget"]}>
            <Widget data-testid="first-widget" widget={firstWidget} bordered sourceButtonRight />
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
              {isFetchingMore ? "Loading..." : "Load More "}
            </AnchorCTA>
          </div>
        )}
      </Section>

      {/* @ts-expect-error */}
      <MediaContextProvider>
        <Desktop>
          <EarthHQCTA />
        </Desktop>
        <Mobile>
          {/* Search */}
          <SearchDialog />
        </Mobile>
      </MediaContextProvider>
    </Layout>
  );
};

export default NewsLayout;
