import Layout from "layout/layout/layout-app";
import Section from "layout/app/news/section";
import TopicCard from "layout/app/news/topic-card";
import styles from "layout/app/news/news.module.scss";
import { MenuItems } from "constants/menu-items";
import { BG_GALAXY } from "constants/section-colours";

// TODO: Temporary bridging design, need to remove later
const NewsPage = () => {
  return (
    <Layout>
      <Section bgColour={BG_GALAXY} gridClassName={styles["c-topics"]} noWrap>
        {MenuItems.map(({ key, ...link }) => (
          <TopicCard key={key} {...link} />
        ))}
      </Section>
    </Layout>
  );
};

export default NewsPage;
