import PropTypes from "prop-types";
import { getPageMetadataByTopic } from "utils/share";
import { getColorByTopic } from "utils/topics";
import Layout from "layout/layout/layout-app";
import HeroBanner from "./hero-banner";
import Section from "./section";

const BANNER_BODY_TEST = "Rising global temperatures pose a threat to every corner of the globe and most aspects of human life. By altering climatic conditions, we undermine food and water security, human and ocean health and the survival of countless species. These threats intensify with each half degree that temperatures climb.";

const NewsTopicLayout = ({ topic }) => {
  const pageMetadata = getPageMetadataByTopic(topic) || {};

  return (
    <Layout
      title={pageMetadata.title}
      description={pageMetadata.description}
      thumbnail={pageMetadata.thumbnail}
      themeColor={getColorByTopic(topic)}
    >
      <Section bgColour="galaxy" pb={false}>
        <HeroBanner title={topic} body={BANNER_BODY_TEST} />
      </Section>

      <Section title="Most Recent">
        {/* Most Recent */}
      </Section>

      <Section>
        {/* Full width Widget */}
      </Section>

      <Section>
        {/* Most Watch */}
      </Section>

      <Section>
        {/* More News */}
      </Section>


    </Layout>
  );
};

NewsTopicLayout.propTypes = {
  topic: PropTypes.string.isRequired
};

NewsTopicLayout.defaultProps = {};

export default NewsTopicLayout;
