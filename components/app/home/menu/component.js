import { forwardRef, useState, useEffect, useMemo } from "react";
import classnames from "classnames";
import styles from "./menu.module.scss";
import PropTypes from "prop-types";
import DataIndexPanel from "./panels/data-options";
import DataLayerPanel from "./panels/data-layer";
import MenuLayout from "./layout";
import { fireEvent } from "utils/gtag";
import { CLIMATE_ALERT_EVENT_NAME } from "constants/tag-manager";
import ClimateAlerts from "./panels/climate-alerts";
import Event from "components/app/home/event";
import MobileMenuContainer from "./menu-mobile-container";
import {
  INFO_PAGE_ID,
  EXTREME_EVENTS_PAGE_ID,
  DATA_LAYER_PAGE_ID,
  INFO_PAGE_HEADLINE,
  EXTREME_EVENTS_PAGE_HEADLINE
} from "../main-container/component";
import HeadlineFooter from "../headline-footer";

const MAX_NUMBER_OF_HEADLINES = 10;
const MIN_SWIPE_DISTANCE = 50;

const Menu = forwardRef(
  (
    {
      isMobile,
      onClose,
      isClosing,
      defaultMode,
      currentMode,
      setCurrentMode,
      currentHeadline,
      setCurrentHeadline,
      setCurrentHeadlineId,
      mobileMenuHeight,
      setMobileMenuHeight,
      pageTypeId,
      setPageTypeId,
      defaultMobileMenuHeight,
      pointerHeadlines
    },
    ref
  ) => {
    const pageTitle = useMemo(() => {
      if (pageTypeId == INFO_PAGE_ID) return INFO_PAGE_HEADLINE;
      if (pageTypeId == EXTREME_EVENTS_PAGE_ID) return EXTREME_EVENTS_PAGE_HEADLINE;
      if (pageTypeId == DATA_LAYER_PAGE_ID) return currentMode.attributes.title;
    }, [currentMode, pageTypeId]);

    const navigateTo = pageId => () => setPageTypeId(pageId);

    const [disableBackButton, setDisableBackButton] = useState(false);
    const [disableNextButton, setDisableNextButton] = useState(false);
    const [footerHeading, setFooterHeading] = useState("");
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const splitHeadlines = () => {
      const reversed = [...pointerHeadlines].reverse();
      return reversed.reduce((acc, val, i) => {
        let idx = Math.floor(i / MAX_NUMBER_OF_HEADLINES);
        let page = acc[idx] || (acc[idx] = []);
        page.push(val);

        return acc;
      }, []);
    };

    const getCurrentHeadlineIndex = () => {
      let index = -1;
      let total = 0;
      let headlines = [];

      if (currentHeadline) {
        const paginatedHeadlines = splitHeadlines();
        for (const headlineRow of paginatedHeadlines) {
          index = headlineRow.findIndex(headline => headline.id === currentHeadline.id);
          if (index > -1) {
            headlines = headlineRow;
            total = headlineRow.length;
            break;
          }
        }
        return { index, total, headlines };
      }
      return { index, total, headlines };
    };

    // Checks current headline position to disable back/next buttons
    const checkCurrentHeadline = () => {
      const { index: currentHeadlineIndex, total } = getCurrentHeadlineIndex();

      if (currentHeadline) {
        const text = `${currentHeadlineIndex + 1}/${total} Extreme Events`;
        setFooterHeading(text);
      }

      // For disabling back button
      if (currentHeadline && currentHeadlineIndex === 0) {
        setDisableBackButton(true);
      } else if (currentHeadline && currentHeadlineIndex === total - 1) {
        setDisableNextButton(true);
      } else {
        setDisableBackButton(false);
        setDisableNextButton(false);
      }
    };

    const clearHeadline = () => {
      setCurrentHeadline(undefined);
      setCurrentHeadlineId(undefined);
    };

    const navigateHeadline = action => {
      const { index: headlineIndex, headlines } = getCurrentHeadlineIndex();
      let headline = null;

      if (action === "back") {
        headline = headlines[headlineIndex - 1];
        setCurrentHeadline(headline);
        fireEvent(CLIMATE_ALERT_EVENT_NAME, headline.attributes?.title);
      } else {
        headline = headlines[headlineIndex + 1];
        setCurrentHeadline(headline);
        fireEvent(CLIMATE_ALERT_EVENT_NAME, headline.attributes?.title);
      }
    };

    const onTouchStart = e => {
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = e => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance < -MIN_SWIPE_DISTANCE;

      if (isLeftSwipe) navigateHeadline("back");
      else navigateHeadline("next");
    };

    useEffect(() => {
      if (currentHeadline) {
        setCurrentMode(currentHeadline.attributes.mode);
      }
      checkCurrentHeadline();
    }, [currentHeadline, setCurrentMode]);

    const getMenuContent = () => (
      <div
        ref={ref}
        className={classnames(styles["c-home-menu-container"], isClosing && styles["c-home-menu-container--closing"])}
      >
        {currentHeadline && (
          <MenuLayout title={`Back to ${pageTitle}`} onBack={clearHeadline} onClose={onClose}>
            <Event headline={currentHeadline} />
            <HeadlineFooter
              footerHeading={footerHeading}
              disableBackButton={disableBackButton}
              disableNextButton={disableNextButton}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              navigateHeadline={navigateHeadline}
            />
          </MenuLayout>
        )}
        {!currentHeadline && pageTypeId == INFO_PAGE_ID && (
          <MenuLayout iconName="globe" title={pageTitle} onClose={onClose}>
            <DataIndexPanel
              onClickDataLayer={setCurrentMode}
              onViewDataLayerSummary={navigateTo(DATA_LAYER_PAGE_ID)}
              onClickExtremeEvents={navigateTo(EXTREME_EVENTS_PAGE_ID)}
            />
          </MenuLayout>
        )}
        {!currentHeadline && pageTypeId == EXTREME_EVENTS_PAGE_ID && (
          <MenuLayout
            title={pageTitle}
            onBack={
              currentMode && currentMode.id !== defaultMode.id
                ? navigateTo(DATA_LAYER_PAGE_ID)
                : navigateTo(INFO_PAGE_ID)
            }
            onClose={onClose}
          >
            <ClimateAlerts />
          </MenuLayout>
        )}
        {!currentHeadline && pageTypeId == DATA_LAYER_PAGE_ID && (
          <MenuLayout title={pageTitle} onBack={navigateTo(INFO_PAGE_ID)} onClose={onClose}>
            <DataLayerPanel onClickExtremeEvents={navigateTo(EXTREME_EVENTS_PAGE_ID)} />
          </MenuLayout>
        )}
      </div>
    );

    if (isMobile)
      return (
        <MobileMenuContainer
          defaultPanelHeight={defaultMobileMenuHeight}
          panelHeight={mobileMenuHeight}
          setPanelHeight={setMobileMenuHeight}
        >
          {getMenuContent()}
        </MobileMenuContainer>
      );
    return getMenuContent();
  }
);

Menu.displayName = "Menu";

Menu.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  isClosing: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  layers: PropTypes.array.isRequired,
  setCurrentHeadline: PropTypes.func.isRequired,
  setCurrentHeadlineId: PropTypes.func.isRequired,
  setDateOfDataShown: PropTypes.func.isRequired
};

export default Menu;
