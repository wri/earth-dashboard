import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import YouTube from "react-youtube";
import styles from "./tipping-point-modal.module.scss";
import IconButton from "components/ui/icon-button";
import { useEffect, useRef } from "react";

type TippingPointModalProps = {
  isTippingPointOpen: boolean;
  setTippingPointOpen: ActionCreatorWithPayload<any, string>;
};

const TippingPointModal = ({ isTippingPointOpen, setTippingPointOpen }: TippingPointModalProps) => {
  const ref = useRef<YouTube>(null);

  useEffect(() => {
    const player = ref.current?.getInternalPlayer();

    if (!player) return;

    if (isTippingPointOpen) player.playVideo();
    else {
      player.pauseVideo();
    }
  }, [isTippingPointOpen]);

  const handleClose = () => {
    setTippingPointOpen(false);
  };

  if (!isTippingPointOpen) return null;

  return (
    <div className={styles["c-tipping-point-modal"]}>
      <div className={styles["c-tipping-point-modal__header"]}>
        <IconButton
          name="arrow-left"
          onClick={handleClose}
          className={styles["c-tipping-point-modal__header__close"]}
        />

        <p className={styles["c-tipping-point-modal__header__text"]}>BACK TO EARTH HQ</p>
      </div>

      {/* Video */}
      <YouTube
        ref={ref}
        videoId="IPduu1D84PI"
        className={styles["c-tipping-point-modal__video"]}
        iframeClassName={styles["c-tipping-point-modal__iframe"]}
        opts={{
          playerVars: {
            autoplay: 1
          }
        }}
      />
    </div>
  );
};

export default TippingPointModal;
