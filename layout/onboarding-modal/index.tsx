import classnames from "classnames";
import styles from "./onboarding-modal.module.scss";
import IconButton from "components/ui/icon-button";
import Icon from "components/ui/Icon";
import STAR_BG from "public/static/images/star-background.jpg";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { data } from "./onboarding";
import { ONBOARDING_COMPLETED } from "layout/layout/layout-app/constants";
import nullSchoolLogo from "public/static/images/logo-earth-hq.svg";
import { fireEvent } from "utils/gtag";
import { ONBOARDING_SKIPPED, ONBOARDING_COMPLETED as ONBOARDING_COMPLETED_TAG, PAGE_VIEW } from "constants/tag-manager";
import SlideLocator from "./slide-locator";
import DefaultButton from "components/ui/default-button";
import OutlineButton from "components/ui/outline-button";

type OnboardingModalProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  isMobile: boolean;
};

/** Shows information on how to use the site. */
const OnboardingModal = ({ setShowModal, isMobile }: OnboardingModalProps) => {
  const infoRef = useRef<HTMLDivElement>();

  const [counter, setCounter] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const isFirstSlide = counter == 0;
  const isFinalSlide = counter === 2;

  const handleScroll = () => {
    if (!infoRef.current) return;

    const { clientWidth, scrollLeft } = infoRef.current;

    setProgress(scrollLeft / (clientWidth * 2));

    if (scrollLeft > 0 && scrollLeft < clientWidth) setCounter(0);
    else if (scrollLeft >= clientWidth && scrollLeft < clientWidth * 2) setCounter(1);
    else if (scrollLeft === clientWidth * 2) setCounter(2);
  };

  useEffect(() => {
    infoRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      infoRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  /** Navigate to the previous step. */
  const backStep = () => {
    if (!infoRef.current) return;

    infoRef.current.children[counter - 1].scrollIntoView({
      behavior: "smooth"
    });
  };

  /** Navigate to the next step. */
  const nextStep = () => {
    if (isFinalSlide) {
      fireEvent(ONBOARDING_COMPLETED_TAG, null);
      return handleClose();
    }

    if (!infoRef.current) return;

    infoRef.current.children[counter + 1].scrollIntoView({
      behavior: "smooth"
    });
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
        <div className={styles["modal__top"]}>
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
          <div className={styles["modal__top__contain"]}>
            <div className={styles["modal__header"]}>
              {/* Desktop title and mobile logo */}
              <div className={styles["modal__logo"]}>
                {!isMobile && (
                  <Icon name="earth-hq" size={32} type="decorative" className={styles["modal__logo__earth-hq"]} />
                )}
                <h3 className={styles["modal__header__title"]}>WELCOME TO EARTH HQ</h3>
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
            <div
              ref={ref => {
                if (ref) infoRef.current = ref;
              }}
              className={styles["modal__info"]}
            >
              {data.map(image => (
                <div key={image.id} className={styles["section"]}>
                  <div className={styles["image"]}>
                    <Image
                      layout="fill"
                      objectFit="cover"
                      objectPosition={isMobile ? undefined : "bottom"}
                      src={isMobile ? image.mobileURL : image.desktopURL}
                      alt={image.title}
                    />
                  </div>

                  {/* Description */}
                  <h4 className={styles["text"]}>{data[counter].title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className={styles["modal__content"]}>
          {/* Pagination (mobile) */}
          {isMobile && <SlideLocator setCounter={setCounter} progress={progress} />}

          {/* Pagination (desktop) */}
          <div
            className={classnames({
              [styles["modal__content__controls"]]: true,
              [styles["first"]]: isFirstSlide
            })}
          >
            {/* Back button */}
            <div
              className={classnames(styles["back-button"], {
                [styles["hide"]]: isFirstSlide
              })}
            >
              <OutlineButton text="BACK" onClick={backStep} />
            </div>

            {!isMobile && <SlideLocator setCounter={setCounter} progress={progress} />}

            {/* Next button */}
            <div className={styles["next-button"]}>
              <DefaultButton
                text={isFinalSlide ? "EXPLORE" : "CONTINUE"}
                icon={<Icon name={isFinalSlide ? "check" : "arrow-right"} size={15} type="decorative" />}
                onClick={nextStep}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
