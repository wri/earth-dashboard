/* eslint-disable @next/next/no-img-element */
import classnames from "classnames";
import styles from "./onboarding-modal.module.scss";
import { useRouter } from "next/router";
import IconButton from "components/ui/icon-button";
import Icon from "components/ui/Icon";
import starBG from "public/static/images/star-background.jpg";
import Image from "next/image";
import { useState } from "react";
import { data } from "./onboarding";
import { ONBOARDING_COMPLETED } from "layout/layout/layout-app/constants";

const OnboardingModal = ({ showModal, setShowModal }: any) => {
  const [counter, setCounter] = useState(0);
  const router = useRouter();

  const nextStep = () => {
    if (counter === 2) {
      localStorage.setItem(ONBOARDING_COMPLETED, "true");
      setShowModal(false);
      return;
    }
    setCounter(state => (state += 1));
  };

  const close = () => {
    localStorage.setItem(ONBOARDING_COMPLETED, "true");
    setShowModal(false);
  };

  return (
    showModal && (
      <div className={styles["modal-backdrop"]}>
        <div className={styles["modal"]}>
          <div className={styles["modal-top"]}>
            <Image layout="fill" objectFit="cover" src={starBG.src} alt="hello" />
            <div className={styles["contain"]}>
              <div className={styles["modal-header"]}>
                <div className={styles["modal-logo"]}>
                  <Icon name="earth-hq" size={32} type="decorative" className={styles["earth-hq"]} />
                  <h3 className={styles["modal-title"]}>WELCOME TO EARTH HQ</h3>
                </div>
                <IconButton name="close-new" size={13} className={styles["close-button"]} onClick={close} />
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
            <h4 className={styles["text"]}>{data[counter].title}</h4>
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
              <button className={styles["continue-button"]} onClick={nextStep}>
                <h4 className={styles["button-text"]}>{counter === 2 ? "EXPLORE" : "CONTINUE"}</h4>
                <Icon
                  name={counter === 2 ? "check" : "arrow-right"}
                  size={32}
                  type="decorative"
                  className={styles["continue-icon"]}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default OnboardingModal;
