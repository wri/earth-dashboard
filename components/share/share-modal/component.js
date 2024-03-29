import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Modal from "react-modal";

// components
import ShareBox from "../share-box";
import EmbedBox from "../embed-box";

// utils
import { getColorByTopic } from "utils/topics";
import { Mobile, Desktop, MediaContextProvider } from "utils/responsive";

// styles
import styles from "./share-modal.module.scss";

function ShareModal({ topic, onClose, url, embedTag, isOpen, showEmbed }) {
  const [isOpenFlag, setIsOpenFlag] = useState(isOpen);

  useEffect(() => {
    setIsOpenFlag(isOpen);
  }, [isOpen]);

  const modalCustomStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    },
    overlay: { zIndex: 1000 }
  };

  const getContent = (mobile = false) => (
    <div
      className={classnames({
        [styles["main-container"]]: true,
        [styles["-mobile"]]: mobile,
        [styles["-desktop"]]: !mobile
      })}
    >
      <h2 style={{ color: getColorByTopic(topic) }}>Share</h2>
      <h5>Public url to share</h5>
      <ShareBox url={url} topic={topic} />
      {showEmbed && (
        <>
          <h5 className={styles["embed-title"]}>Code to embed</h5>
          <EmbedBox url={embedTag} topic={topic} />
        </>
      )}
      <button className={styles["close-button"]} onClick={() => onClose()} />
    </div>
  );

  return (
    <Modal
      isOpen={isOpenFlag}
      onRequestClose={() => {
        setIsOpenFlag(false);
        onClose();
      }}
      style={modalCustomStyles}
    >
      <div className={styles["c-share-modal"]}>
        <MediaContextProvider>
          <Desktop>{getContent(false)}</Desktop>
          <Mobile>{getContent(true)}</Mobile>
        </MediaContextProvider>
      </div>
    </Modal>
  );
}

ShareModal.propTypes = {
  topic: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  embedTag: PropTypes.string.isRequired,
  showEmbed: PropTypes.bool,
  isOpen: PropTypes.bool
};

ShareModal.defaultProps = {
  isOpen: false,
  showEmbed: true
};

export default ShareModal;
