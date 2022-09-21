import LayoutHome from "layout/app/home";
import { connect } from "react-redux";
import { Headline } from "slices/headlines";
import { RootState } from "store/types";

type HomePageProps = {
  currentHeadline: Headline | undefined;
};

const HomePage = ({ currentHeadline }: HomePageProps) => {
  const title = currentHeadline
    ? currentHeadline.attributes.title
    : "The Science is in. This is not a drill. It's a Planetary Emergency";
  const thumbnail = currentHeadline
    ? currentHeadline.attributes.thumbnail_image
    : "https://raw.githubusercontent.com/wri/earth-dashboard/main/public/static/images/share/thumbnails/homepage.jpg";

  return (
    <LayoutHome
      title={title}
      thumbnail={thumbnail}
      description="Explore the evolving condition of the global commons, the source of pressures, and actions to protect, manage and restore them."
    />
  );
};

export default connect((state: RootState) => ({
  currentHeadline: state.headlines.currentHeadline
}))(HomePage);
