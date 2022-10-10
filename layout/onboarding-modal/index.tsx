import classnames from "classnames";
import styles from "./onboarding-modal.module.scss";
import IconButton from "components/ui/icon-button";
import Icon from "components/ui/Icon";
import STAR_BG from "public/static/images/star-background.jpg";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { data } from "./onboarding";
import { ONBOARDING_COMPLETED } from "layout/layout/layout-app/constants";
import nullSchoolLogo from "public/static/images/logo-earth-hq.svg";
import { fireEvent } from "utils/gtag";
import { ONBOARDING_SKIPPED, ONBOARDING_COMPLETED as ONBOARDING_COMPLETED_TAG, PAGE_VIEW } from "constants/tag-manager";
import SlideLocator from "./slide-locator";

type OnboardingModalProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  isMobile: boolean;
};

/** Shows information on how to use the site. */
const OnboardingModal = ({ setShowModal, isMobile }: OnboardingModalProps) => {
  const [counter, setCounter] = useState(0);
  const isFirstSlide = counter == 0;
  const isFinalSlide = counter === 2;

  // Tracks GA events
  useEffect(() => {
    fireEvent(PAGE_VIEW, `onboarding_${counter + 1}`);
  }, [counter]);

  /** Tracks GA event that user has skipped this flow. */
  const handleSkip = () => {
    fireEvent(ONBOARDING_SKIPPED, (counter + 1).toString());
    handleClose();
  };

  /** Closes the modal and sets flag in local storage. */
  const handleClose = () => {
    localStorage.setItem(ONBOARDING_COMPLETED, "true");
    setShowModal(false);
  };

  /** Navigate to the next step. */
  const nextStep = () => {
    if (isFinalSlide) {
      fireEvent(ONBOARDING_COMPLETED_TAG, null);
      return handleClose();
    }
    setCounter(state => (state += 1));
  };

  return (
    <div className={styles["modal-backdrop"]}>
      <div
        className={classnames({
          [styles["modal"]]: !isMobile,
          [styles["modal__mobile"]]: isMobile
        })}
      >
        {/* Header */}
        <div
          className={classnames({
            [styles["modal__top"]]: !isMobile,
            [styles["modal__top__mobile"]]: isMobile
          })}
        >
          <Image src={STAR_BG} layout="fill" objectFit="cover" alt="" />

          {/* Mobile content */}
          {isMobile && (
            <div className={styles["modal__mobile__nav"]}>
              <div className={styles["modal__mobile__nav__logo"]}>
                <Image src={nullSchoolLogo} alt="" />
              </div>
              {counter !== 2 && (
                <h1 className={styles["modal__mobile__continue"]} onClick={handleSkip}>
                  SKIP
                </h1>
              )}
            </div>
          )}

          {/* General content */}
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
              {/* Desktop title and mobile logo */}
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

              {/* X button */}
              {!isMobile && (
                <IconButton
                  name="close"
                  size={11.25}
                  className={styles["modal__header__close-button"]}
                  onClick={handleSkip}
                />
              )}
            </div>

            {/* Slider image */}
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

        {/* Bottom section */}
        <div
          className={classnames({
            [styles["modal__content"]]: !isMobile,
            [styles["modal__content__mobile"]]: isMobile
          })}
        >
          {/* Description */}
          <h4
            className={classnames({
              [styles["modal__content__text"]]: !isMobile,
              [styles["modal__content__text__mobile"]]: isMobile
            })}
          >
            {data[counter].title}
          </h4>

          {/* Pagination (mobile) */}
          {isMobile && <SlideLocator isMobile={isMobile} counter={counter} setCounter={setCounter} />}

          {/* Pagination (desktop) */}
          <div
            className={classnames({
              [styles["modal__content__controls"]]: true
            })}
          >
            {/* Back button */}
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

            {!isMobile && <SlideLocator isMobile={isMobile} counter={counter} setCounter={setCounter} />}

            {/* Next button */}
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
