import classnames from "classnames";

// components
import PulsatingItem from "components/ui/pulsating-item";

// utils
import { MediaContextProvider, Mobile, Desktop, DesktopLarge, DesktopXLarge } from "utils/responsive";

// styles
import styles from "./tipping-point-chart.module.scss";

// data
import { TIPPING_POINT_CHART_SVG } from "./data";

function TippingPointChart() {
  const getContent = mode => (
    <div className={styles["chart-container"]}>
      <div
        className={classnames({
          [styles.chart]: true,
          [styles["-desktop"]]: mode === "desktop",
          [styles["-mobile"]]: mode === "mobile",
          [styles["-desktop-large"]]: mode === "desktop-large",
          [styles["-desktop-x-large"]]: mode === "desktop-x-large"
        })}
      >
        {TIPPING_POINT_CHART_SVG}
      </div>
      <div
        className={classnames({
          [styles.marker]: true,
          [styles["-desktop"]]: mode === "desktop",
          [styles["-mobile"]]: mode === "mobile",
          [styles["-desktop-large"]]: mode === "desktop-large",
          [styles["-desktop-x-large"]]: mode === "desktop-x-large"
        })}
      >
        <PulsatingItem level={2} active={true} />
      </div>
    </div>
  );
  return (
    <div className={styles["c-tipping-point-chart"]}>
      <MediaContextProvider>
        <Mobile>{getContent("mobile")}</Mobile>
        <Desktop includeBiggerScreens={false}>{getContent("desktop")}</Desktop>
        <DesktopLarge includeBiggerScreens={false}>{getContent("desktop-large")}</DesktopLarge>
        <DesktopXLarge>{getContent("desktop-x-large")}</DesktopXLarge>
      </MediaContextProvider>
    </div>
  );
}

export default TippingPointChart;
