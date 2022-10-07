import Layout from "layout/layout/layout-app";
import styles from "layout/app/404/404.module.scss";

const PageNotFound = () => {
  return (
    <Layout title="404" className={styles["c-page-404"]}>
      <h1>404</h1>
      <p>Ooops, that page could no longer be found. Head back to Earth HQ to explore the latest extreme events.</p>
    </Layout>
  );
};

export default PageNotFound;
