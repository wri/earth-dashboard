import classnames from "classnames";
import { INFO_PAGE_ID } from "components/app/home/main-container/component";
import LogoLink from "components/ui/logo-link";
import HeaderLink from "layout/header/header-link";
import HeaderOptions from "layout/header/header-options";
import { resetGlobeToDefault } from "slices/common";
import styles from "./header.module.scss";
import { useRouter } from "next/router";
import { Desktop, Mobile } from "utils/responsive";
import Navbar from "layout/navbar";
import { setCurrentHeadlineId, setCurrentHeadline, Headline as HeadlineType } from "slices/headlines";
import { RootState } from "store/types";
import { connect, useDispatch, useSelector } from "react-redux";
import { setCurrentScale, setCurrentScaleBy } from "slices/mapControls";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { setPageTypeId } from "slices/modes";
import { useEffect, useRef } from "react";

type HeaderProps = {
  setCurrentHeadline: ActionCreatorWithPayload<HeadlineType | undefined, string>;
  setCurrentHeadlineId: ActionCreatorWithPayload<number | undefined, string>;
  setCurrentScale: ActionCreatorWithPayload<string, string>;
  setCurrentScaleBy: ActionCreatorWithPayload<number, string>;
  setPageTypeId: ActionCreatorWithPayload<string, string>;
};

/** Header component for the site with the logo, links, and controls. */
const Header = ({
  setCurrentHeadline,
  setCurrentHeadlineId,
  setCurrentScale,
  setCurrentScaleBy,
  setPageTypeId
}: HeaderProps) => {
  const is404 = useRef<boolean>(false);

  // Navigation
  const router = useRouter();
  const dispatch = useDispatch();
  const { pageTypeId, currentHeadlineId } = useSelector(state => ({
    // @ts-ignore redux state not strictly typed
    pageTypeId: state.modes.pageTypeId,
    // @ts-ignore redux state not strictly typed
    currentHeadlineId: state.headlines.currentHeadlineId
  }));

  const title = (() => {
    switch (router.route) {
      case "/news":
        return "News";
      default:
        return undefined;
    }
  })();

  const description = (() => {
    switch (router.route) {
      case "/news":
        return "Our partners tell the epic story of what is happening to our planet.";
      default:
        return undefined;
    }
  })();

  const handleGlobeReset = () => {
    dispatch(resetGlobeToDefault());
  };

  useEffect(() => {
    is404.current = document.title === "404";
  }, []);

  return (
    <>
      <header
        className={classnames(
          styles["c-site-header"],
          router.pathname === "/" || is404 ? styles["fixed"] : styles["sticky"]
        )}
      >
        <div className={styles["top-section"]}>
          {/* Logo */}
          <div className={styles["top-section__logo"]} onClick={handleGlobeReset}>
            <LogoLink />
          </div>

          {/* Navigation links */}
          <Desktop>
            <div className={styles["top-section__links"]}>
              <HeaderLink
                href="/"
                text="Earth HQ"
                onClick={handleGlobeReset}
                isActive={
                  pageTypeId !== INFO_PAGE_ID ? false : typeof currentHeadlineId !== "undefined" ? false : undefined
                }
              />
              <HeaderLink href="/news" text="News" />
              <HeaderLink href="/about" text="About" />
            </div>
          </Desktop>

          {/* Options */}
          <HeaderOptions />
        </div>

        {/* Text section */}
        {(title || description) && (
          <div className={styles["bottom-section"]}>
            <Mobile>{title && <h2 className={styles["title"]}>{title}</h2>}</Mobile>
            {description && <p className={styles["description"]}>{description}</p>}
          </div>
        )}
      </header>
      <Mobile>
        <Navbar />
      </Mobile>
    </>
  );
};

export default connect((state: RootState) => {}, {
  setCurrentHeadline,
  setCurrentHeadlineId,
  setCurrentScale,
  setCurrentScaleBy,
  setPageTypeId
})(Header);
