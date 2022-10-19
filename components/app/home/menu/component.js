import { forwardRef } from "react";
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
      mobileMenuHeight,
      setMobileMenuHeight,
      pageTypeId,
      defaultMobileMenuHeight,
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

    const getMenuContent = () => (
      <div
        className={classnames(styles["c-home-menu-container"], isClosing && styles["c-home-menu-container--closing"])}
      >
        {/* Resizable handle */}
        <div className={styles["c-home-menu-container__handle"]} />

        {/* Single event view */}
        {pageTypeId == PAGE_TYPE_ID.CURRENT_EVENT_PAGE && (
          <MenuLayout ref={ref} title="Back" onBack={pagePop} onClose={onClose}>
            <CurrentEvent />
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
