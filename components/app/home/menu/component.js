import { forwardRef, useState, useMemo, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import classnames from "classnames";
import styles from "./menu.module.scss";
import PropTypes from "prop-types";
import DataPanel from "./panels/data";
import HeadlinePanel from "./panels/climate-alerts";
import DataHighlightsPanel from "./panels/data-highlights";
import ResizablePanel from "components/app/home/dialog-panel/resizable-panel";
import { fireEvent } from "utils/gtag";
import { MENU_TAB_CHANGE_EVENT_NAME, CLIMATE_ALERT_EVENT_NAME } from "constants/tag-manager";

const INFO_TAB_INDEX = 3;
const DATA_TAB_INDEX = 2;
const MAX_NUMBER_OF_HEADLINES = 10;
const MIN_SWIPE_DISTANCE = 50;

const TAB_NAME_BY_TAB_INDEX = {
  0: "Latest Extreme Events",
  1: "Data Highlights",
  2: "Advanced Menu"
};

const Menu = forwardRef(
  (
    {
      isMobile,
      onClose,
      isClosing,
      modes,
      currentMode,
      setCurrentMode,
      animationValue,
      animationEnabled,
      setAnimationValue,
      datasetValue,
      setDatasetValue,
      monitorValue,
      setMonitorValue,
      heightValue,
      setHeightValue,
      earthServer,
      resetValues,
      layers,
      setDialogHeight,
      dialogHeight,
      setCurrentHeadline,
      setCurrentHeadlineId,
      setDateOfDataShown,
      currentHeadline,
      headlines,
      ...rest
    },
    ref
  ) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [infoData, setInfoData] = useState(null);
    const [forceInfoPage, setForceInfoPage] = useState(false);
    const handleResize = (e, direction, div) => setDialogHeight({ height: div.offsetHeight });
    const [disableBackButton, setDisableBackButton] = useState(false);
    const [disableNextButton, setDisableNextButton] = useState(false);
    const [footerHeading, setFooterHeading] = useState("");
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const mostRecentHeadlines = useMemo(() => {
      const reversed = [...headlines].reverse();
      return reversed.slice(0, MAX_NUMBER_OF_HEADLINES);
    }, [headlines]);

    const isInfoPage = useMemo(() => {
      return tabIndex === INFO_TAB_INDEX || forceInfoPage;
    }, [forceInfoPage, tabIndex]);

    const fireGAEvent = (index = tabIndex) => {
      if (TAB_NAME_BY_TAB_INDEX[index]) {
        fireEvent(MENU_TAB_CHANGE_EVENT_NAME, TAB_NAME_BY_TAB_INDEX[index]);
      }
    };

    const getCurrentHeadlineIndex = () => {
      return currentHeadline ? mostRecentHeadlines.findIndex(headline => headline.id === currentHeadline.id) : null;
    };

    // Checks current headline position to disable back/next buttons
    const checkCurrentHeadline = () => {
      const currentHeadlineIndex = getCurrentHeadlineIndex();

      if (currentHeadline) {
        const type = currentHeadline.type.replace(/([A-Z])/g, " $1");
        const typeHeading = type.charAt(0).toUpperCase() + type.slice(1);
        const text = `${currentHeadlineIndex + 1}/${mostRecentHeadlines.length} ${typeHeading}`;
        setFooterHeading(text);
      }

      // For disabling back button
      if (currentHeadline && currentHeadlineIndex === 0) {
        setDisableBackButton(true);
      } else if (currentHeadline && currentHeadlineIndex === mostRecentHeadlines.length - 1) {
        setDisableNextButton(true);
      } else {
        setDisableBackButton(false);
        setDisableNextButton(false);
      }
    };

    // Handle the headline info panel back button click
    const onBack = () => {
      if (tabIndex === INFO_TAB_INDEX) {
        setTabIndex(DATA_TAB_INDEX);
      }
      setForceInfoPage(false);
      setInfoData(null);

      setCurrentHeadline(null);
      setCurrentHeadlineId(undefined);
      setDateOfDataShown(new Date().toString());
      setDisableBackButton(false);
      setDisableNextButton(false);
    };

    const navigateHeadline = action => {
      const headlineIndex = getCurrentHeadlineIndex();
      let headline = null;

      if (action === "back") {
        headline = mostRecentHeadlines[headlineIndex - 1];
        setCurrentHeadline(headline);
        fireEvent(CLIMATE_ALERT_EVENT_NAME, headline.attributes?.title);
      } else {
        headline = mostRecentHeadlines[headlineIndex + 1];
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
      const isRightSwipe = distance > MIN_SWIPE_DISTANCE;
      const isLeftSwipe = distance < -MIN_SWIPE_DISTANCE;

      if (isLeftSwipe) navigateHeadline("back");
      else navigateHeadline("next");
    };

    useEffect(() => {
      // on mount
      fireGAEvent();

      return () => {
        // on unmount
        if (!isMobile) {
          setCurrentHeadline(null);
          setCurrentHeadlineId(undefined);
        }
      };
    }, [setCurrentHeadline]);

    useEffect(() => {
      checkCurrentHeadline();
    }, [currentHeadline]);

    return (
      <div
        className={classnames(styles["c-home-menu-container"], isClosing && styles["c-home-menu-container--closing"])}
      >
        <ResizablePanel isMobile={isMobile} height={dialogHeight} onResize={handleResize}>
          <div
            className={classnames(
              styles["c-home-menu"],
              isClosing && styles["c-home-menu--closing"],
              isInfoPage && styles["c-home-menu--is-info-page"]
            )}
            {...rest}
          >
            <Tabs
              selectedIndex={tabIndex}
              onSelect={index => {
                setTabIndex(index);

                fireGAEvent(index);
              }}
              className={styles["c-home-menu__tabs"]}
              domRef={el => {
                if (ref) {
                  ref.current = el;
                }
              }}
            >
              <div className={classnames(styles["c-home-menu__header"])}>
                <div className={classnames(styles["c-home-menu__header-content"])}>
                  {!isInfoPage && <h2 className={styles["c-home-menu__header-text"]}>Latest Extreme Events</h2>}
                  {isInfoPage && (
                    <>
                      <button className={styles["c-home-menu__back-button"]} onClick={onBack} aria-label="Back" />
                      {infoData && isMobile && (
                        <h2 className={classnames(styles["c-home-menu__header-text"], "u-text-center")}>
                          {infoData.title}
                        </h2>
                      )}
                    </>
                  )}
                  {onClose && (
                    <button className={styles["c-home-menu__close-button"]} onClick={onClose} aria-label="Close menu" />
                  )}
                </div>
                <TabList className={classnames(styles["c-home-menu__tab-list"], "u-padding-top-xs")}>
                  <Tab
                    className={classnames(styles["c-home-menu__tab"], "u-margin-right-l")}
                    data-testid="tab-1"
                    ref={ref}
                  >
                    Latest Extreme Events
                  </Tab>
                  <Tab className={classnames(styles["c-home-menu__tab"], "u-margin-right-l")} data-testid="tab-2">
                    Data Highlights
                  </Tab>
                  <Tab className={styles["c-home-menu__tab"]} data-testid="tab-3">
                    Advanced Menu
                  </Tab>
                </TabList>
              </div>
              <div className={classnames(styles["c-home-menu__content"], "u-padding-none")}>
                <div className={classnames(styles["c-home-menu__tab-container"])}>
                  <TabPanel className={styles["c-home-menu__tab-panel"]} data-testid="panel-1">
                    <HeadlinePanel onForceInfoPage={() => setForceInfoPage(true)} forceInfoPage={forceInfoPage} />
                  </TabPanel>
                  <TabPanel className={styles["c-home-menu__tab-panel"]} data-testid="panel-2">
                    <DataHighlightsPanel />
                  </TabPanel>
                  <TabPanel className={styles["c-home-menu__tab-panel"]} data-testid="panel-3">
                    <DataPanel
                      currentMode={currentMode}
                      setCurrentMode={setCurrentMode}
                      modes={modes}
                      datasetValue={datasetValue}
                      setDatasetValue={setDatasetValue}
                      monitorValue={monitorValue}
                      heightValue={heightValue}
                      setHeightValue={setHeightValue}
                      setMonitorValue={setMonitorValue}
                      animationValue={animationValue}
                      animationEnabled={animationEnabled}
                      setAnimationValue={setAnimationValue}
                      isMobile={isMobile}
                      layers={layers}
                      // TODO Refactor Data panel to pull from redux instead of passing props from parent.
                    />
                  </TabPanel>
                </div>
                {currentHeadline && (
                  <div
                    className={classnames(styles["c-home-menu__footer"])}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                  >
                    <button
                      className={classnames(styles["c-home-menu__footer-button"], styles["left"])}
                      disabled={disableBackButton}
                      aria-label="Back"
                      onClick={() => navigateHeadline("back")}
                    />
                    <div className={classnames(styles["c-home-menu__footer-info"])}>
                      <h3>{footerHeading}</h3>
                    </div>
                    <button
                      className={classnames(styles["c-home-menu__footer-button"], styles["right"])}
                      disabled={disableNextButton}
                      aria-label="Next"
                      onClick={() => navigateHeadline("next")}
                    />
                  </div>
                )}
              </div>
            </Tabs>
          </div>
        </ResizablePanel>
      </div>
    );
  }
);

Menu.displayName = "Menu";

Menu.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  isClosing: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  layers: PropTypes.array.isRequired,
  animationEnabled: PropTypes.bool.isRequired,
  setCurrentHeadline: PropTypes.func.isRequired,
  setCurrentHeadlineId: PropTypes.func.isRequired,
  setDateOfDataShown: PropTypes.func.isRequired
};

export default Menu;
