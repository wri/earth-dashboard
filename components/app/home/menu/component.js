import { forwardRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import classnames from "classnames";
import styles from "./menu.module.scss";
import PropTypes from "prop-types";
import InfoPanel from "./panels/info";
import DataInfoPanel from "./panels/data-info";
import DataLayerPanel from "./panels/data-layer";
import MenuLayout from "./layout";
import EventsListPanel from "./panels/events-list";
import Event from "components/app/home/event";
import MobileMenuContainer from "./menu-mobile-container";
import { PAGE_TYPE_ID, INFO_PAGE_HEADLINE, DATA_INFO_PAGE_HEADLINE } from "../main-container/component";
import HeadlineFooter from "../headline-footer";
import { fireEvent } from "utils/gtag";
import { VIEW_ALL_EXTREME_EVENTS } from "constants/tag-manager";
import EventSkeleton from "../event/event-skeleton";

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
      currentHeadlineId,
      setCurrentHeadline,
      setCurrentHeadlineId,
      mobileMenuHeight,
      setMobileMenuHeight,
      pageTypeId,
      setPageTypeId,
      defaultMobileMenuHeight,
      headlines,
      headlinesLoading,
      handleToggleLocation,
      isLocationDisabled,
      hasMenuOpen,
      previousPageTypeId
    },
    ref
  ) => {
    const router = useRouter();

    const navigateTo = pageId => () => setPageTypeId(pageId);

    const [nextHeadlineEl, setNextHeadlineEl] = useState();
    const [prevHeadlineEl, setPrevHeadlineEl] = useState();

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

      if (currentHeadline && currentMode) {
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

    const clearHeadline = () => {
      setCurrentHeadline(undefined);
      setCurrentHeadlineId(undefined);
    };

    const viewAllExtremeEvents = () => {
      clearHeadline();
      setPageTypeId(PAGE_TYPE_ID.EXTREME_EVENTS_LIST_PAGE);
      fireEvent(VIEW_ALL_EXTREME_EVENTS, "web_earth_hq_carousel");
    };

    /** Moves headlines. */
    const navigateHeadline = action => {
      const { index, total } = getCurrentHeadlineIndex();

      if (action === "back" && prevHeadlineEl) {
        prevHeadlineEl.scrollIntoView({
          behavior: index === 0 ? "auto" : "smooth",
          block: "nearest",
          inline: "nearest"
        });
      } else if (nextHeadlineEl) {
        nextHeadlineEl.scrollIntoView({
          behavior: index === total - 1 ? "auto" : "smooth",
          block: "nearest",
          inline: "nearest"
        });
      }
    };

    useEffect(() => {
      if (currentHeadlineId) setPageTypeId(PAGE_TYPE_ID.CURRENT_EVENT_PAGE);
      // eslint-disable-next-line
    }, []);

    useEffect(() => {
      checkCurrentHeadline();
      // eslint-disable-next-line
    }, [currentHeadline, setCurrentMode, headlinesLoading]);

    // Observes each item and checks if in viewport
    useEffect(() => {
      const root = document.getElementById("events");

      if (pageTypeId !== PAGE_TYPE_ID.CURRENT_EVENT_PAGE || !root) return;

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            const newHeadline = headlines.find(headline => entry.target.id === `headline-${headline.id}`);

            if (!entry.isIntersecting || !newHeadline) return;

            entry.target.scrollTo({
              top: 0,
              behavior: "smooth"
            });
            setCurrentHeadline(newHeadline);
            setNextHeadlineEl(entry.target.nextElementSibling ?? entry.target.parentElement.firstElementChild);
            setPrevHeadlineEl(entry.target.previousElementSibling ?? entry.target.parentElement.lastElementChild);
          });
        },
        {
          root,
          rootMargin: "0px",
          threshold: 1
        }
      );

      root.childNodes.forEach(node => {
        observer.observe(node);
      });

      return () => {
        observer.disconnect();
      };
      // eslint-disable-next-line
    }, [pageTypeId, headlinesLoading]);

    const getMenuContent = () => (
      <div
        className={classnames(styles["c-home-menu-container"], isClosing && styles["c-home-menu-container--closing"])}
      >
        {/* Single event view */}
        {pageTypeId == PAGE_TYPE_ID.CURRENT_EVENT_PAGE && (
          <MenuLayout ref={ref} title="Back" onBack={() => setPageTypeId(previousPageTypeId)} onClose={onClose}>
            {headlinesLoading ? (
              <EventSkeleton />
            ) : (
              <div id="events" className={styles["c-home-menu__events"]}>
                {headlines.map(headline => (
                  <Event key={headline.id} headline={headline} onViewAllEventsClicked={viewAllExtremeEvents} />
                ))}
              </div>
            )}
            <HeadlineFooter
              footerHeading={footerHeading}
              disableBackButton={headlines?.length == 1}
              disableNextButton={headlines?.length == 1}
              navigateHeadline={navigateHeadline}
              isLoading={headlinesLoading}
            />
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
            <EventsListPanel headlinesLoading={headlinesLoading} />
          </MenuLayout>
        )}

        {/* Data layer */}
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
