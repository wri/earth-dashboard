import { Desktop, MediaContextProvider, Mobile } from "utils/responsive";
import NewsLayout from "layout/app/news";
import { useEffect } from "react";
import { fireEvent } from "utils/gtag";
import { PAGE_VIEW } from "constants/tag-manager";

const NewsPage = () => {
  useEffect(() => {
    fireEvent(PAGE_VIEW, "news_tab");
  }, []);

  return <NewsLayout />;
};

export default NewsPage;
