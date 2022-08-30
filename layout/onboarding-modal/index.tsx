/* eslint-disable @next/next/no-img-element */
import classnames from "classnames";
import styles from "./onboarding-modal.module.scss";
import { useRouter } from "next/router";
import IconButton from "components/ui/icon-button";
import Icon from "components/ui/Icon";
import mypic from "public/static/images/star-background.jpg";
import Image from "next/image";
import { useState } from "react";
import { data } from "./onboarding";

const OnboardingModal = ({ showModal, setShowModal }: any) => {
  const [counter, setCounter] = useState(0);
  const router = useRouter();

  return (
    <div className={styles["modal-backdrop"]}>
      <div className={styles["modal"]}>
        <div className={styles["modal-top"]}>
          <Image layout="fill" objectFit="cover" src={mypic.src} alt="hello" />
          <div className={styles["contain"]}>
            <div className={styles["modal-header"]}>
              <div className={styles["modal-logo"]}>
                <Icon name="earth-hq" size={32} type="decorative" className={styles["earth-hq"]} />
                <h3 className={styles["modal-title"]}>WELCOME TO EARTH HQ</h3>
              </div>
              <IconButton name="close" className={styles["close-button"]} onClick={() => setShowModal(false)} />
            </div>
            <div className={styles["image-container"]}>
              <img
                // width={data[counter].width}
                // height={data[counter].height}
                src={data[counter].url}
                // layout="fill"
                // objectFit="cover"
                alt="hello"
                className={styles["modal-main-image"]}
              />
            </div>
          </div>
        </div>
        <div className={styles["modal-main-content"]}>
          <h4 className={styles["text"]}>
            The effects of human-induced climate change can be seen and felt across the planet.
          </h4>
          <div className={styles["controls"]}>
            <button
              className={classnames({
                [styles["backButton"]]: true,
                [styles["hide"]]: counter === 0
              })}
              onClick={() => setCounter(state => state - 1)}
            >
              BACK
            </button>
            <button
              className={styles["continue-button"]}
              onClick={() => setCounter(state => (state === 2 ? state : state + 1))}
            >
              <h4 className={styles["button-text"]}>CONTINUE</h4>
              <Icon name="arrow-right" size={32} type="decorative" className={styles["continue-icon"]} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
