import Layout from "layout/layout/layout-app";
import Section from "layout/app/news/section";
import TopicCard from "layout/app/news/topic-card";
import HeroBanner from "layout/app/news/hero-banner";
import styles from "layout/app/news/news.module.scss";
import { MenuItems } from "constants/menu-items";
import { BG_GALAXY } from "constants/section-colours";

// TODO: Temporary bridging design, need to remove later
const NewsPage = () => (
  <Layout title="News" description="Our partners tell the epic story of what is happening to our planet.">
    <HeroBanner body="Our partners tell the epic story of what is happening to our planet." />
    <Section bgColour={BG_GALAXY} gridClassName={styles["c-topics"]} noWrap>
      {MenuItems.map(link => (
        <TopicCard key={link.key} {...link} />
      ))}
    </Section>
  </Layout>
);

export default NewsPage;
