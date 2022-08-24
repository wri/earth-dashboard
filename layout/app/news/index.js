import NewsTopicLayoutComponent from "./component";
import { connect } from "react-redux";
import { setIsMobile } from "slices/common";

// TODO: Temporary bridging design, need to remove later
const NewsIndex = () => {
  return (
    <Layout>
      <Section gridClassName={styles["c-topics"]} noWrap>
        {MenuItems.map(link => (
          <TopicCard key={link.key} {...link} />
        ))}
      </Section>
    </Layout>
  );
};

export default connect(state => ({}), {
  setIsMobile
})(NewsTopicLayoutComponent);
