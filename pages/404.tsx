import Layout from "layout/layout/layout-app";
import styles from "layout/app/404/404.module.scss";
import AnchorCTA from "components/ui/anchor-cta/component";
import Icon from "components/ui/Icon";
import Image from "next/image";
import GlobeFiresHalf from "public/static/images/globe-fires-half.png";

const PageNotFound = () => {
  return (
    <Layout title="404" className={styles["c-page-404"]}>
      {/* Container */}
      <div className={styles["container"]}>
        {/* Text */}
        <h1>404</h1>
        <p>Ooops, that page could no longer be found. Head back to Earth HQ to explore the latest extreme events.</p>

        {/* Button */}
        <AnchorCTA className={styles["back-btn"]} href="/">
          <p className={styles["text"]}>Back Earth HQ</p>
          <div className={styles["icon"]}>
            <Icon name="arrow-right" size={15} type="decorative" />
          </div>
        </AnchorCTA>
      </div>

      <div className={styles["globe"]}>
        <Image src={GlobeFiresHalf} layout="fill" objectFit="cover" objectPosition="top" role="presentation" alt="" />
        <div className={styles["shadow"]} />
      </div>
    </Layout>
  );
};

export default PageNotFound;
