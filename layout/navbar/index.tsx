import classnames from "classnames";
import { useRouter } from "next/router";
import styles from "./navbar.module.scss";
import Link from "next/link";
import IconButton from "components/ui/icon-button";

const Navbar = () => {
  const router = useRouter();

  const isNewsPage = router.route === "/news";
  const isExplorePage = router.route === "/explore";

  return (
    <div className={styles["c-site-header__mobile"]}>
      <div className={styles["c-site-header__mobile-link"]}>
        <Link href="/explore">
          <div
            className={classnames({
              [styles["c-site-header__mobile-link-active"]]: isExplorePage,
              [styles["c-site-header__mobile-link-active-side"]]: isExplorePage,
              [styles["c-site-header__mobile-link-container"]]: true
            })}
          >
            <IconButton
              className={classnames({
                [styles["explore-icon"]]: true,
                [styles["explore-icon-selected"]]: isExplorePage
              })}
              name="explore"
              size={20}
              onClick={() => {}}
            />
            <a className={styles["text"]}>Explore</a>
          </div>
        </Link>
        <Link href="/">
          <div
            className={classnames({
              [styles["c-site-header__mobile-link-active"]]: router.route === "/",
              [styles["c-site-header__mobile-link-container"]]: true,
              [styles["c-site-header__mobile-link-main"]]: true
            })}
          >
            <IconButton
              name="earth-hq-nav"
              size={48}
              className={styles["main-svg"]}
              iconClassName={styles["main"]}
              onClick={() => {}}
            />
            <a className={styles["text"]}>Earth HQ</a>
          </div>
        </Link>
        <Link href="/news">
          <div
            className={classnames({
              [styles["c-site-header__mobile-link-active"]]: isNewsPage,
              [styles["c-site-header__mobile-link-active-side"]]: isNewsPage,
              [styles["c-site-header__mobile-link-container"]]: true
            })}
          >
            <IconButton name={isNewsPage ? "news-active" : "news"} size={28} onClick={() => {}} />
            <a className={styles["text"]}>News</a>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
