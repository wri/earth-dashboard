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
  checkCurrentHeadline: () => void;
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
  checkCurrentHeadline
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
    if (action === "back" && prevHeadlineEl) {
      prevHeadlineEl.scrollTop = 0;
      prevHeadlineEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest"
      });
    } else if (nextHeadlineEl) {
      nextHeadlineEl.scrollTop = 0;
      nextHeadlineEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest"
      });
    }
  };

  // Scrolls to the initial article
  useEffect(() => {
    const targetEl = document.getElementById(`headline-${currentHeadlineId}`);

    if (!targetEl) return;

    targetEl.scrollIntoView();
    // eslint-disable-next-line
  }, [headlinesLoading]);

  // Observes each item and checks if in viewport
  useEffect(() => {
    const root = document.getElementById("events");

    if (!root) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const isFirst = entry.target.getAttribute("data-first");
          const isLast = entry.target.getAttribute("data-last");

          if (isFirst) {
            const lastEl = root.lastElementChild?.previousElementSibling;
            lastEl?.scrollIntoView();
          }
          if (isLast) {
            const firstEl = root.firstElementChild?.nextElementSibling;
            firstEl?.scrollIntoView();
          }

          const newHeadline = headlines.find(headline => entry.target.id === `headline-${headline.id}`);

          if (!newHeadline) return;

          setCurrentHeadline(newHeadline);
          setCurrentHeadlineId(newHeadline.id);
          setNextHeadlineEl(entry.target.nextElementSibling);
          setPrevHeadlineEl(entry.target.previousElementSibling);

          checkCurrentHeadline();
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
    currentHeadlineId: state.headlines.currentHeadlineId
  }),
  {
    setCurrentHeadline,
    setCurrentHeadlineId,
    pagePush
  }
)(CurrentEvent);
