import classnames from "classnames";
import styles from "./onboarding-modal.module.scss";
import IconButton from "components/ui/icon-button";
import Icon from "components/ui/Icon";
import starBG from "public/static/images/star-background.jpg";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { data } from "./onboarding";
import { ONBOARDING_COMPLETED } from "layout/layout/layout-app/constants";
import nullSchoolLogo from "public/static/images/logo-earth-hq.svg";

interface IOnBoardingModal {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  isMobile: boolean;
}

const OnboardingModal: React.FC<IOnBoardingModal> = ({ showModal, setShowModal, isMobile }) => {
  const [counter, setCounter] = useState(0);
  const isFirstSlide = counter == 0;
  const isFinalSlide = counter === 2;

  const handleClose = () => {
    localStorage.setItem(ONBOARDING_COMPLETED, "true");
    setShowModal(false);
  };
  const nextStep = () => {
    if (isFinalSlide) return handleClose();
    setCounter(state => (state += 1));
  };

  const SlideLocator = () => (
    <div className={styles["modal__content__controls__box"]}>
      <div
        className={classnames({
          [styles["modal__content__controls__box__divider"]]: true,
          [styles["modal__content__controls__box__divider__mobile"]]: isMobile
        })}
      >
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
  );

  return (
    <div className={styles["modal-backdrop"]}>
      <div
        className={classnames({
          [styles["modal"]]: !isMobile,
          [styles["modal__mobile"]]: isMobile
        })}
      >
        <div
          className={classnames({
            [styles["modal__top"]]: !isMobile,
            [styles["modal__top__mobile"]]: isMobile
          })}
        >
          {isMobile && (
            <div className={styles["modal__mobile__nav"]}>
              <div className={styles["modal__mobile__nav__logo"]}>
                <Image src={nullSchoolLogo} alt="" />
              </div>
              {counter !== 2 && (
                <h1 className={styles["modal__mobile__continue"]} onClick={handleClose}>
                  SKIP
                </h1>
              )}
            </div>
          )}
          {starBG.src && <Image layout="fill" objectFit="cover" src={starBG.src} alt="" />}
          <div
            className={classnames({
              [styles["modal__top__contain"]]: !isMobile,
              [styles["modal__top__contain-mobile"]]: isMobile
            })}
          >
            <div
              className={classnames({
                [styles["modal__header"]]: true,
                [styles["modal__header__mobile"]]: isMobile
              })}
            >
              <div className={styles["modal__logo"]}>
                {!isMobile && (
                  <Icon name="earth-hq" size={32} type="decorative" className={styles["modal__logo__earth-hq"]} />
                )}
                <h3
                  className={classnames({
                    [styles["modal__header__title"]]: !isMobile,
                    [styles["modal__header__title__mobile"]]: isMobile
                  })}
                >
                  WELCOME TO EARTH HQ
                </h3>
              </div>
              {!isMobile && (
                <IconButton
                  name="close"
                  size={32}
                  className={styles["modal__header__close-button"]}
                  onClick={handleClose}
                />
              )}
            </div>
            <div className={styles["modal__image"]}>
              {data.map((image, index) => (
                <Image
                  layout="fill"
                  objectFit="cover"
                  objectPosition={isMobile ? undefined : "bottom"}
                  priority={true}
                  key={image.id}
                  src={isMobile ? image.mobileURL : image.desktopURL}
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
        <div
          className={classnames({
            [styles["modal__content"]]: !isMobile,
            [styles["modal__content__mobile"]]: isMobile
          })}
        >
          <h4
            className={classnames({
              [styles["modal__content__text"]]: !isMobile,
              [styles["modal__content__text__mobile"]]: isMobile
            })}
          >
            {data[counter].title}
          </h4>
          {isMobile && <SlideLocator />}
          <div
            className={classnames({
              [styles["modal__content__controls"]]: true
            })}
          >
            <div
              className={classnames({
                [styles["modal__content__controls__box"]]: true,
                [styles["modal__content__controls__box__hide"]]: isFirstSlide,
                [styles["modal__content__controls__box__remove"]]: isFirstSlide && isMobile
              })}
            >
              <button
                data-testid="back-btn"
                disabled={isFirstSlide}
                className={classnames({
                  [styles["modal__content__controls__box__back-button"]]: true,
                  [styles["modal__content__controls__box__back-button-mobile"]]: isMobile,
                  [styles["hide"]]: isFirstSlide
                })}
                onClick={() => setCounter(state => state - 1)}
              >
                BACK
              </button>
            </div>
            {!isMobile && <SlideLocator />}
            <div
              className={classnames({
                [styles["modal__content__controls__box"]]: true,
                [styles["modal__content__controls__box__mobile"]]: isMobile && isFirstSlide,
                [styles["modal__content__controls__box__continue"]]: counter !== 0 && isMobile
              })}
            >
              <button
                data-testid="forward-btn"
                className={classnames({
                  [styles["modal__content__controls__box__continueBtn"]]: true,
                  [styles["modal__content__controls__box__continueBtn-mobile"]]: isMobile
                })}
                onClick={nextStep}
              >
                <h4
                  className={classnames({
                    [styles["modal__content__controls__box__continueBtn__text"]]: true,
                    [styles["modal__content__controls__box__continueBtn__text-mobile"]]: isMobile
                  })}
                >
                  {isFinalSlide ? "EXPLORE" : "CONTINUE"}
                </h4>
                <Icon
                  name={isFinalSlide ? "check" : "arrow-right"}
                  size={32}
                  type="decorative"
                  className={classnames({
                    [styles["modal__content__controls__box__continueBtn__icon"]]: true,
                    [styles["modal__content__controls__box__continueBtn__icon-mobile"]]: isMobile
                  })}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
