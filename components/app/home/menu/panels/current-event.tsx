import { Headline, setCurrentHeadline, setCurrentHeadlineId } from "slices/headlines";
import Event from "../../event";
import EventSkeleton from "../../event/event-skeleton";
import HeadlineFooter from "../../headline-footer";
import styles from "../menu.module.scss";
import { fireEvent } from "utils/gtag";
import { VIEW_ALL_EXTREME_EVENTS } from "constants/tag-manager";
import { useEffect, useRef, useState } from "react";
import { RootState } from "store/types";
import { connect } from "react-redux";
import { Mode, pagePush } from "slices/modes";
import { ActionCreatorWithOptionalPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { PAGE_TYPE_ID } from "../../main-container/component";

type CurrentEventProps = {
  headlines: Headline[];
  headlinesLoading: boolean;
  currentHeadlineId: number | undefined;
  currentMode: Mode | undefined;
  setCurrentHeadline: ActionCreatorWithOptionalPayload<Headline | undefined, string>;
  setCurrentHeadlineId: ActionCreatorWithOptionalPayload<number | undefined, string>;
  pagePush: ActionCreatorWithPayload<string, string>;
};

/** Menu view to show a singular extreme event. */
const CurrentEvent = ({
  headlines,
  headlinesLoading,
  currentHeadlineId,
  currentMode,
  setCurrentHeadline,
  setCurrentHeadlineId,
  pagePush
}: CurrentEventProps) => {
  const [footerHeading, setFooterHeading] = useState<string>("");

  const carouselRef = useRef<HTMLDivElement>(null);

  /** Navigates to view all events view. */
  const viewAllExtremeEvents = () => {
    setCurrentHeadline(undefined);
    setCurrentHeadlineId(undefined);
    pagePush(PAGE_TYPE_ID.EXTREME_EVENTS_LIST_PAGE);
    fireEvent(VIEW_ALL_EXTREME_EVENTS, "web_earth_hq_carousel");
  };

  /** Moves headlines. */
  const navigateHeadline = (action: string) => {
    if (!carouselRef.current) return;

    const eventWidth = carouselRef.current.clientWidth;

    const targetHeadlineIndex =
      headlines.findIndex(headline => headline.id === currentHeadlineId) + (action === "back" ? -1 : 1);

    carouselRef.current.scrollTo({
      left: eventWidth * (targetHeadlineIndex + 1),
      behavior: "smooth"
    });
  };

  // Scrolls to the initial article
  useEffect(() => {
    const targetEl = document.getElementById(`headline-${currentHeadlineId}`);

    if (!targetEl) return;

    targetEl.scrollIntoView();
    // eslint-disable-next-line
  }, [headlinesLoading]);

  // Auto updates the footer text
  useEffect(() => {
    const currentHeadlineIndex = headlines.findIndex(headline => headline.id === currentHeadlineId);
    const total = headlines.length;

    if (currentHeadlineIndex === undefined) return;

    setFooterHeading(
      currentMode?.attributes?.title !== "Default"
        ? `${currentHeadlineIndex + 1}/${total} ${currentMode?.attributes?.title}`
        : `${currentHeadlineIndex + 1}/${total} Extreme Events`
    );

    // eslint-disable-next-line
  }, [currentHeadlineId, headlinesLoading]);

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;

    const eventWidth = carouselRef.current.clientWidth;
    const scrollPos = carouselRef.current.scrollLeft;

    const maxScrollPos = headlines.length * eventWidth;

    if (scrollPos === 0) {
      return carouselRef.current.scrollTo({
        left: maxScrollPos
      });
    }
    if (scrollPos >= maxScrollPos + eventWidth) {
      return carouselRef.current.scrollTo({
        left: eventWidth
      });
    }

    const newHeadlineIndex = Math.round(scrollPos / eventWidth) - 1;

    const newHeadline = headlines.find((_, index) => newHeadlineIndex === index);

    if (!newHeadline || newHeadline.id === currentHeadlineId) return;

    setCurrentHeadline(newHeadline);
    setCurrentHeadlineId(newHeadline.id);
  };

  return (
    <>
      {headlinesLoading ? (
        <EventSkeleton />
      ) : (
        <div ref={carouselRef} id="events" className={styles["c-home-menu__events"]} onScroll={handleCarouselScroll}>
          <Event headline={headlines[headlines.length - 1]} onViewAllEventsClicked={viewAllExtremeEvents} first />
          {headlines.map(headline => (
            <Event key={headline.id} headline={headline} onViewAllEventsClicked={viewAllExtremeEvents} />
          ))}
          <Event headline={headlines[0]} onViewAllEventsClicked={viewAllExtremeEvents} last />
        </div>
      )}
      <HeadlineFooter
        footerHeading={footerHeading}
        disableBackButton={headlines?.length == 1}
        disableNextButton={headlines?.length == 1}
        navigateHeadline={navigateHeadline}
        isLoading={headlinesLoading}
      />
    </>
  );
};

export default connect(
  (state: RootState) => ({
    headlines: state.headlines.headlines,
    headlinesLoading: state.headlines.headlinesLoading,
    currentHeadlineId: state.headlines.currentHeadlineId,
    currentMode: state.modes.currentMode
  }),
  {
    setCurrentHeadline,
    setCurrentHeadlineId,
    pagePush
  }
)(CurrentEvent);
