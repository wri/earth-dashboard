import { useState } from "react";
import DialogPanel from "components/app/home/dialog-panel";
import classnames from "classnames";
import styles from "./share-modal.module.scss";
import IconButton from "components/ui/icon-button";
import ShareRow from "./share-row";
import { Headline } from "slices/headlines";
import GlobeCard from "./globe-card";
import HeadlineCard from "./headline-card/component";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import useDialogPanel from "hooks/useDialogPanel";
import { fireEvent } from "utils/gtag";
import { MAP_SHARE, SHARE_EXTREME_EVENT } from "constants/tag-manager";
import { useRouter } from "next/router";
import { PAGE_TYPE_ID } from "components/app/home/main-container/component";

type ShareModalProps = {
  isMobile: boolean;
  isShareOpen: boolean;
  setIsShareOpen: ActionCreatorWithPayload<boolean, string>;
  pageTypeId: string;
  currentHeadline?: Headline;
};

const ShareModal = ({ isMobile, isShareOpen, setIsShareOpen, currentHeadline, pageTypeId }: ShareModalProps) => {
  const [copiedLinkTimeout, setCopiedLinkTimeout] = useState<boolean>(false);

  const { shouldAnimate, handleClose } = useDialogPanel(isShareOpen, () => {
    setIsShareOpen(false);
  });

  const router = useRouter();
  const isExplore = router.pathname === "/explore" && pageTypeId === PAGE_TYPE_ID.DATA_LAYER_PAGE;

  // Opens facebook share page
  const handleFaceBookPress = () => {
    const link = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`, "_blank");
    fireEvent(isExplore ? MAP_SHARE : SHARE_EXTREME_EVENT, null, {
      sharing_option: "facebook",
      ...(isExplore
        ? {
            event_title: currentHeadline?.attributes.title
          }
        : {})
    });
  };

  // Copies the link to the clipboard
  const handleCopyPress = () => {
    const { origin, search } = window.location;
    const shareType =
      pageTypeId === PAGE_TYPE_ID.CURRENT_EVENT_PAGE
        ? "event"
        : pageTypeId === PAGE_TYPE_ID.DATA_LAYER_PAGE
        ? "layer"
        : undefined;
    navigator.clipboard.writeText(
      `${origin}${pageTypeId === PAGE_TYPE_ID.CURRENT_EVENT_PAGE ? "/" : "/explore"}${search}&share=${shareType}`
    );

    setCopiedLinkTimeout(true);
    setTimeout(() => setCopiedLinkTimeout(false), 1000);
    fireEvent(isExplore ? MAP_SHARE : SHARE_EXTREME_EVENT, null, {
      sharing_option: "copy_link",
      ...(isExplore
        ? {
            event_title: currentHeadline?.attributes.title
          }
        : {})
    });
  };

  // Opens twitter share page
  const handleTwitterPress = () => {
    const link = window.location.href;
    window.open(`https://twitter.com/share?url=${encodeURIComponent(link)}`, "_blank");
    fireEvent(isExplore ? MAP_SHARE : SHARE_EXTREME_EVENT, null, {
      sharing_option: "twitter",
      ...(isExplore
        ? {
            event_title: currentHeadline?.attributes.title
          }
        : {})
    });
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

  if (!isShareOpen) return null;
  return (
    <DialogPanel onClose={handleClose} isMobile={isMobile} shouldAnimate={shouldAnimate}>
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
            aria-label="Close Share"
            className={styles["c-share-modal__close"]}
            onClick={handleClose}
            small
          />
        </div>

        {/* Body */}
        <div className={classnames(styles["c-share-modal__body"])}>
          <div className={classnames(styles["scroll"])}>
            {currentHeadline ? <HeadlineCard currentHeadline={currentHeadline} /> : <GlobeCard />}
            <ShareRow text="Share Via FaceBook" icon="facebook" onClick={handleFaceBookPress} />
            <ShareRow text="Share Via Twitter" icon="twitter" onClick={handleTwitterPress} />
            <ShareRow
              text={copiedLinkTimeout ? "Copied Link ..." : "Copy Link"}
              icon="copy-link"
              onClick={handleCopyPress}
            />
            {
              // @ts-expect-error : it thinks navigator.share is always undefined
              navigator.share && <ShareRow text={"More Options"} icon="more" onClick={handleMorePress} />
            }
          </div>
        </div>
      </div>
    </DialogPanel>
  );
};

export default ShareModal;
