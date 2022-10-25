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
import DefaultButton from "components/ui/default-button";
import OutlineButton from "components/ui/outline-button";
import CarouselViewIndicator from "components/ui/carousel-view-indicator";

type OnboardingModalProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  isMobile: boolean;
};

/** Shows information on how to use the site. */
const OnboardingModal = ({ setShowModal, isMobile }: OnboardingModalProps) => {
  const carouselRef = useRef<HTMLDivElement>();

  const [counter, setCounter] = useState<number>(0);
  const [prevScreen, setPrevScreen] = useState<Element | null>();
  const [nextScreen, setNextScreen] = useState<Element | null>();

  const isFirstSlide = counter == 1;
  const isFinalSlide = counter === 3;

  // Observes each item and checks if in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const pos = entry.target.getAttribute("data-pos");

          if (!entry.isIntersecting || !pos) return;

          setCounter(parseInt(pos));
          setPrevScreen(entry.target.previousElementSibling);
          setNextScreen(entry.target.nextElementSibling);
        });
      },
      {
        root: carouselRef.current,
        rootMargin: "0px",
        threshold: 0.5
      }
    );

    carouselRef.current?.childNodes.forEach(node => {
      observer.observe(node as Element);
    });

    return () => {
      carouselRef.current?.childNodes.forEach(node => {
        observer.unobserve(node as Element);
      });
    };
  }, []);

  // Tracks GA events
  useEffect(() => {
    fireEvent(PAGE_VIEW, `onboarding_${counter}`);
  }, [counter]);

  /** Tracks GA event that user has skipped this flow. */
  const handleSkip = () => {
    fireEvent(ONBOARDING_SKIPPED, counter.toString());
    handleClose();
  };

  /** Closes the modal and sets flag in local storage. */
  const handleClose = () => {
    localStorage.setItem(ONBOARDING_COMPLETED, "true");
    setShowModal(false);
  };

  /** Scrolls to the previous widget. */
  const handlePrevious = () => {
    if (!prevScreen) return;

    prevScreen.scrollIntoView({
      block: "center",
      behavior: "smooth"
    });
  };

  /** Scrolls to the next widget. */
  const handleNext = () => {
    if (isFinalSlide) {
      fireEvent(ONBOARDING_COMPLETED_TAG, null);
      return handleClose();
    }

    if (!nextScreen) return;

    nextScreen.scrollIntoView({
      block: "center",
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
              {counter !== 3 && (
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
                  size={11}
                  className={styles["modal__header__close-button"]}
                  onClick={handleSkip}
                />
              )}
            </div>

            {/* Slider image */}
            <div
              ref={ref => {
                if (ref) carouselRef.current = ref;
              }}
              className={styles["modal__info"]}
            >
              {data.map(image => (
                <div key={image.id} data-pos={image.id} className={styles["section"]}>
                  <div className={styles["image"]}>
                    <Image
                      layout="fill"
                      objectFit="cover"
                      objectPosition={isMobile ? "top" : "bottom"}
                      src={isMobile ? image.mobileURL : image.desktopURL}
                      alt={image.title}
                    />
                    {isMobile && <div className={styles["shadow"]} />}
                  </div>

                  {/* Description */}
                  <h4 className={styles["text"]}>{image.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className={styles["modal__content"]}>
          {/* Pagination (mobile) */}
          {isMobile && (
            <CarouselViewIndicator ids={data.map(({ id }) => id.toString())} activeId={counter.toString()} />
          )}

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
              <OutlineButton text="BACK" onClick={handlePrevious} />
            </div>

            {!isMobile && (
              <CarouselViewIndicator ids={data.map(({ id }) => id.toString())} activeId={counter.toString()} />
            )}

            {/* Next button */}
            <div className={styles["next-button"]}>
              <DefaultButton
                text={isFinalSlide ? "EXPLORE" : "CONTINUE"}
                icon={<Icon name={isFinalSlide ? "check" : "arrow-right"} size={15} type="decorative" />}
                onClick={handleNext}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
