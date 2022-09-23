import LayoutHome from "layout/app/home";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchClimateAlertById } from "services/gca";
import { Headline } from "slices/headlines";
import { RootState } from "store/types";

type HomePageProps = {
  initCurrentHeadline: Headline | undefined;
  currentHeadline: Headline | undefined;
};

const HomePage = ({ initCurrentHeadline, currentHeadline }: HomePageProps) => {
  const [hasSetCorrectMeta, setHasSetCorrectMeta] = useState<boolean>(false);

  useEffect(() => {
    if (!hasSetCorrectMeta) {
      if (!initCurrentHeadline) return setHasSetCorrectMeta(true);
      if (initCurrentHeadline && currentHeadline) return setHasSetCorrectMeta(true);
    }
  }, [currentHeadline]);

  const title = currentHeadline
    ? currentHeadline.attributes.title
    : initCurrentHeadline && !hasSetCorrectMeta
    ? initCurrentHeadline.attributes.title
    : "The Science is in. This is not a drill. It's a Planetary Emergency";
  const thumbnail = currentHeadline
    ? currentHeadline.attributes.thumbnail_image
    : initCurrentHeadline && !hasSetCorrectMeta
    ? initCurrentHeadline.attributes.thumbnail_image
    : "https://raw.githubusercontent.com/wri/earth-dashboard/main/public/static/images/share/thumbnails/homepage.jpg";

  return (
    <LayoutHome
      title={title}
      thumbnail={thumbnail}
      description="Explore the evolving condition of the global commons, the source of pressures, and actions to protect, manage and restore them."
    />
  );
};

HomePage.getInitialProps = async ({ query }: { query: any }) => {
  if (!query.headline) return { initCurrentHeadline: undefined };

  try {
    const resp = await fetchClimateAlertById(query.headline);
    // @ts-expect-error
    if (resp.data) {
      // @ts-expect-error
      const initCurrentHeadline = resp.data.data;
      return { initCurrentHeadline };
    }
  } catch (err) {
    console.log("Error fetching headlines", err);
  }

  return { initCurrentHeadline: undefined };
};

export default connect((state: RootState) => ({
  currentHeadline: state.headlines.currentHeadline
}))(HomePage);
