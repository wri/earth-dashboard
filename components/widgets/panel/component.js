import { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import ReactCardFlip from "react-card-flip";
import ShareModal from "components/share/share-modal";

// components
import WidgetPreview from "components/widgets/preview";

// utils
import { logEvent } from "utils/gtag";

// styles
import styles from "./widget-panel.module.scss";
import useWidget from "hooks/useWidget";

function WidgetPanel({ widget, topic, widgetShouldBeLoaded }) {
  const widgetData = useWidget(widget, widgetShouldBeLoaded);

  const { loading, data } = widgetData;
  const [flipCardOpen, setFlipCardOpen] = useState(false);
  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);
  const description = data?.description;
  const metadata = data?.metadata && data.metadata[0];
  const caption = metadata?.info?.caption;
  const widgetLinks = metadata?.info?.widgetLinks;
  const isMap = data?.widgetConfig?.paramsConfig?.visualizationType === "map";
  const isServer = typeof window === "undefined";

  const urlWithoutHash = !isServer && window.location.href.split("#")[0];
  const shareModalURL = !isServer && `${urlWithoutHash}#${data?.id}`;
  const commontRWEmbedURL = "https://resourcewatch.org/embed";
  const shareEmbedURL = `${commontRWEmbedURL}/${isMap ? "map" : "widget"}/${data?.id}`;
  const embedTag = `<iframe src="${shareEmbedURL}" width="100%" height="500px" frameBorder="0" />`;

  return (
    <div className={styles["c-widget-panel"]} id={widget?.id}>
      <div className={styles["panel-title"]}>
        <span className={styles.title}>{data?.name}</span>
        <div className={styles["panel-actions"]}>
          <button
            className={styles["share-button"]}
            onClick={() => {
              setShareModalIsOpen(true);
              logEvent({
                action: "Share widget",
                category: "Shares",
                label: `Widget ${widget?.id}`
              });
            }}
          />
          {!flipCardOpen && <button className={styles["info-button"]} onClick={() => setFlipCardOpen(true)} />}
          {flipCardOpen && <button className={styles["close-button"]} onClick={() => setFlipCardOpen(false)} />}
        </div>
      </div>
      <ReactCardFlip
        isFlipped={flipCardOpen}
        flipDirection="horizontal"
        containerStyle={{
          display: "flex",
          width: "100%",
          height: "100%"
        }}
      >
        <div
          className={classnames({
            [styles["widget-preview-container"]]: true,
            [styles["-chart"]]: !isMap
          })}
        >
          {!loading && !isServer && <WidgetPreview widget={data} />}
        </div>
        <div className={styles["info-container"]}>
          {description && (
            <div>
              <h5>Description</h5>
              <p>{description}</p>
            </div>
          )}
          {widgetLinks && (
            <div>
              <h5>Links</h5>
              <ul>
                {widgetLinks.map(link => (
                  <li key={`widget-link-${link.name}`}>
                    <a className={`external-link -${topic}`} href={link.link} target="_blank" rel="noreferrer">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {caption && <div className={styles.caption}>{caption}</div>}
        </div>
      </ReactCardFlip>
      <ShareModal
        topic={topic}
        url={shareModalURL}
        embedTag={embedTag}
        onClose={() => setShareModalIsOpen(false)}
        isOpen={shareModalIsOpen}
      />
      <div className={styles["powered-by"]}>
        powered by{" "}
        <a
          href="https://resourcewatch.org/"
          target="_blank"
          onClick={() =>
            logEvent({
              action: "click",
              category: "Outbound traffic - ResourceWatch",
              label: window.location.href
            })
          }
          rel="noreferrer"
        >
          RESOURCEWATCH
        </a>
      </div>
    </div>
  );
}

WidgetPanel.propTypes = {
  widget: PropTypes.object.isRequired,
  widgetShouldBeLoaded: PropTypes.bool
};

WidgetPanel.defaultProps = {
  widgetShouldBeLoaded: false
};

export default WidgetPanel;
