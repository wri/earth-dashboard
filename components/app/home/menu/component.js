import { forwardRef, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import classnames from "classnames";
import styles from "./menu.module.scss";
import PropTypes from "prop-types";
import ToggleList from "components/ui/toggle-list";
import ToggleItem from "components/ui/toggle-list/toggle-item";

const Menu = forwardRef(({ isMobile, onClose, isClosing, ...rest }, ref) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [toggleValue, setToggleValue] = useState("wildfires");

  return (
    <div className={classnames(styles["c-home-menu-container"], isClosing && styles["c-home-menu-container--closing"])}>
      <div className={classnames(styles["c-home-menu"], isClosing && styles["c-home-menu--closing"])} {...rest}>
        <div className={classnames(styles["c-home-menu__header"])}>
          <h2 className={styles["c-home-menu__header-text"]}>Understand the emergency</h2>
          {onClose && (
            <button className={styles["c-home-menu__close-button"]} onClick={onClose} aria-label="Close menu" />
          )}
        </div>
        <div className={classnames(styles["c-home-menu__content"], "u-padding-none")}>
          <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)} className={styles["c-home-menu__tabs"]}>
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
            <div className={classnames(styles["c-home-menu__tab-container"])}>
              <TabPanel className={styles["c-home-menu__tab-panel"]} data-testid="panel-1">
                <p className={classnames(styles["c-home-menu__tab-description"])}>What’s Happening</p>
              </TabPanel>
              <TabPanel className={styles["c-home-menu__tab-panel"]} data-testid="panel-2">
                <p className={classnames(styles["c-home-menu__tab-description"])}>Vital Signs</p>
              </TabPanel>
              <TabPanel className={styles["c-home-menu__tab-panel"]} data-testid="panel-3">
                <p className={classnames(styles["c-home-menu__tab-description"])}>
                  Understand more about how the globe is being impacted by other factors that contribute to the climate
                  crisis.
                </p>
                <ToggleList selectedValue={toggleValue} onSelect={index => setToggleValue(index)} title="Templates">
                  <ToggleItem value="wildfires" className="u-margin-right-xxs">
                    Wildfires
                  </ToggleItem>
                  <ToggleItem value="winds" className="u-margin-right-xxs">
                    Winds
                  </ToggleItem>
                  <ToggleItem value="atmosphere" className="u-margin-right-xxs">
                    Atmosphere
                  </ToggleItem>
                  <ToggleItem value="ocean">Ocean</ToggleItem>
                </ToggleList>
              </TabPanel>
            </div>
          </Tabs>
        </div>
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
