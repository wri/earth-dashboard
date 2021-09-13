import { forwardRef, useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import classnames from "classnames";
import styles from "./menu.module.scss";
import PropTypes from "prop-types";
import DataPanel from "./panels/data";
import { fetchTemplates } from "services/gca";
import { DATA_LAYER_MAP } from "constants/datalayers";

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
  ({
    isMobile,
    onClose,
    isClosing,
    templates,
    setTemplates,
    currentTemplate,
    setCurrentTemplate,
    animationValue,
    setAnimationValue,
    datasetValue,
    setDatasetValue,
    monitorValue,
    setMonitorValue,
    earthServer,
    ...rest
  }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [infoData, setInfoData] = useState(null);
    const [isFetchingTemplates, setIsFetchingTemplates] = useState(true);

    const onBack = () => {
      setTabIndex(DATA_TAB_INDEX);
      setInfoData(null);
    };

    const onSelectInfo = key => {
      setTabIndex(INFO_TAB_INDEX);
      setInfoData(INFO_DATA[key]);
    };

    useEffect(() => {
      setIsFetchingTemplates(true);
      const getTemplates = async () => {
        try {
          const resp = await fetchTemplates();
          setTemplates(resp.data.data);
        } catch (err) {
          console.log("Error fetching templates");
        } finally {
          setIsFetchingTemplates(false);
        }
      };

      getTemplates();
    }, [setTemplates]);

    useEffect(() => {
      if (earthServer) {
        const animation = DATA_LAYER_MAP[animationValue] || { animation_enabled: false };
        const monitor = DATA_LAYER_MAP[monitorValue] || { annotation_type: "none" };
        const dataset = DATA_LAYER_MAP[datasetValue] || { overlay_type: "none", z_level: "surface" };

        earthServer.saveState({ ...animation, ...monitor, ...dataset });
      }
    }, [animationValue, datasetValue, monitorValue, earthServer]);

    return (
      <div
        className={classnames(styles["c-home-menu-container"], isClosing && styles["c-home-menu-container--closing"])}
      >
        <div
          className={classnames(
            styles["c-home-menu"],
            isClosing && styles["c-home-menu--closing"],
            tabIndex === INFO_TAB_INDEX && styles["c-home-menu--is-info-page"]
          )}
          {...rest}
        >
          <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)} className={styles["c-home-menu__tabs"]}>
            <div className={classnames(styles["c-home-menu__header"])}>
              <div className={classnames(styles["c-home-menu__header-content"])}>
                {tabIndex !== INFO_TAB_INDEX && (
                  <h2 className={styles["c-home-menu__header-text"]}>Understand the emergency</h2>
                )}
                {tabIndex === INFO_TAB_INDEX && (
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
                <Tab className={classnames(styles["c-home-menu__tab"], "u-margin-right-l")} data-testid="tab-1">
                  What’s Happening
                </Tab>
                <Tab className={classnames(styles["c-home-menu__tab"], "u-margin-right-l")} data-testid="tab-2">
                  Vital Signs
                </Tab>
                <Tab className={styles["c-home-menu__tab"]} data-testid="tab-3" disabled={isFetchingTemplates}>
                  Dive Into The Data
                </Tab>
                <Tab className="u-display-none" data-testid="tab-4">
                  Info
                </Tab>
              </TabList>
            </div>
            <div className={classnames(styles["c-home-menu__content"], "u-padding-none")}>
              <div className={classnames(styles["c-home-menu__tab-container"])}>
                <TabPanel className={styles["c-home-menu__tab-panel"]} data-testid="panel-1">
                  <p className={classnames(styles["c-home-menu__tab-description"], "u-margin-none")}>
                    What’s Happening
                  </p>
                </TabPanel>
                <TabPanel className={styles["c-home-menu__tab-panel"]} data-testid="panel-2">
                  <p className={classnames(styles["c-home-menu__tab-description"], "u-margin-none")}>Vital Signs</p>
                </TabPanel>
                <TabPanel className={styles["c-home-menu__tab-panel"]} data-testid="panel-3">
                  <DataPanel
                    currentTemplate={currentTemplate}
                    setCurrentTemplate={setCurrentTemplate}
                    templates={templates}
                    datasetValue={datasetValue}
                    setDatasetValue={setDatasetValue}
                    monitorValue={monitorValue}
                    setMonitorValue={setMonitorValue}
                    animationValue={animationValue}
                    setAnimationValue={setAnimationValue}
                    isMobile={isMobile}
                    onSelectInfo={onSelectInfo}
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
  onClose: PropTypes.func
};

export default Menu;
