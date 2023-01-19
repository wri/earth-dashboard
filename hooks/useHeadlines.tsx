/**
 * Note - this hook was extracted from useIframeBridge 11/01/23
 * TODO: Refactor this component so it is easy to work with
 * at the momment it is really hard to follow the code. Suggested improvements:
 * - Use redux hooks instead of passing them in as props
 * - Remove redux dependency completely and return data in hook itself?
 * - Clean up that nested turnary statement below
 * - We seem to request based off of EXTREME_EVENTS_MAX then do further slicing,
 *   we should just set the number we need first then do the request?
 */

import { PAGE_TYPE_ID } from "components/app/home/main-container/component";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchClimateAlertById, fetchClimateAlerts } from "services/gca";
import { Headline } from "slices/headlines";
import { Mode, selectPageTypeIdStack } from "slices/modes";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { ShareType } from "slices/common";

const EXTREME_EVENTS_MAX = 50; // Number of max extreme events on the "Extreme Events" page
const EXTREME_EVENTS_PER_MODE_MAX = 20; // Number of max extreme events when viewing a mode. (Event trend)
const EXTREME_EVENTS_INFO_PAGE_MAX = 10; // Number of max extreme events when viewing the Info Pages. (Extreme Events and Extreme Trends)

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
  const pageTypeIdStack = useSelector(selectPageTypeIdStack);

  useEffect(() => {
    (async () => {
      setHeadlinesLoading(true);
      try {
        const mode_id = currentMode?.id === defaultMode?.id ? undefined : currentMode?.id;

        let numberOfHeadlines = EXTREME_EVENTS_PER_MODE_MAX;

        if (!mode_id) {
          if (
            pageTypeId === PAGE_TYPE_ID.INFO_PAGE ||
            (pageTypeId === PAGE_TYPE_ID.CURRENT_EVENT_PAGE &&
              pageTypeIdStack[1] !== PAGE_TYPE_ID.EXTREME_EVENTS_LIST_PAGE)
          ) {
            numberOfHeadlines = EXTREME_EVENTS_INFO_PAGE_MAX;
          } else {
            numberOfHeadlines = EXTREME_EVENTS_MAX;
          }
        }

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
              if (index >= EXTREME_EVENTS_PER_MODE_MAX && index < EXTREME_EVENTS_MAX) {
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
