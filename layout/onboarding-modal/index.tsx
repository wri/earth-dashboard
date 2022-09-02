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
            <div className={styles["modal__top"]}>
              {starBG.src && <Image layout="fill" objectFit="cover" src={starBG.src} alt="hello" />}
              <div className={styles["modal__top__contain"]}>
                <div className={styles["modal__header"]}>
                  <div className={styles["modal__logo"]}>
                    <Icon name="earth-hq" size={32} type="decorative" className={styles["modal__logo__earth-hq"]} />
                    <h3 className={styles["modal__header__title"]}>WELCOME TO EARTH HQ</h3>
                  </div>
                  <IconButton
                    name="close"
                    size={32}
                    className={styles["modal__header__close-button"]}
                    onClick={handleClose}
                  />
                </div>
                <div className={styles["modal__image"]}>
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
                        [styles["modal__image__hide"]]: true,
                        [styles["modal__image__show"]]: counter === index
                      })}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className={styles["modal__content"]}>
              <h4 className={styles["modal__content__text"]}>{data[counter].title}</h4>
              <div className={styles["modal__content__controls"]}>
                <div className={styles["modal__content__controls__box"]}>
                  <button
                    data-testid="back-btn"
                    disabled={counter === 0}
                    className={classnames({
                      [styles["modal__content__controls__box__back-button"]]: true,
                      [styles["hide"]]: counter === 0
                    })}
                    onClick={() => setCounter(state => state - 1)}
                  >
                    BACK
                  </button>
                </div>
                <div className={styles["modal__content__controls__box"]}>
                  <div className={styles["modal__content__controls__box__divider"]}>
                    {[0, 1, 2].map(point => (
                      <div
                        key={point}
                        className={classnames({
                          [styles["modal__content__controls__box__divider--unselected"]]: counter !== point,
                          [styles["modal__content__controls__box__divider--selected"]]: counter === point
                        })}
                        onClick={() => setCounter(point)}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className={styles["modal__content__controls__box"]}>
                  <button
                    data-testid="forward-btn"
                    className={styles["modal__content__controls__box__continueBtn"]}
                    onClick={nextStep}
                  >
                    <h4 className={styles["modal__content__controls__box__continueBtn__text"]}>
                      {counter === 2 ? "EXPLORE" : "CONTINUE"}
                    </h4>
                    <Icon
                      name={counter === 2 ? "check" : "arrow-right"}
                      size={32}
                      type="decorative"
                      className={styles["modal__content__controls__box__continueBtn__icon"]}
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
