import { forwardRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import classnames from "classnames";
import styles from "./menu.module.scss";
import PropTypes from "prop-types";
import InfoPanel from "./panels/info";
import DataInfoPanel from "./panels/data-info";
import DataLayerPanel from "./panels/data-layer";
import MenuLayout from "./layout";
import EventsListPanel from "./panels/events-list";
import MobileMenuContainer from "./menu-mobile-container";
import { PAGE_TYPE_ID, INFO_PAGE_HEADLINE, DATA_INFO_PAGE_HEADLINE } from "../main-container/component";
import CurrentEvent from "./panels/current-event";

const Menu = forwardRef(
  (
    {
      isMobile,
      onClose,
      isClosing,
      currentMode,
      currentHeadline,
      currentHeadlineId,
      mobileMenuHeight,
      setMobileMenuHeight,
      pageTypeId,
      defaultMobileMenuHeight,
      headlines,
      headlinesLoading,
      handleToggleLocation,
      isLocationDisabled,
      hasMenuOpen,
      pagePush,
      pagePop
    },
    ref
  ) => {
    const router = useRouter();

    const navigateTo = pageId => () => pagePush(pageId);

    const [footerHeading, setFooterHeading] = useState("");

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

        const headlineEl = document.getElementById(`headline-${currentHeadline.id}`);

        if (!headlineEl) return;

        headlineEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest"
        });
      }
    };

    useEffect(() => {
      if (currentHeadlineId) pagePush(PAGE_TYPE_ID.CURRENT_EVENT_PAGE);
      // eslint-disable-next-line
    }, []);

    useEffect(() => {
      checkCurrentHeadline();
      // eslint-disable-next-line
    }, [currentHeadline, headlinesLoading]);

    const getMenuContent = () => (
      <div
        className={classnames(styles["c-home-menu-container"], isClosing && styles["c-home-menu-container--closing"])}
      >
        {/* Single event view */}
        {pageTypeId == PAGE_TYPE_ID.CURRENT_EVENT_PAGE && (
          <MenuLayout ref={ref} title="Back" onBack={pagePop} onClose={onClose}>
            <CurrentEvent footerHeading={footerHeading} getCurrentHeadlineIndex={getCurrentHeadlineIndex} />
          </MenuLayout>
        )}
        {/* Main extreme events view */}
        {pageTypeId == PAGE_TYPE_ID.INFO_PAGE && router?.pathname === "/" && (
          <MenuLayout
            ref={ref}
            title={INFO_PAGE_HEADLINE}
            onClose={onClose}
            style={isMobile ? { paddingBottom: "56px" } : {}}
          >
            <InfoPanel />
          </MenuLayout>
        )}

        {/* Main data layers view */}
        {pageTypeId == PAGE_TYPE_ID.INFO_PAGE && router?.pathname === "/explore" && (
          <MenuLayout
            ref={ref}
            title={DATA_INFO_PAGE_HEADLINE}
            onClose={onClose}
            style={isMobile ? { paddingBottom: "56px" } : {}}
          >
            <DataInfoPanel />
          </MenuLayout>
        )}

        {/* All extreme events view */}
        {pageTypeId == PAGE_TYPE_ID.EXTREME_EVENTS_LIST_PAGE && (
          <MenuLayout ref={ref} title="Back" onBack={pagePop} onClose={onClose}>
            <EventsListPanel headlinesLoading={headlinesLoading} />
          </MenuLayout>
        )}

        {/* Data layer */}
        {pageTypeId == PAGE_TYPE_ID.DATA_LAYER_PAGE && (
          <MenuLayout ref={ref} title="Back" onBack={pagePop} onClose={onClose}>
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
  hasMenuOpen: PropTypes.bool.isRequired
};

export default Menu;
