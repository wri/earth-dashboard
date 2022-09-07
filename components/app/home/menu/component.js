import { forwardRef, useState, useEffect, useMemo } from "react";
import classnames from "classnames";
import styles from "./menu.module.scss";
import PropTypes from "prop-types";
import DataIndexPanel from "./panels/data-options";
import DataLayerPanel from "./panels/data-layer";
import MenuLayout from "./layout";
import { fireEvent } from "utils/gtag";
import { MENU_TAB_CHANGE_EVENT_NAME, CLIMATE_ALERT_EVENT_NAME } from "constants/tag-manager";
import ClimateAlerts from "./panels/climate-alerts";
import Headline from "../headline";
import HeadlineFooter from "../headline-footer";

const INFO_PAGE_ID = "InfoPage";
const EXTREME_EVENTS_PAGE_ID = "ExtremeEventsPage";
const DATA_LAYER_PAGE_ID = "DataLayerPage";

const INFO_PAGE_HEADLINE = "I'd like to explore";
const EXTREME_EVENTS_PAGE_HEADLINE = "Extreme events";

const MAX_NUMBER_OF_HEADLINES = 10;
const MIN_SWIPE_DISTANCE = 50;

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
      currentHeadline,
      setHeadlines,
      setCurrentHeadline,
      setCurrentHeadlineId,
      setDateOfDataShown,
      headlines,
      ...rest
    },
    ref
  ) => {
    const [pageTypeId, setPageTypeId] = useState(INFO_PAGE_ID);
    const [disableBackButton, setDisableBackButton] = useState(false);
    const [disableNextButton, setDisableNextButton] = useState(false);
    const [footerHeading, setFooterHeading] = useState("");
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const mostRecentHeadlines = useMemo(() => {
      const reversed = [...headlines].reverse();
      return reversed.slice(0, MAX_NUMBER_OF_HEADLINES);
    }, [headlines]);

    const showExtremeEvents = () => {
      setPageTypeId(EXTREME_EVENTS_PAGE_ID);
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
      setCurrentMode(undefined);
      setHeadlines([]);
      setPageTypeId(INFO_PAGE_ID);
      setDisableBackButton(false);
      setDisableNextButton(false);
    };

    const clearHeadline = () => {
      setCurrentHeadline(undefined);
      setCurrentHeadlineId(undefined);
    };

    const setActiveDataLayer = selectedMode => {
      setCurrentMode(selectedMode);
      setPageTypeId(DATA_LAYER_PAGE_ID);
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
      fireEvent(MENU_TAB_CHANGE_EVENT_NAME, INFO_PAGE_HEADLINE);
    }, [setCurrentHeadline]);

    useEffect(() => {
      checkCurrentHeadline();
    }, [currentHeadline]);

    return (
      <div
        className={classnames(styles["c-home-menu-container"], isClosing && styles["c-home-menu-container--closing"])}
      >
        {currentHeadline && (
          <MenuLayout
            title={currentHeadline.title}
            onBack={clearHeadline}
            onClose={onClose}
            setDialogHeight={setDialogHeight}
          >
            <Headline headline={currentHeadline} />
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
          <MenuLayout title={INFO_PAGE_HEADLINE} onClose={onClose} setDialogHeight={setDialogHeight}>
            <DataIndexPanel onClickDataLayer={setActiveDataLayer} onClickExtremeEvents={showExtremeEvents} />
          </MenuLayout>
        )}
        {!currentHeadline && pageTypeId == EXTREME_EVENTS_PAGE_ID && (
          <MenuLayout
            title={EXTREME_EVENTS_PAGE_HEADLINE}
            onBack={onBack}
            onClose={onClose}
            setDialogHeight={setDialogHeight}
          >
            <ClimateAlerts />
          </MenuLayout>
        )}
        {!currentHeadline && pageTypeId == DATA_LAYER_PAGE_ID && (
          <MenuLayout
            title={currentMode.attributes.title}
            onBack={onBack}
            onClose={onClose}
            setDialogHeight={setDialogHeight}
          >
            <DataLayerPanel />
          </MenuLayout>
        )}
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
