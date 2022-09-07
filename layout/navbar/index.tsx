import classnames from "classnames";
import { useRouter } from "next/router";
import styles from "./navbar.module.scss";
import Link from "next/link";
import IconButton from "components/ui/icon-button";

const Navbar = () => {
  const router = useRouter();

  const isNewsPage = router.route === "/news";
  const isAboutPage = router.route === "/about";

  return (
    <div className={styles["c-site-header__mobile"]}>
      <div className={styles["c-site-header__mobile-link"]}>
        <Link href="/news">
          <div
            className={classnames({
              [styles["c-site-header__mobile-link-active"]]: isNewsPage,
              [styles["c-site-header__mobile-link-container"]]: true
            })}
          >
            <IconButton name={isNewsPage ? "news-active" : "news"} size={isNewsPage ? 26 : 18} onClick={() => {}} />
            <a className={styles["text"]}>News</a>
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
            <IconButton name="earth-hq-nav" size={48} iconClassName={styles["main"]} onClick={() => {}} />
            <a className={styles["text"]}>Earth HQ</a>
          </div>
        </Link>
        <Link href="/about">
          <div
            className={classnames({
              [styles["c-site-header__mobile-link-active"]]: isAboutPage,
              [styles["c-site-header__mobile-link-container"]]: true
            })}
          >
            <IconButton name={isAboutPage ? "info-active" : "info"} size={isAboutPage ? 28 : 20} onClick={() => {}} />
            <a className={styles["text"]}>About</a>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
