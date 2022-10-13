import { forwardRef, useState, useEffect } from "react";
import classnames from "classnames";
import styles from "./menu.module.scss";
import PropTypes from "prop-types";
import InfoPanel from "./panels/info";
import DataLayerPanel from "./panels/data-layer";
import MenuLayout from "./layout";
import EventsListPanel from "./panels/events-list";
import Event from "components/app/home/event";
import MobileMenuContainer from "./menu-mobile-container";
import { PAGE_TYPE_ID, INFO_PAGE_HEADLINE } from "../main-container/component";
import HeadlineFooter from "../headline-footer";

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

    const [nextHeadlineEl, setNextHeadlineEl] = useState();
    const [prevHeadlineEl, setPrevHeadlineEl] = useState();
    const [scrollStopper, setScrollStopper] = useState();

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

    /** Moves headlines. */
    const navigateHeadline = action => {
      if (action === "back") {
        return prevHeadlineEl.scrollIntoView({
          behavior: "smooth"
        });
      }

      nextHeadlineEl.scrollIntoView({
        behavior: "smooth"
      });
    };

    useEffect(() => {
      checkCurrentHeadline();
      // eslint-disable-next-line
    }, [currentHeadline, setCurrentMode]);

    /** Stops the scroll if at the bottom of the container. */
    const handleScrollStop = e => {
      const headlineEl = document.getElementById(`headline-${currentHeadline.id}`);

      if (!headlineEl) return;

      const heroEl = headlineEl.firstElementChild;
      const contentEl = headlineEl.lastElementChild;
      const scrollPercentage = (e.target.clientHeight + e.target.scrollTop) / e.target.scrollHeight;
      const cutoff = (heroEl.clientHeight + contentEl.clientHeight) / headlineEl.clientHeight;

      if (!scrollStopper && scrollPercentage >= cutoff) setScrollStopper(e.target.scrollTop);

      // if (scrollPercentage >= cutoff) e.target.scrollTop = scrollStopper;
    };

    // Observes each item and checks if in viewport
    useEffect(() => {
      const root = document.getElementById("events");

      if (pageTypeId !== PAGE_TYPE_ID.CURRENT_EVENT_PAGE || !root) return;

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            const newHeadline = headlines.find(headline => entry.target.id === `headline-${headline.id}`);

            if (!entry.isIntersecting || !newHeadline) return;

            setCurrentHeadline(newHeadline);
            setNextHeadlineEl(entry.target.nextElementSibling ?? entry.target.firstElementChild);
            setPrevHeadlineEl(entry.target.previousElementSibling ?? entry.target.lastElementChild);
            setScrollStopper(undefined);
            setTimeout(() => {
              ref.current.lastElementChild.scrollTo({
                top: 0,
                behavior: "smooth"
              });
            }, 400);
          });
        },
        {
          root,
          rootMargin: "0px",
          threshold: 0.5
        }
      );

      root.childNodes.forEach(node => {
        observer.observe(node);
      });

      return () => {
        root.childNodes.forEach(node => {
          observer.unobserve(node);
        });
      };
      // eslint-disable-next-line
    }, [pageTypeId]);

    const getMenuContent = () => (
      <div
        className={classnames(styles["c-home-menu-container"], isClosing && styles["c-home-menu-container--closing"])}
      >
        {pageTypeId == PAGE_TYPE_ID.CURRENT_EVENT_PAGE && (
          <MenuLayout
            ref={ref}
            title="Back"
            onBack={() => setPageTypeId(previousPageTypeId)}
            onClose={onClose}
            onScroll={handleScrollStop}
          >
            <div>
              <div id="events" className={styles["c-home-menu__events"]}>
                {headlines.map(headline => (
                  <Event key={headline.id} headline={headline} onViewAllEventsClicked={viewAllExtremeEvents} />
                ))}
              </div>
            </div>
            <HeadlineFooter
              footerHeading={footerHeading}
              disableBackButton={headlines?.length == 1}
              disableNextButton={headlines?.length == 1}
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
