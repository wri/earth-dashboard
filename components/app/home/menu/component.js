import { forwardRef, useState, useEffect, useMemo } from "react";
import classnames from "classnames";
import styles from "./menu.module.scss";
import PropTypes from "prop-types";
import InfoPanel from "./panels/info";
import DataLayerPanel from "./panels/data-layer";
import MenuLayout from "./layout";
import EventsListPanel from "./panels/events-list";
import Event from "components/app/home/event";
import MobileMenuContainer from "./menu-mobile-container";
import { PAGE_TYPE_ID, INFO_PAGE_HEADLINE, EXTREME_EVENTS_PAGE_HEADLINE } from "../main-container/component";
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
      hasMenuOpen,
      previousPageTypeId
    },
    ref
  ) => {
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

    // Checks current headline to set the footer text
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
      setPageTypeId(PAGE_TYPE_ID.EXTREME_EVENTS_LIST_PAGE);
    };

    const navigateHeadline = action => {
      const { index: headlineIndex, total, headlines } = getCurrentHeadlineIndex();
      let headline = null;

      if (action === "back") {
        const indexModulus = (headlineIndex - 1 + total) % total;
        headline = headlines[indexModulus];
        setCurrentHeadline(headline);
      } else {
        const indexModulus = (headlineIndex + 1) % total;
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
        {pageTypeId == PAGE_TYPE_ID.CURRENT_EVENT_PAGE && (
          <MenuLayout ref={ref} title="Back" onBack={() => setPageTypeId(previousPageTypeId)} onClose={onClose}>
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
        {pageTypeId == PAGE_TYPE_ID.INFO_PAGE && (
          <MenuLayout
            ref={ref}
            title={INFO_PAGE_HEADLINE}
            onClose={onClose}
            style={isMobile ? { paddingBottom: "56px" } : {}}
          >
            <InfoPanel />
          </MenuLayout>
        )}
        {pageTypeId == PAGE_TYPE_ID.EXTREME_EVENTS_LIST_PAGE && (
          <MenuLayout
            ref={ref}
            title="Back"
            onBack={
              currentMode && currentMode.id !== defaultMode.id
                ? navigateTo(PAGE_TYPE_ID.DATA_LAYER_PAGE)
                : navigateTo(PAGE_TYPE_ID.INFO_PAGE)
            }
            onClose={onClose}
          >
            <EventsListPanel />
          </MenuLayout>
        )}
        {pageTypeId == PAGE_TYPE_ID.DATA_LAYER_PAGE && (
          <MenuLayout ref={ref} title="Back" onBack={navigateTo(PAGE_TYPE_ID.INFO_PAGE)} onClose={onClose}>
            <DataLayerPanel onClickExtremeEvents={navigateTo(PAGE_TYPE_ID.EXTREME_EVENTS_LIST_PAGE)} />
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
          pageTypeId={pageTypeId}
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
  hasMenuOpen: PropTypes.bool.isRequired,
  previousPageTypeId: PropTypes.string.isRequired
};

export default Menu;
