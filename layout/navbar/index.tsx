import classnames from "classnames";
import { useRouter } from "next/router";
import styles from "./navbar.module.scss";
import Link from "next/link";
import Icon from "components/ui/Icon";

const Navbar = () => {
  const router = useRouter();

  const isNewsPage = router.route === "/news";
  const isExplorePage = router.route === "/explore";
  const isMainPage = router.route === "/";

  return (
    <nav className={styles["c-mobile-navigation"]}>
      <ul className={styles["c-mobile-navigation__links"]}>
        <li>
          <Link href="/explore" passHref>
            <a
              className={classnames(
                styles["c-mobile-navigation__link"],
                isExplorePage && styles["c-mobile-navigation__link--active"]
              )}
            >
              <Icon name="explore" size={28} type="decorative" />
              <span>Event Trends</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/" passHref>
            <a
              className={classnames(
                styles["c-mobile-navigation__link"],
                styles["c-mobile-navigation__link--main"],
                isMainPage && styles["c-mobile-navigation__link--active"]
              )}
            >
              <div className={styles["c-mobile-navigation__main-icon"]}>
                <Icon name="earth-hq-nav" size={48} type="decorative" />
              </div>
              <span>Extreme Events</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/news" passHref>
            <a
              className={classnames(
                styles["c-mobile-navigation__link"],
                isNewsPage && styles["c-mobile-navigation__link--active"]
              )}
            >
              <Icon name="news-active" size={28} type="decorative" />
              <span>Earth News</span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
