import React, { useEffect, useRef, useState } from "react";
import styles from "./info.module.scss";
import { connect } from "react-redux";
import { RootState } from "store/types";
import {
  ActionCreatorWithOptionalPayload,
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload
} from "@reduxjs/toolkit";
import { Headline, setCurrentHeadline, setCurrentHeadlineId } from "slices/headlines";
import EventCard from "../../../event-card";
import Carousel from "components/ui/carousel";
import ViewAllCard from "./view-all-card";
import { Mode, pagePush, resetPageStack, setCurrentMode, setRoutePageTypeId } from "slices/modes";
import { PAGE_TYPE_ID } from "../../../main-container/component";
import EventPrompt from "../../../event-prompt/component";
import InfoFooter from "./info-footer";
import { fireEvent } from "utils/gtag";
import {
  EARTH_HQ_CAROUSEL_COMPLETED,
  EARTH_HQ_CAROUSEL_STARTED,
  EARTH_HQ_CAROUSEL_VIEWED
} from "constants/tag-manager";
import EventCardSkeleton from "components/app/home/event-card/event-card-skeleton";

const SCROLL_NORMALIZE_VALUE = 37;

type InfoPanelProps = {
  currentHeadline: Headline | undefined;
  headlines: Headline[];
  setCurrentHeadline: ActionCreatorWithPayload<Headline | undefined, string>;
  pagePush: ActionCreatorWithPayload<string, string>;
  isMobile: boolean;
  isLoading: boolean;
  setCurrentHeadlineId: ActionCreatorWithOptionalPayload<number | undefined, string>;
  setCurrentMode: ActionCreatorWithPayload<Mode, string>;
  defaultMode: Mode | undefined;
  setRoutePageTypeId: ActionCreatorWithPayload<string, string>;
  routePageTypeId: string;
  resetPageStack: ActionCreatorWithoutPayload<string>;
  hasAppLoaded: boolean;
  currentHeadlineId: number | undefined;
};

const InfoPanel = ({
  currentHeadline,
  headlines,
  setCurrentHeadline,
  pagePush,
  isMobile,
  isLoading,
  setCurrentHeadlineId,
  defaultMode,
  setCurrentMode,
  setRoutePageTypeId,
  routePageTypeId,
  resetPageStack,
  hasAppLoaded,
  currentHeadlineId
}: InfoPanelProps) => {
  const [carouselScroll, setCarouselScroll] = useState<number>(0);
  const [carouselWidth, setCarouselWidth] = useState<number>();
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<NodeJS.Timeout>();
  const [firstOpen, setFirstOpen] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleEventClicked = (headline: Headline) => {
    setCurrentHeadline(headline);
    setCurrentHeadlineId(headline.id);
    setRoutePageTypeId(PAGE_TYPE_ID.INFO_PAGE);
    pagePush(PAGE_TYPE_ID.CURRENT_EVENT_PAGE);
  };

  const scrollToIndex = (index: number, behavior?: "auto" | "smooth") => {
    if (!carouselWidth || !carouselRef.current) return;

    const scrollLeft = index * (carouselWidth - SCROLL_NORMALIZE_VALUE);
    carouselRef.current.scrollTo({ left: scrollLeft, behavior });
  };

  const navigateInfo = (action: string) => {
    let index = currentHeadlineIndex;

    if (action === "back") {
      index = currentHeadlineIndex - 1;
      scrollToIndex(index, "smooth");
      setCurrentHeadlineIndex(index);
    } else {
      index = currentHeadlineIndex + 1;
      scrollToIndex(index, "smooth");
      setCurrentHeadlineIndex(index);
    }
  };

  const scrollFromHeadline = (behavior?: "auto" | "smooth") => {
    if (!carouselWidth || !carouselRef.current) return;

    if (!currentHeadline && routePageTypeId === PAGE_TYPE_ID.EXTREME_EVENTS_LIST_PAGE) {
      const index = headlines.length;
      scrollToIndex(index, behavior);
      setCurrentHeadlineIndex(index);
    }

    if (!currentHeadline) return;

    const index = headlines.findIndex(headline => headline.id === currentHeadline.id);

    if (index === -1) return;

    setFirstOpen(false);
    scrollToIndex(index, behavior);
    setCurrentHeadlineIndex(index);
  };

  const setHeadlineToScroll = () => {
    if (!carouselWidth) return;

    let index = Math.round(carouselScroll / (carouselWidth - SCROLL_NORMALIZE_VALUE));
    if (index < headlines.length) {
      setCurrentHeadline(headlines[index]);
      setCurrentHeadlineIndex(index);
      setRoutePageTypeId(PAGE_TYPE_ID.INFO_PAGE);
    } else {
      setCurrentHeadline(undefined);
      setCurrentHeadlineId(undefined);
      setCurrentHeadlineIndex(headlines.length);
      setRoutePageTypeId(PAGE_TYPE_ID.EXTREME_EVENTS_LIST_PAGE);
    }
  };

  // Initial setting of variables
  useEffect(() => {
    resetPageStack();
    setRoutePageTypeId(PAGE_TYPE_ID.INFO_PAGE);
    if (defaultMode) setCurrentMode(defaultMode);
    if (!hasAppLoaded && currentHeadlineId) pagePush(PAGE_TYPE_ID.CURRENT_EVENT_PAGE);
    // eslint-disable-next-line
  }, []);

  // Setting carousel width to be used for calculation
  useEffect(() => {
    if (containerRef.current) setCarouselWidth(containerRef.current.offsetWidth);
    // eslint-disable-next-line
  }, [containerRef.current]);

  // Run at at start and when headline changes
  useEffect(() => {
    if (isLoading) return;
    const behavior = firstOpen ? "auto" : "smooth";
    scrollFromHeadline(behavior);
    // eslint-disable-next-line
  }, [carouselWidth, carouselRef.current, currentHeadline, isLoading]);

  // Firing events when focusing on headlines
  useEffect(() => {
    if (headlines.length === currentHeadlineIndex) {
      fireEvent(EARTH_HQ_CAROUSEL_COMPLETED, null);
    } else if (currentHeadlineIndex === 0) {
      fireEvent(EARTH_HQ_CAROUSEL_STARTED, null);
    }

    fireEvent(EARTH_HQ_CAROUSEL_VIEWED, `carousel_${currentHeadlineIndex + 1}`);
    // eslint-disable-next-line
  }, [currentHeadlineIndex]);

  // Runs so function only called on scroll end
  useEffect(() => {
    if (isLoading) return;
    window.clearTimeout(isScrolling);
    setIsScrolling(
      setTimeout(function () {
        setHeadlineToScroll();
      }, 250)
    );
    // eslint-disable-next-line
  }, [carouselScroll, carouselWidth, isLoading]);

  const currentIndex = carouselWidth ? Math.round(carouselScroll / (carouselWidth - SCROLL_NORMALIZE_VALUE)) : 0;

  return (
    <div ref={containerRef} className={styles["info-container"]}>
      {!isMobile && <EventPrompt />}

      {isLoading ? (
        <div className={styles["info-container__skeleton-wrapper"]}>
          <EventCardSkeleton />
        </div>
      ) : (
        <Carousel
          items={headlines.map((headline, index) => (
            <EventCard
              headline={headline}
              type="Condensed"
              key={headline.id}
              onClick={() => handleEventClicked(headline)}
              gradient={currentIndex !== index}
            />
          ))}
          finalItem={<ViewAllCard />}
          ref={carouselRef}
          setScroll={setCarouselScroll}
          className={styles["info-container__carousel"]}
          style={{ height: isMobile ? "auto" : "calc(100% - 176px)" }}
        />
      )}

      {!isMobile && (
        <InfoFooter
          disableBackButton={currentHeadlineIndex === 0}
          disableNextButton={currentHeadlineIndex === headlines.length}
          navigateInfo={navigateInfo}
          index={currentIndex}
          length={headlines.length + 1 > 11 ? 11 : headlines.length + 1}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default connect(
  (state: RootState) => ({
    currentHeadline: state.headlines.currentHeadline,
    headlines: state.headlines.headlines,
    isMobile: state.common.isMobile,
    isLoading: state.headlines.headlinesLoading,
    defaultMode: state.modes.defaultMode,
    routePageTypeId: state.modes.routePageTypeId,
    hasAppLoaded: state.common.hasAppLoaded,
    currentHeadlineId: state.headlines.currentHeadlineId
  }),
  {
    setCurrentHeadline,
    pagePush,
    resetPageStack,
    setCurrentHeadlineId,
    setCurrentMode,
    setRoutePageTypeId
  }
)(InfoPanel);
