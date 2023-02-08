import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import Image from "next/image";
import YouTube from "react-youtube";
import { Desktop, Mobile } from "utils/responsive";
import styles from "./tipping-point-modal.module.scss";
import nullSchoolLogoDesktop from "public/static/images/logo-earth-hq.svg";
import nullSchoolLogoMobile from "public/static/images/logo-earth-hq-mobile.svg";
import IconButton from "components/ui/icon-button";

type TippingPointModalProps = {
  isTippingPointOpen: boolean;
  setTippingPointOpen: ActionCreatorWithPayload<any, string>;
};

const TippingPointModal = ({ isTippingPointOpen, setTippingPointOpen }: TippingPointModalProps) => {
  const handleClose = () => {
    setTippingPointOpen(false);
  };

  if (!isTippingPointOpen) return null;

  return (
    <div className={styles["c-tipping-point-modal"]}>
      <div className={styles["c-tipping-point-modal__header"]}>
        <Desktop>
          <Image src={nullSchoolLogoDesktop} alt="GCA Earth HQ" />
        </Desktop>
        <Mobile>
          <div className={styles["c-tipping-point-modal__header__img"]}>
            <Image src={nullSchoolLogoMobile} alt="GCA Earth HQ" layout="fill" />
          </div>
        </Mobile>

        <IconButton name="close" onClick={handleClose} className={styles["c-tipping-point-modal__header__close"]} />
      </div>

      {/* Video */}
      <YouTube
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
