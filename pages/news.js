import Layout from "layout/layout/layout-app";
import Section from "layout/app/news/section";
import TopicCard from "layout/app/news/topic-card";
import styles from "layout/app/news/news.module.scss";
import { MenuItems } from "constants/menu-items";

// TODO: Temporary bridging design, need to remove later
const NewsPage = () => (
  <Layout>
    <Section gridClassName={styles["c-topics"]} noWrap>
      {MenuItems.map(link => (
        <TopicCard key={link.key} {...link} />
      ))}
    </Section>
  </Layout>
);

export default NewsPage;
