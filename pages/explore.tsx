import LayoutHome from "layout/app/home";
import { useEffect } from "react";
import { PAGE_VIEW } from "constants/tag-manager";
import { fireEvent } from "utils/gtag";

const ExplorePage = () => {
  useEffect(() => {
    fireEvent(PAGE_VIEW, "explore_tab");
  }, []);

  return (
    <LayoutHome
      title="The Science is in. This is not a drill. It's a Planetary Emergency"
      thumbnail="https://raw.githubusercontent.com/wri/earth-dashboard/main/public/static/images/share/thumbnails/homepage.jpg"
      description="Explore the evolving condition of the global commons, the source of pressures, and actions to protect, manage and restore them."
    />
  );
};

export default ExplorePage;
