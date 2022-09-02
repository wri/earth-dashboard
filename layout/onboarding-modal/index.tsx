/* eslint-disable @next/next/no-img-element */
import classnames from "classnames";
import styles from "./onboarding-modal.module.scss";
import IconButton from "components/ui/icon-button";
import Icon from "components/ui/Icon";
import starBG from "public/static/images/star-background.jpg";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { data } from "./onboarding";
import { ONBOARDING_COMPLETED } from "layout/layout/layout-app/constants";

interface IOnBoardingModal {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const OnboardingModal: React.FC<IOnBoardingModal> = ({ showModal, setShowModal }) => {
  const [counter, setCounter] = useState(0);

  const handleClose = () => {
    localStorage.setItem(ONBOARDING_COMPLETED, "true");
    setShowModal(false);
  };
  const nextStep = () => {
    if (counter === 2) return handleClose();
    setCounter(state => (state += 1));
  };

  return (
    <>
      {showModal && (
        <div className={styles["modal-backdrop"]}>
          <div className={styles["modal"]}>
            <div className={styles["modal-top"]}>
              {starBG.src && <Image layout="fill" objectFit="cover" src={starBG.src} alt="hello" />}
              <div className={styles["contain"]}>
                <div className={styles["modal-header"]}>
                  <div className={styles["modal-logo"]}>
                    <Icon name="earth-hq" size={32} type="decorative" className={styles["earth-hq"]} />
                    <h3 className={styles["modal-title"]}>WELCOME TO EARTH HQ</h3>
                  </div>
                  <IconButton name="close" size={32} className={styles["close-button"]} onClick={handleClose} />
                </div>
                <div className={styles["modal-image-container"]}>
                  {/* Renders list images beforehand */}
                  {data.map((image, index) => (
                    <Image
                      layout="fill"
                      objectFit="cover"
                      objectPosition="bottom"
                      priority={true}
                      key={image.id}
                      src={image.url}
                      alt={image.title}
                      className={classnames({
                        [styles["modal-main-image"]]: true,
                        [styles["show-image"]]: counter === index
                      })}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className={styles["modal-main-content"]}>
              <h4 className={styles["text"]}>{data[counter].title}</h4>
              <div className={styles["controls"]}>
                <div className={styles["box"]}>
                  <button
                    data-testid="back-btn"
                    disabled={counter === 0}
                    className={classnames({
                      [styles["back-button"]]: true,
                      [styles["hide"]]: counter === 0
                    })}
                    onClick={() => setCounter(state => state - 1)}
                  >
                    BACK
                  </button>
                </div>
                <div className={styles["box"]}>
                  <div className={styles["divider"]}>
                    {[0, 1, 2].map(point => (
                      <div
                        key={point}
                        className={classnames({
                          [styles["unselected"]]: counter !== point,
                          [styles["selected"]]: counter === point
                        })}
                        onClick={() => setCounter(point)}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className={styles["box"]}>
                  <button data-testid="forward-btn" className={styles["continue-button"]} onClick={nextStep}>
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
        </div>
      )}
    </>
  );
};

export default OnboardingModal;
