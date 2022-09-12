import { forwardRef, useState, useEffect, useMemo } from "react";
import classnames from "classnames";
import styles from "./menu.module.scss";
import PropTypes from "prop-types";
import DataIndexPanel from "./panels/data-options";
import DataLayerPanel from "./panels/data-layer";
import MenuLayout from "./layout";
import { fireEvent } from "utils/gtag";
import { MENU_TAB_CHANGE_EVENT_NAME } from "constants/tag-manager";
import ClimateAlerts from "./panels/climate-alerts";
import Event from "components/app/home/event";

const INFO_PAGE_ID = "InfoPage";
const EXTREME_EVENTS_PAGE_ID = "ExtremeEventsPage";
const DATA_LAYER_PAGE_ID = "DataLayerPage";

const INFO_PAGE_HEADLINE = "I'd like to explore";
const EXTREME_EVENTS_PAGE_HEADLINE = "Extreme events";

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
      ...rest
    },
    ref
  ) => {
    const [pageTypeId, setPageTypeId] = useState(INFO_PAGE_ID);
    const pageTitle = useMemo(() => {
      if (pageTypeId == INFO_PAGE_ID) return INFO_PAGE_HEADLINE;
      if (pageTypeId == EXTREME_EVENTS_PAGE_ID) return EXTREME_EVENTS_PAGE_HEADLINE;
      if (pageTypeId == DATA_LAYER_PAGE_ID) return currentMode.attributes.title;
    }, [currentMode, pageTypeId]);

    const navigateTo = pageId => () => {
      setPageTypeId(pageId);
    };

    const clearHeadline = () => {
      setCurrentHeadline(undefined);
      setCurrentHeadlineId(undefined);
    };

    useEffect(() => {
      fireEvent(MENU_TAB_CHANGE_EVENT_NAME, INFO_PAGE_HEADLINE);
    }, [setCurrentHeadline]);

    useEffect(() => {
      if (currentHeadline) {
        setCurrentMode(currentHeadline.attributes.mode);
      }
    }, [currentHeadline, setCurrentMode]);

    return (
      <div
        className={classnames(styles["c-home-menu-container"], isClosing && styles["c-home-menu-container--closing"])}
      >
        {currentHeadline && (
          <MenuLayout
            title={`Back to ${pageTitle}`}
            onBack={clearHeadline}
            onClose={onClose}
            setDialogHeight={setDialogHeight}
          >
            <Event headline={currentHeadline} />
          </MenuLayout>
        )}
        {!currentHeadline && pageTypeId == INFO_PAGE_ID && (
          <MenuLayout iconName="globe" title={pageTitle} onClose={onClose} setDialogHeight={setDialogHeight}>
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
            onBack={navigateTo(INFO_PAGE_ID)}
            onClose={onClose}
            setDialogHeight={setDialogHeight}
          >
            <ClimateAlerts />
          </MenuLayout>
        )}
        {!currentHeadline && pageTypeId == DATA_LAYER_PAGE_ID && (
          <MenuLayout
            title={pageTitle}
            onBack={navigateTo(INFO_PAGE_ID)}
            onClose={onClose}
            setDialogHeight={setDialogHeight}
          >
            <DataLayerPanel onClickExtremeEvents={navigateTo(EXTREME_EVENTS_PAGE_ID)} />
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
