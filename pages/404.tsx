import Layout from "layout/layout/layout-app";
import styles from "layout/app/404/404.module.scss";
import AnchorCTA from "components/ui/anchor-cta/component";
import Icon from "components/ui/Icon";
import Image from "next/image";
import GlobeFiresHalf from "public/static/images/globe-fires-half.png";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { fireEvent } from "utils/gtag";
import { ERROR_BACK_EARTH_HQ, PAGE_VIEW } from "constants/tag-manager";

const PageNotFound = () => {
  const { replace } = useRouter();

  useEffect(() => {
    replace("/404");
    fireEvent(PAGE_VIEW, "error_404");
    // eslint-disable-next-line
  }, []);

  return (
    <Layout title="404" className={styles["c-page-404"]}>
      {/* Container */}
      <div className={styles["c-page-404__container"]}>
        {/* Text */}
        <h1>404</h1>
        <p>Oops, that page could not be found. Head back to Earth HQ to explore the latest extreme events.</p>

        {/* Button */}
        <AnchorCTA className={styles["back-btn"]} href="/" onClick={() => fireEvent(ERROR_BACK_EARTH_HQ, null)}>
          <p className={styles["text"]}>Back To Earth HQ</p>
          <div className={styles["icon"]}>
            <Icon name="arrow-right" size={15} type="decorative" />
          </div>
        </AnchorCTA>
      </div>

      <div className={styles["c-page-404__globe"]}>
        <Image src={GlobeFiresHalf} layout="fill" objectFit="cover" objectPosition="top" role="presentation" alt="" />
        <div className={styles["shadow"]} />
      </div>
    </Layout>
  );
};

export default PageNotFound;
