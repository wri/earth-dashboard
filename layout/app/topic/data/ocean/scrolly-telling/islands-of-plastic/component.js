import classnames from "classnames";

// components
import OceanCurrentBox from "../ocean-current-box";

// utils
import { MediaContextProvider, Desktop, DesktopLarge, DesktopXLarge, Mobile } from "utils/responsive";

// styles
import styles from "./islands-of-plastic.module.scss";

function IslandsOfPlastic() {
  const getMap = mode => (
    <img
      className={classnames({
        [styles.map]: true,
        [styles[`-${mode}`]]: true
      })}
      src="/static/images/scrolly-telling/ocean/world-map.svg"
    />
  );

  const getCurrentBoxes = mode => (
    <>
      <OceanCurrentBox
        title="North Pacific Gyre"
        direction="north"
        className={classnames({
          [styles["north-pacific-gyre"]]: true,
          [styles[`-${mode}`]]: true
        })}
      />
      <OceanCurrentBox
        title="Indian Ocean Gyre"
        direction="south"
        className={classnames({
          [styles["indian-ocean-gyre"]]: true,
          [styles[`-${mode}`]]: true
        })}
      />
      <OceanCurrentBox
        title="South Pacific Gyre"
        direction="south"
        className={classnames({
          [styles["south-pacific-gyre"]]: true,
          [styles[`-${mode}`]]: true
        })}
      />
      <OceanCurrentBox
        title="North Atlantic Gyre"
        direction="north"
        className={classnames({
          [styles["north-atlantic-gyre"]]: true,
          [styles[`-${mode}`]]: true
        })}
      />
      <OceanCurrentBox
        title="South Atlantic Gyre"
        direction="south"
        className={classnames({
          [styles["south-atlantic-gyre"]]: true,
          [styles[`-${mode}`]]: true
        })}
      />
    </>
  );

  const getMapContainer = mode => (
    <div
      className={classnames({
        [styles["map-container"]]: true,
        [styles[`-${mode}`]]: true
      })}
    >
      {getMap(mode)}
      {getCurrentBoxes(mode)}
    </div>
  );

  return (
    <div className={styles["c-islands-of-plastic"]}>
      <MediaContextProvider>
        <Desktop includeBiggerScreens={false}>{getMapContainer("desktop")}</Desktop>
        <DesktopLarge includeBiggerScreens={false}>{getMapContainer("desktop-large")}</DesktopLarge>
        <DesktopXLarge>{getMapContainer("desktop-x-large")}</DesktopXLarge>
        <Mobile>{getMapContainer("mobile")}</Mobile>
      </MediaContextProvider>
    </div>
  );
}

export default IslandsOfPlastic;
