import { forwardRef, useState, useMemo } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import classnames from "classnames";
import styles from "./menu.module.scss";
import PropTypes from "prop-types";
import DataPanel from "./panels/data";
import HeadlinePanel from "./panels/headlines";

const INFO_DATA = {
  dataset: {
    title: "Dataset",
    description: `Datasets show another dimension of data using color. Some overlays are valid at a specific height while others are valid for the entire thickness of the atmosphere

    Wind	- wind speed at specified height
    Temp	- temperature at specified height
    RH	- relative humidity at specified height`
  },
  monitor: {
    title: "Monitor",
    description: "Lorem Ipsum"
  },
  animation: {
    title: "Animation",
    description: "Lorem Ipsum"
  }
};

const INFO_TAB_INDEX = 3;
const DATA_TAB_INDEX = 2;

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
      earthServer,
      resetValues,
      layers,
      ...rest
    },
    ref
  ) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [infoData, setInfoData] = useState(null);
    const [forceInfoPage, setForceInfoPage] = useState(false);
    const isInfoPage = useMemo(() => {
      return tabIndex === INFO_TAB_INDEX || forceInfoPage;
    }, [forceInfoPage, tabIndex]);

    const onBack = () => {
      if (tabIndex === INFO_TAB_INDEX) {
        setTabIndex(DATA_TAB_INDEX);
      }
      setForceInfoPage(false);
      setInfoData(null);
    };

    const onSelectInfo = key => {
      setTabIndex(INFO_TAB_INDEX);
      setInfoData(INFO_DATA[key]);
    };

    return (
      <div
        className={classnames(styles["c-home-menu-container"], isClosing && styles["c-home-menu-container--closing"])}
      >
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
            onSelect={index => setTabIndex(index)}
            className={styles["c-home-menu__tabs"]}
            domRef={el => {
              if (ref) {
                ref.current = el;
              }
            }}
          >
            <div className={classnames(styles["c-home-menu__header"])}>
              <div className={classnames(styles["c-home-menu__header-content"])}>
                {!isInfoPage && <h2 className={styles["c-home-menu__header-text"]}>Understand the emergency</h2>}
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
                  Climate Alerts
                </Tab>
                <Tab className={classnames(styles["c-home-menu__tab"], "u-margin-right-l")} data-testid="tab-2">
                  Data Highlights
                </Tab>
                <Tab className={styles["c-home-menu__tab"]} data-testid="tab-3">
                  Advanced Menu
                </Tab>
                <Tab className="u-display-none" data-testid="tab-4">
                  Info
                </Tab>
              </TabList>
            </div>
            <div className={classnames(styles["c-home-menu__content"], "u-padding-none")}>
              <div className={classnames(styles["c-home-menu__tab-container"])}>
                <TabPanel className={styles["c-home-menu__tab-panel"]} data-testid="panel-1">
                  <HeadlinePanel onForceInfoPage={() => setForceInfoPage(true)} forceInfoPage={forceInfoPage} />
                </TabPanel>
                <TabPanel className={styles["c-home-menu__tab-panel"]} data-testid="panel-2">
                  <p className={classnames(styles["c-home-menu__tab-description"], "u-margin-none")}>Vital Signs</p>
                </TabPanel>
                <TabPanel className={styles["c-home-menu__tab-panel"]} data-testid="panel-3">
                  <DataPanel
                    currentMode={currentMode}
                    setCurrentMode={setCurrentMode}
                    modes={modes}
                    datasetValue={datasetValue}
                    setDatasetValue={setDatasetValue}
                    monitorValue={monitorValue}
                    setMonitorValue={setMonitorValue}
                    animationValue={animationValue}
                    animationEnabled={animationEnabled}
                    setAnimationValue={setAnimationValue}
                    isMobile={isMobile}
                    onSelectInfo={onSelectInfo}
                    layers={layers}
                    // TODO Refactor Data panel to pull from redux instead of passing props from parent.
                  />
                </TabPanel>
                <TabPanel>
                  {infoData && (
                    <>
                      {!isMobile && <h2 className={styles["c-home-menu__info-title"]}>{infoData.title}</h2>}
                      <p className="u-text-pre-line">{infoData.description}</p>
                    </>
                  )}
                </TabPanel>
              </div>
            </div>
          </Tabs>
        </div>
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
  animationEnabled: PropTypes.bool.isRequired
};

export default Menu;
