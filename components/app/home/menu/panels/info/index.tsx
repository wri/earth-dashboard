import React, { useEffect, useRef, useState } from "react";
import styles from "./info.module.scss";
import { connect } from "react-redux";
import { RootState } from "store/types";
import { ActionCreatorWithOptionalPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Headline, setCurrentHeadline, setCurrentHeadlineId } from "slices/headlines";
import EventCard from "../../../event-card";
import Carousel from "components/ui/carousel";
import ViewAllCard from "./view-all-card";
import { setPageTypeId, setPreviousPageTypeId } from "slices/modes";
import { PAGE_TYPE_ID } from "../../../main-container/component";
import EventPrompt from "../../../event-prompt/component";
import InfoFooter from "./info-footer";

const SCROLL_NORMALIZE_VALUE = 37;

type InfoPanelProps = {
  currentHeadline: Headline | undefined;
  headlines: Headline[];
  setCurrentHeadline: ActionCreatorWithPayload<Headline | undefined, string>;
  setPageTypeId: ActionCreatorWithPayload<string, string>;
  setPreviousPageTypeId: ActionCreatorWithPayload<string, string>;
  previousPageTypeId: string;
  isMobile: boolean;
  setCurrentHeadlineId: ActionCreatorWithOptionalPayload<number | undefined, string>;
};

const InfoPanel = ({
  currentHeadline,
  headlines,
  setCurrentHeadline,
  setPageTypeId,
  setPreviousPageTypeId,
  previousPageTypeId,
  isMobile,
  setCurrentHeadlineId
}: InfoPanelProps) => {
  const [carouselScroll, setCarouselScroll] = useState<number>(0);
  const [carouselWidth, setCarouselWidth] = useState<number>();
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<NodeJS.Timeout>();

  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleEventClicked = (headline: Headline) => {
    setCurrentHeadline(headline);
    setPageTypeId(PAGE_TYPE_ID.CURRENT_EVENT_PAGE);
    setPreviousPageTypeId(PAGE_TYPE_ID.INFO_PAGE);
  };

  const scrollToIndex = (index: number, behavior?: "auto" | "smooth") => {
    if (!carouselWidth || !carouselRef.current) return;

    const scrollLeft = index * (carouselWidth - SCROLL_NORMALIZE_VALUE);
    carouselRef.current.scrollTo({ left: scrollLeft, behavior });
  };

  const navigateInfo = (action: string) => {
    if (action === "back") {
      scrollToIndex(currentHeadlineIndex - 1, "smooth");
      setCurrentHeadlineIndex(currentHeadlineIndex - 1);
    } else {
      scrollToIndex(currentHeadlineIndex + 1, "smooth");
      setCurrentHeadlineIndex(currentHeadlineIndex + 1);
    }
  };

  const scrollFromHeadline = (behavior?: "auto" | "smooth") => {
    if (!carouselWidth || !carouselRef.current) return;

    if (!currentHeadline && previousPageTypeId === PAGE_TYPE_ID.EXTREME_EVENTS_LIST_PAGE) {
      const index = headlines.length;
      scrollToIndex(index, behavior);
      setCurrentHeadlineIndex(index);
    }

    if (!currentHeadline) return;
    const index = headlines.findIndex(headline => headline.id === currentHeadline.id);

    if (!index) return;
    scrollToIndex(index, behavior);
    setCurrentHeadlineIndex(index);
  };

  // Run at start so no scroll animation
  useEffect(() => {
    scrollFromHeadline();
  }, [carouselWidth, carouselRef.current]);

  useEffect(() => {
    scrollFromHeadline("smooth");
  }, [currentHeadline, carouselWidth, carouselRef.current]);

  useEffect(() => {
    if (containerRef.current) setCarouselWidth(containerRef.current.offsetWidth);
  }, [containerRef.current]);

  const setHeadlineToScroll = () => {
    if (!carouselWidth) return;

    let index = Math.round(carouselScroll / (carouselWidth - SCROLL_NORMALIZE_VALUE));
    if (index < headlines.length) {
      setCurrentHeadline(headlines[index]);
      setCurrentHeadlineIndex(index);
      setPreviousPageTypeId(PAGE_TYPE_ID.INFO_PAGE);
    } else {
      setCurrentHeadline(undefined);
      setCurrentHeadlineId(undefined);
      setCurrentHeadlineIndex(headlines.length);
      setPreviousPageTypeId(PAGE_TYPE_ID.EXTREME_EVENTS_LIST_PAGE);
    }
  };

  useEffect(() => {
    window.clearTimeout(isScrolling);
    setIsScrolling(
      setTimeout(function () {
        setHeadlineToScroll();
      }, 250)
    );
  }, [carouselScroll, carouselWidth]);

  return (
    <div ref={containerRef} className={styles["info-container"]}>
      {!isMobile && <EventPrompt />}
      <Carousel
        items={headlines.map(headline => (
          <EventCard
            headline={headline}
            type="Condensed"
            key={headline.id}
            onClick={() => handleEventClicked(headline)}
          />
        ))}
        finalItem={<ViewAllCard />}
        ref={carouselRef}
        setScroll={setCarouselScroll}
        style={{ height: isMobile ? "auto" : "calc(100% - 176px)" }}
      />
      {!isMobile && (
        <InfoFooter
          disableBackButton={currentHeadlineIndex === 0}
          disableNextButton={currentHeadlineIndex === headlines.length}
          navigateInfo={navigateInfo}
          index={currentHeadlineIndex}
          length={headlines.length + 1}
        />
      )}
    </div>
  );
};

export default connect(
  (state: RootState) => ({
    currentHeadline: state.headlines.currentHeadline,
    headlines: state.headlines.headlines,
    previousPageTypeId: state.modes.previousPageTypeId,
    isMobile: state.common.isMobile
  }),
  { setCurrentHeadline, setPageTypeId, setPreviousPageTypeId, setCurrentHeadlineId }
)(InfoPanel);
