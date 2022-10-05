import { Desktop, MediaContextProvider, Mobile } from "utils/responsive";
import NewsSearchLayout from "layout/app/news/search";

const NewsPage = () => {
  return (
    // @ts-expect-error
    <MediaContextProvider>
      <Desktop>
        <NewsSearchLayout topic="climate" />
      </Desktop>
      <Mobile>
        <NewsSearchLayout topic="climate" isMobile />
      </Mobile>
    </MediaContextProvider>
  );
};

export default NewsPage;
