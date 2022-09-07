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
import Headline from "../headline";

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

    const showExtremeEvents = () => {
      setPageTypeId(EXTREME_EVENTS_PAGE_ID);
    };

    // Handle the headline info panel back button click
    const onBack = () => {
      setCurrentMode(undefined);
      setHeadlines([]);
      setPageTypeId(INFO_PAGE_ID);
    };

    const clearHeadline = () => {
      setCurrentHeadline(undefined);
      setCurrentHeadlineId(undefined);
    };

    const setActiveDataLayer = selectedMode => {
      setCurrentMode(selectedMode);
      setPageTypeId(DATA_LAYER_PAGE_ID);
    };

    useEffect(() => {
      fireEvent(MENU_TAB_CHANGE_EVENT_NAME, INFO_PAGE_HEADLINE);
    }, [setCurrentHeadline]);

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
