import { Desktop, MediaContextProvider, Mobile } from "utils/responsive";
import NewsLayout from "layout/app/news";

const NewsPage = () => {
  return (
    // @ts-expect-error
    <MediaContextProvider>
      <Desktop>
        <NewsLayout topic="climate" />
      </Desktop>
      <Mobile>
        <NewsLayout topic="climate" isMobile />
      </Mobile>
    </MediaContextProvider>
  );
};

export default NewsPage;
