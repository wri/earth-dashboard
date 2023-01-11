import { PAGE_TYPE_ID } from "components/app/home/main-container/component";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { fetchClimateAlertById, fetchClimateAlerts } from "services/gca";
import { Headline } from "slices/headlines";
import { Mode } from "slices/modes";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { ShareType } from "slices/common";

const EXTREME_EVENTS_MAX = 50;

type UseHeadlineConfig = {
  currentMode?: Mode;
  defaultMode?: Mode;
  setHeadlines: ActionCreatorWithPayload<Headline[], string>;
  setHeadlinesLoading: ActionCreatorWithPayload<boolean, string>;
  pageTypeId: string;
  routePageTypeId: string;
  currentHeadlineId: number | undefined;
  outdatedHeadline: Headline | undefined;
  setOutdatedHeadline: ActionCreatorWithPayload<Headline | undefined, string>;
  share: ShareType;
};

const useHeadlines = ({
  setHeadlinesLoading,
  currentMode,
  defaultMode,
  setHeadlines,
  pageTypeId,
  currentHeadlineId,
  routePageTypeId,
  setOutdatedHeadline,
  share
}: UseHeadlineConfig) => {
  const router = useRouter();

  // Set headlines redux if mobile
  useEffect(() => {
    (async () => {
      setHeadlinesLoading(true);
      try {
        const mode_id = currentMode?.id === defaultMode?.id ? undefined : currentMode?.id;

        let numberOfHeadlines = mode_id
          ? 10
          : pageTypeId === PAGE_TYPE_ID.CURRENT_EVENT_PAGE
          ? routePageTypeId === PAGE_TYPE_ID.INFO_PAGE
            ? 10
            : EXTREME_EVENTS_MAX
          : pageTypeId === PAGE_TYPE_ID.INFO_PAGE
          ? 10
          : EXTREME_EVENTS_MAX;

        const isEventInfo = router.pathname === "/" && pageTypeId === PAGE_TYPE_ID.INFO_PAGE;

        // Fetches all or mode specific events for explore page
        const resp = await fetchClimateAlerts({
          count: EXTREME_EVENTS_MAX,
          in_top_events: EXTREME_EVENTS_MAX,
          mode_id: isEventInfo ? undefined : mode_id
        });

        if (currentHeadlineId) {
          resp.data.data.forEach((headline: Headline, index: number) => {
            if (headline.id === currentHeadlineId) {
              if (index >= 10 && index < EXTREME_EVENTS_MAX) {
                numberOfHeadlines = EXTREME_EVENTS_MAX;
              }
            }
          });

          // Shows single shared event
          if (
            share === "event" &&
            !(resp.data.data as Headline[]).map(headline => headline.id).includes(currentHeadlineId)
          ) {
            try {
              const singleResp = await fetchClimateAlertById(currentHeadlineId.toString());
              setOutdatedHeadline(singleResp.data.data);
            } catch (e) {
              router.push("/404");
            }
          }
        }

        const filteredHeadlines = (resp.data.data as Headline[]).slice(0, numberOfHeadlines);

        setHeadlines(filteredHeadlines);
      } catch (err) {
        console.log("Error fetching modes");
      } finally {
        setHeadlinesLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, [setHeadlines, currentMode, pageTypeId]);
};

export default useHeadlines;
