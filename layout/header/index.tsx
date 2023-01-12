import classnames from "classnames";
import { PAGE_TYPE_ID } from "components/app/home/main-container/component";
import LogoLink from "components/ui/logo-link";
import HeaderLink from "layout/header/header-link";
import HeaderOptions from "layout/header/header-options";
import { resetGlobeToDefault } from "slices/common";
import styles from "./header.module.scss";
import { useRouter } from "next/router";
import { Desktop, Mobile } from "utils/responsive";
import Navbar from "layout/navbar";
import { useDispatch, useSelector } from "react-redux";

/** Header component for the site with the logo, links, and controls. */
const Header = () => {
  // Navigation
  const router = useRouter();
  const dispatch = useDispatch();
  const { pageTypeId } = useSelector(state => ({
    // @ts-ignore redux state not strictly typed
    pageTypeId: state.modes.pageTypeId,
    // @ts-ignore redux state not strictly typed
    currentHeadlineId: state.headlines.currentHeadlineId
  }));

  const title = (() => {
    switch (router.route) {
      case "/news":
        return "Earth News";
      default:
        return undefined;
    }
  })();

  const description = (() => {
    switch (router.route) {
      case "/news":
        return "Real stories of planetary emergencies from partners across the globe.";
      default:
        return undefined;
    }
  })();

  const handleGlobeReset = () => {
    dispatch(resetGlobeToDefault());
  };

  const is404 = router.pathname === "/404";

  return (
    <>
      <header
        className={classnames(
          styles["c-site-header"],
          router.pathname === "/" || router.pathname === "/explore" || is404 ? styles["fixed"] : styles["sticky"]
        )}
      >
        <div className={styles["top-section"]}>
          {/* Logo */}
          <div className={styles["top-section__logo"]} onClick={handleGlobeReset}>
            <LogoLink />
          </div>

          {/* Navigation links */}
          {!is404 && (
            <>
              <Desktop>
                <div className={styles["top-section__links"]}>
                  <HeaderLink
                    href="/"
                    text="Extreme Events"
                    onClick={handleGlobeReset}
                    isActive={pageTypeId !== PAGE_TYPE_ID.INFO_PAGE ? false : undefined}
                  />
                  <HeaderLink
                    href="/explore"
                    text="Event Trends"
                    onClick={handleGlobeReset}
                    isActive={pageTypeId !== PAGE_TYPE_ID.INFO_PAGE ? false : undefined}
                  />
                  <HeaderLink href="/news" text="Earth News" />
                </div>
              </Desktop>

              {/* Options */}
              <HeaderOptions />
            </>
          )}
        </div>

        {/* Text section */}
        {(title || description) && (
          <div className={styles["bottom-section"]}>
            <Mobile>{title && <h2 className={styles["title"]}>{title}</h2>}</Mobile>
            {description && <p className={styles["description"]}>{description}</p>}
          </div>
        )}
      </header>

      {!is404 && (
        <Mobile>
          <Navbar />
        </Mobile>
      )}
    </>
  );
};

export default Header;
