import { forwardRef, useState, useEffect, useMemo } from "react";
import classnames from "classnames";
import styles from "./menu.module.scss";
import PropTypes from "prop-types";
import DataIndexPanel from "./panels/data-options";
import DataLayerPanel from "./panels/data-layer";
import ResizablePanel from "components/app/home/dialog-panel/resizable-panel";
import { fireEvent } from "utils/gtag";
import { MENU_TAB_CHANGE_EVENT_NAME } from "constants/tag-manager";
import ClimateAlerts from "./panels/climate-alerts";
import headline from "../headline";

const INFO_PAGE_ID = "InfoPage";
const EXTREME_EVENTS_PAGE_ID = "ExtremeEventsPage";
const DATA_LAYER_PAGE_ID = "DataLayerPage";

const INFO_PAGE_HEADLINE = "I'd like to explore";
const EXTREME_EVENTS_PAGE_HEADLINE = "Extreme events";

const PAGE_TYPES = [
  {
    id: INFO_PAGE_ID,
    getTitle: () => INFO_PAGE_HEADLINE,
    Component: function DataIndex({ setActiveDataLayer, showExtremeEvents }) {
      return <DataIndexPanel onClickDataLayer={setActiveDataLayer} onClickExtremeEvents={showExtremeEvents} />;
    },
    matchDefault: (currentMode, headline) => !currentMode && !headline,
    menuStyles: [styles["c-home-menu--is-info-page"]],
    showBackButton: false
  },
  {
    id: EXTREME_EVENTS_PAGE_ID,
    getTitle: () => EXTREME_EVENTS_PAGE_HEADLINE,
    Component: function ExtremeEvents({}) {
      return <ClimateAlerts />;
    },
    matchDefault: () => false,
    menuStyles: [],
    showBackButton: true
  },
  {
    id: DATA_LAYER_PAGE_ID,
    getTitle: currentMode => currentMode.attributes.title,
    Component: function DataLayer({}) {
      return <DataLayerPanel />;
    },
    matchDefault: currentMode => !!currentMode,
    menuStyles: [],
    showBackButton: true
  }
];

const getPageType = pageTypeId => PAGE_TYPES.find(p => p.id === pageTypeId);

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
      setHeadlines,
      setCurrentHeadline,
      setCurrentHeadlineId,
      setDateOfDataShown,
      ...rest
    },
    ref
  ) => {
    const [pageType, setPageType] = useState(
      PAGE_TYPES.find(p => p.matchDefault(currentMode, headline)) || PAGE_TYPES[0]
    );
    const handleResize = (e, direction, div) => setDialogHeight({ height: div.offsetHeight });

    const showExtremeEvents = () => {
      setPageType(getPageType(EXTREME_EVENTS_PAGE_ID));
    };

    // Handle the headline info panel back button click
    const onBack = () => {
      setCurrentMode(undefined);
      setHeadlines([]);
      setPageType(getPageType(INFO_PAGE_ID));
    };

    const setActiveDataLayer = selectedMode => {
      setCurrentMode(selectedMode);
      setPageType(getPageType(DATA_LAYER_PAGE_ID));
    };

    useEffect(() => {
      fireEvent(MENU_TAB_CHANGE_EVENT_NAME, INFO_PAGE_HEADLINE);
    }, [setCurrentHeadline]);

    return (
      <div
        className={classnames(styles["c-home-menu-container"], isClosing && styles["c-home-menu-container--closing"])}
      >
        <ResizablePanel isMobile={isMobile} height={dialogHeight} onResize={handleResize}>
          <div
            className={classnames(
              styles["c-home-menu"],
              isClosing && styles["c-home-menu--closing"],
              ...pageType.menuStyles
            )}
            {...rest}
          >
            <div className={classnames(styles["c-home-menu__header"])}>
              <div className={classnames(styles["c-home-menu__header-content"])}>
                {!pageType.showBackButton && (
                  <button className={styles["c-home-menu__back-button"]} onClick={onBack} aria-label="Back" />
                )}
                <h2 className={styles["c-home-menu__header-text"]}>{pageType.getTitle(currentMode)}</h2>
                {onClose && (
                  <button className={styles["c-home-menu__close-button"]} onClick={onClose} aria-label="Close" />
                )}
              </div>
            </div>
            <div className={classnames(styles["c-home-menu__content"], "u-padding-none")}>
              {pageType.Component({ setActiveDataLayer, showExtremeEvents })}
            </div>
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
