import { Desktop, MediaContextProvider, Mobile } from "utils/responsive";
import NewsLayout from "layout/app/news";
import { useEffect } from "react";
import { fireEvent } from "utils/gtag";
import { PAGE_VIEW } from "constants/tag-manager";

const NewsPage = () => {
  useEffect(() => {
    fireEvent(PAGE_VIEW, "news_tab");
  }, []);

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
