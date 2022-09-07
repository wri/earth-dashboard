import React, { SetStateAction, useState } from "react";
import DialogPanel from "components/app/home/dialog-panel";
import classnames from "classnames";
import styles from "./share-modal.module.scss";
import IconButton from "components/ui/icon-button";
import ShareRow from "./share-row";
import { Headline } from "slices/headlines";
import GlobeCard from "./globe-card";
import HeadlineCard from "./headline-card/component";

type ShareModalProps = {
  onClose: React.Dispatch<SetStateAction<boolean>>;
  currentHeadline?: Headline;
};

const ShareModal = ({ onClose, currentHeadline }: ShareModalProps) => {
  const [copiedLinkTimeout, setCopiedLinkTimeout] = useState<boolean>(false);

  // Opens facebook share page
  const handleFaceBookPress = () => {
    const link = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${link}`, "_blank");
  };

  // Copies the link to the clipboard
  const handleCopyPress = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    setCopiedLinkTimeout(true);
    setTimeout(() => setCopiedLinkTimeout(false), 1000);
  };

  const handleInstagramPress = () => {
    console.log("instagram");
  };

  // Opens native share method
  const handleMorePress = async () => {
    const link = window.location.href;
    try {
      await navigator.share({ title: "Earth HQ", url: link });
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  return (
    <DialogPanel onClose={onClose} isMobile shouldAnimate={false}>
      <div className={classnames(styles["c-share-modal"])} aria-labelledby="shareModalTitle">
        {/* Header */}
        <div className={classnames(styles["c-share-modal__header"], "u-text-center")}>
          <h2 id="shareModalTitle" className={classnames(styles["title"], "u-margin-bottom-none")}>
            Share
          </h2>

          {/* Close button */}
          <IconButton name="close" size={12} aria-label="Close Settings" onClick={() => onClose(false)} small />
        </div>
        {/* Body */}
        <div className={classnames(styles["c-share-modal__body"])}>
          <div className={classnames(styles["scroll"])}>
            {currentHeadline ? <HeadlineCard currentHeadline={currentHeadline} /> : <GlobeCard />}
            <ShareRow text="Share Via FaceBook" icon="facebook" onClick={handleFaceBookPress} />
            <ShareRow text="Share Via Instagram" icon="instagram" onClick={handleInstagramPress} />
            <ShareRow
              text={copiedLinkTimeout ? "Copied Link ..." : "Copy Link"}
              icon="copy-link"
              onClick={handleCopyPress}
            />
            {
              // @ts-expect-error
              navigator.share && <ShareRow text={"More Options"} icon="more" onClick={handleMorePress} />
            }
          </div>
        </div>
      </div>
    </DialogPanel>
  );
};

export default ShareModal;
