import PropTypes from "prop-types";
import classnames from "classnames";
import { CopyToClipboard } from "react-copy-to-clipboard";

// utils
import { CLIMATE, FORESTS, FRESHWATER, OCEAN } from "utils/topics";
import { Mobile, Desktop, MediaContextProvider } from "utils/responsive";

// styles
import styles from "./embed-box.module.scss";

function EmbedBox({ url, style, topic }) {
  const isServer = typeof window === "undefined";

  const getContent = (mobile = false) => (
    <div className={styles["main-container"]} style={style}>
      <div
        className={classnames({
          [styles["url-container"]]: true,
          [styles["-mobile"]]: mobile,
          [styles["-desktop"]]: !mobile
        })}
      >
        <input type="text" value={url} disabled />
      </div>
      <CopyToClipboard text={url}>
        <button
          className={classnames({
            "-forests": topic === FORESTS,
            "-ocean": topic === OCEAN,
            "-climate": topic === CLIMATE,
            "-freshwater": topic === FRESHWATER,
            [styles["copy-link-button"]]: true
          })}
        >
          Copy link
        </button>
      </CopyToClipboard>
    </div>
  );

  return (
    <div className={styles["c-embed-box"]}>
      <MediaContextProvider>
        <Desktop>{getContent(false)}</Desktop>
        <Mobile>{getContent(true)}</Mobile>
      </MediaContextProvider>
    </div>
  );
}

EmbedBox.propTypes = {
  url: PropTypes.string.isRequired,
  style: PropTypes.object
};

export default EmbedBox;
