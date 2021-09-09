import { forwardRef, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import classnames from "classnames";
import styles from "./menu.module.scss";
import PropTypes from "prop-types";
import DataPanel from "./panels/data";

const Menu = forwardRef(({ isMobile, onClose, isClosing, ...rest }, ref) => {
  const [tabIndex, setTabIndex] = useState(0);
  // TODO: Redux
  const [templateValue, setTemplateValue] = useState("wildfires");
  const [datasetValue, setDatasetValue] = useState(["part_mat"]);
  const [monitorValue, setMonitorValue] = useState(["fires"]);
  const [animationValue, setAnimationValue] = useState(["wind"]);

  return (
    <div className={classnames(styles["c-home-menu-container"], isClosing && styles["c-home-menu-container--closing"])}>
      <div className={classnames(styles["c-home-menu"], isClosing && styles["c-home-menu--closing"])} {...rest}>
        <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)} className={styles["c-home-menu__tabs"]}>
          <div className={classnames(styles["c-home-menu__header"])}>
            <div className={classnames(styles["c-home-menu__header-content"])}>
              <h2 className={styles["c-home-menu__header-text"]}>Understand the emergency</h2>
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
              <Tab className={styles["c-home-menu__tab"]} data-testid="tab-3">
                Dive Into The Data
              </Tab>
            </TabList>
          </div>
          <div className={classnames(styles["c-home-menu__content"], "u-padding-none")}>
            <div className={classnames(styles["c-home-menu__tab-container"])}>
              <TabPanel className={styles["c-home-menu__tab-panel"]} data-testid="panel-1">
                <p className={classnames(styles["c-home-menu__tab-description"], "u-margin-none")}>What’s Happening</p>
              </TabPanel>
              <TabPanel className={styles["c-home-menu__tab-panel"]} data-testid="panel-2">
                <p className={classnames(styles["c-home-menu__tab-description"], "u-margin-none")}>Vital Signs</p>
              </TabPanel>
              <TabPanel className={styles["c-home-menu__tab-panel"]} data-testid="panel-3">
                <DataPanel
                  templateValue={templateValue}
                  setTemplateValue={setTemplateValue}
                  datasetValue={datasetValue}
                  setDatasetValue={setDatasetValue}
                  monitorValue={monitorValue}
                  setMonitorValue={setMonitorValue}
                  animationValue={animationValue}
                  setAnimationValue={setAnimationValue}
                  isMobile={isMobile}
                />
              </TabPanel>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
});

Menu.displayName = "Menu";

Menu.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  isClosing: PropTypes.bool.isRequired,
  onClose: PropTypes.func
};

export default Menu;
