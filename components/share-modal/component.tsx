import React, { SetStateAction } from "react";
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
  console.log(currentHeadline);

  return (
    <DialogPanel onClose={onClose} isMobile shouldAnimate={false}>
      <div className={classnames(styles["c-share-modal"])} aria-labelledby="shareModalTitle">
        {/* Header */}
        <div className={classnames(styles["c-share-modal__header"], "u-text-center")}>
          <h2 id="shareModalTitle" className={classnames(styles["title"], "u-margin-bottom-none")}>
            Share
          </h2>

          {/* Close button */}
          <IconButton
            name="close"
            size={12}
            aria-label="Close Settings"
            // className={styles["c-share-modal__close"]}
            onClick={() => onClose(false)}
            small
          />
        </div>
        {/* Body */}
        <div className={classnames(styles["c-share-modal__body"])}>
          <div className={classnames(styles["scroll"])}>
            {currentHeadline ? <HeadlineCard currentHeadline={currentHeadline} /> : <GlobeCard />}
            <ShareRow text="Share Via FaceBook" icon="facebook" onClick={() => console.log("facebook")} />
            <ShareRow text="Share Via Instagram" icon="instagram" onClick={() => console.log("insta")} />
            <ShareRow text="Copy Link" icon="copy-link" onClick={() => console.log("copy")} />
            <ShareRow text="More Options" icon="more" onClick={() => console.log("more")} />
          </div>
        </div>
      </div>
    </DialogPanel>
  );
};

export default ShareModal;
