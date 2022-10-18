import { Headline, setCurrentHeadline, setCurrentHeadlineId } from "slices/headlines";
import Event from "../../event";
import EventSkeleton from "../../event/event-skeleton";
import HeadlineFooter from "../../headline-footer";
import styles from "../menu.module.scss";
import { fireEvent } from "utils/gtag";
import { VIEW_ALL_EXTREME_EVENTS } from "constants/tag-manager";
import { useEffect, useState } from "react";
import { RootState } from "store/types";
import { connect } from "react-redux";
import { pagePush } from "slices/modes";
import { ActionCreatorWithOptionalPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { PAGE_TYPE_ID } from "../../main-container/component";

type CurrentEventProps = {
  headlines: Headline[];
  headlinesLoading: boolean;
  currentHeadlineId: number | undefined;
  setCurrentHeadline: ActionCreatorWithOptionalPayload<Headline | undefined, string>;
  setCurrentHeadlineId: ActionCreatorWithOptionalPayload<number | undefined, string>;
  pagePush: ActionCreatorWithPayload<string, string>;
  footerHeading: string;
  getCurrentHeadlineIndex: () => { index: number; total: number; headlines: Headline[] };
};

/** Menu view to show a singular extreme event. */
const CurrentEvent = ({
  headlines,
  headlinesLoading,
  currentHeadlineId,
  setCurrentHeadline,
  setCurrentHeadlineId,
  pagePush,
  footerHeading,
  getCurrentHeadlineIndex
}: CurrentEventProps) => {
  const [nextHeadlineEl, setNextHeadlineEl] = useState<Element | null>();
  const [prevHeadlineEl, setPrevHeadlineEl] = useState<Element | null>();

  /** Navigates to view all events view. */
  const viewAllExtremeEvents = () => {
    setCurrentHeadline(undefined);
    setCurrentHeadlineId(undefined);
    pagePush(PAGE_TYPE_ID.EXTREME_EVENTS_LIST_PAGE);
    fireEvent(VIEW_ALL_EXTREME_EVENTS, "web_earth_hq_carousel");
  };

  /** Moves headlines. */
  const navigateHeadline = (action: string) => {
    const { index, total } = getCurrentHeadlineIndex();

    if (action === "back" && prevHeadlineEl) {
      prevHeadlineEl.scrollTop = 0;
      prevHeadlineEl.scrollIntoView({
        behavior: index === 0 ? "auto" : "smooth",
        block: "nearest",
        inline: "nearest"
      });
    } else if (nextHeadlineEl) {
      nextHeadlineEl.scrollTop = 0;
      nextHeadlineEl.scrollIntoView({
        behavior: index === total - 1 ? "auto" : "smooth",
        block: "nearest",
        inline: "nearest"
      });
    }
  };

  // Scrolls to the initial article
  useEffect(() => {
    setTimeout(() => {
      const targetEl = document.getElementById(`headline-${currentHeadlineId}`);

      if (!targetEl) return;

      targetEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest"
      });
    }, 1000);
    // eslint-disable-next-line
  }, []);

  // Observes each item and checks if in viewport
  useEffect(() => {
    const root = document.getElementById("events");

    if (!root) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const newHeadline = headlines.find(headline => entry.target.id === `headline-${headline.id}`);

          if (!entry.isIntersecting || !newHeadline) return;

          setCurrentHeadline(newHeadline);
          setCurrentHeadlineId(newHeadline.id);
          setNextHeadlineEl(entry.target.nextElementSibling ?? entry.target.parentElement?.firstElementChild);
          setPrevHeadlineEl(entry.target.previousElementSibling ?? entry.target.parentElement?.lastElementChild);
        });
      },
      {
        root,
        rootMargin: "0px",
        threshold: 1
      }
    );

    root.childNodes.forEach(node => {
      observer.observe(node as Element);
    });

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line
  }, [headlinesLoading]);

  return (
    <>
      {headlinesLoading ? (
        <EventSkeleton />
      ) : (
        <div id="events" className={styles["c-home-menu__events"]}>
          {headlines.map(headline => (
            <Event key={headline.id} headline={headline} onViewAllEventsClicked={viewAllExtremeEvents} />
          ))}
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
    currentHeadlineId: state.headlines.currentHeadlineId
  }),
  {
    setCurrentHeadline,
    setCurrentHeadlineId,
    pagePush
  }
)(CurrentEvent);
