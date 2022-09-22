import { forwardRef, useState, useEffect, useMemo } from "react";
import classnames from "classnames";
import styles from "./menu.module.scss";
import PropTypes from "prop-types";
import DataIndexPanel from "./panels/data-options";
import DataLayerPanel from "./panels/data-layer";
import MenuLayout from "./layout";
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
      headlines,
      handleToggleLocation,
      isLocationDisabled,
      hasMenuOpen
    },
    ref
  ) => {
    const pageTitle = useMemo(() => {
      if (pageTypeId == INFO_PAGE_ID) return INFO_PAGE_HEADLINE;
      if (pageTypeId == EXTREME_EVENTS_PAGE_ID) return EXTREME_EVENTS_PAGE_HEADLINE;
      if (pageTypeId == DATA_LAYER_PAGE_ID) return currentMode.attributes.title;
    }, [currentMode, pageTypeId]);

    const navigateTo = pageId => () => setPageTypeId(pageId);

    const [footerHeading, setFooterHeading] = useState("");
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const getCurrentHeadlineIndex = () => {
      let index = -1;
      let total = 0;

      if (currentHeadline) {
        index = headlines.findIndex(headline => headline.id === currentHeadline.id);
        if (index > -1) {
          total = headlines.length;
        }
      }
      return { index, total, headlines };
    };

    // Checks current headline position to disable back/next buttons
    const checkCurrentHeadline = () => {
      const { index: currentHeadlineIndex, total } = getCurrentHeadlineIndex();

      if (currentHeadline) {
        let text = "";
        if (currentMode.attributes?.title !== "Default")
          text = `${currentHeadlineIndex + 1}/${total} ${currentMode.attributes?.title}`;
        else text = `${currentHeadlineIndex + 1}/${total} Extreme Events`;
        setFooterHeading(text);
      }
    };

    const clearHeadline = () => {
      setCurrentHeadline(undefined);
      setCurrentHeadlineId(undefined);
    };

    const viewAllExtremeEvents = () => {
      clearHeadline();
      setPageTypeId(EXTREME_EVENTS_PAGE_ID);
    };

    const navigateHeadline = action => {
      const { index: headlineIndex, headlines } = getCurrentHeadlineIndex();
      let headline = null;

      if (action === "back") {
        const indexModulus = (headlineIndex - 1) % headlines.length;
        headline = headlines[indexModulus];
        setCurrentHeadline(headline);
      } else {
        const indexModulus = (headlineIndex + 1) % headlines.length;
        headline = headlines[indexModulus];
        setCurrentHeadline(headline);
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
      checkCurrentHeadline();
    }, [currentHeadline, setCurrentMode]);

    const getMenuContent = () => (
      <div
        className={classnames(styles["c-home-menu-container"], isClosing && styles["c-home-menu-container--closing"])}
      >
        {currentHeadline && (
          <MenuLayout ref={ref} title={`Back to ${pageTitle}`} onBack={clearHeadline} onClose={onClose}>
            <div className={styles["c-home-menu__event-container"]}>
              <Event headline={currentHeadline} onViewAllEventsClicked={viewAllExtremeEvents} />
            </div>
            <HeadlineFooter
              footerHeading={footerHeading}
              disableBackButton={headlines?.length == 1}
              disableNextButton={headlines?.length == 1}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              navigateHeadline={navigateHeadline}
            />
          </MenuLayout>
        )}
        {!currentHeadline && pageTypeId == INFO_PAGE_ID && (
          <MenuLayout
            ref={ref}
            iconName="globe"
            title={pageTitle}
            onClose={onClose}
            style={isMobile ? { paddingBottom: "56px" } : {}}
          >
            <DataIndexPanel
              onClickDataLayer={setCurrentMode}
              onViewDataLayerSummary={navigateTo(DATA_LAYER_PAGE_ID)}
              onClickExtremeEvents={navigateTo(EXTREME_EVENTS_PAGE_ID)}
            />
          </MenuLayout>
        )}
        {!currentHeadline && pageTypeId == EXTREME_EVENTS_PAGE_ID && (
          <MenuLayout
            ref={ref}
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
          <MenuLayout ref={ref} title={pageTitle} onBack={navigateTo(INFO_PAGE_ID)} onClose={onClose}>
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
          toggleMenu={onClose}
          pageTypeId={currentHeadline ? "headline" : pageTypeId}
          handleToggleLocation={handleToggleLocation}
          isLocationDisabled={isLocationDisabled}
          hasMenuOpen={hasMenuOpen}
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
  setDateOfDataShown: PropTypes.func.isRequired,
  handleToggleLocation: PropTypes.func.isRequired,
  isLocationDisabled: PropTypes.bool.isRequired,
  hasMenuOpen: PropTypes.bool.isRequired
};

export default Menu;
