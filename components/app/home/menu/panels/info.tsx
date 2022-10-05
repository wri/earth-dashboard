import ContentPanel from "components/app/home/content-panel";
import { useEffect, useMemo, useState } from "react";
import styles from "../menu.module.scss";
import { connect } from "react-redux";
import { RootState } from "store/types";
import { NAME as modesSliceName, Mode } from "slices/modes";
import MenuOption from "components/app/home/menu-option";
import Link from "next/link";
import Image from "next/image";
import ExternalLinkIcon from "public/static/icons/external-link-v2.svg";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { fireEvent } from "utils/gtag";
import { ADVANCED_MENU, EARTH_HQ_VIEWED_CATEGORY } from "constants/tag-manager";
import { fetchClimateAlerts } from "services/gca";
import { Headline } from "slices/headlines";
import EventCard from "../../event-card/component";

const mapHighlightToOption = (
  mode: Mode,
  onClickDataLayer: ActionCreatorWithPayload<Mode, string>,
  onViewDataLayerSummary: ActionCreatorWithPayload<Mode, string>
) => {
  const { id, attributes } = mode;
  return {
    id,
    ...attributes,
    buttonText: "Learn More",
    onClick: () => onClickDataLayer(mode),
    onClickCta: () => {
      fireEvent(EARTH_HQ_VIEWED_CATEGORY, attributes.title);
      onViewDataLayerSummary(mode);
    }
  };
};

type InfoPanelProps = {
  headlines: Headline[];
  highlights: Mode[] | undefined;
  defaultMode: Mode | undefined;
  currentMode: Mode | undefined;
  onClickExtremeEvents: () => void;
  onClickDataLayer: ActionCreatorWithPayload<Mode, string>;
  onViewDataLayerSummary: ActionCreatorWithPayload<Mode, string>;
};

const InfoPanel = ({
  headlines,
  highlights,
  defaultMode,
  currentMode,
  onClickExtremeEvents,
  onClickDataLayer,
  onViewDataLayerSummary
}: InfoPanelProps) => {
  const [modeEventCount, setModeEventCount] = useState<{ [id: number]: number }>({});

  const dataLayers = useMemo(
    () => highlights?.map(highlight => mapHighlightToOption(highlight, onClickDataLayer, onViewDataLayerSummary)) || [],
    [highlights, onClickDataLayer, modeEventCount]
  );

  // Set headlines redux if mobile
  useEffect(() => {
    const getModeEventCount = async () => {
      try {
        const resp = await fetchClimateAlerts();

        const filteredHeadlines =
          // @ts-expect-error
          resp.data.data.reverse().slice(0, 25);

        let modeEventCount: { [id: number]: number } = {};

        filteredHeadlines.forEach((headline: Headline) => {
          const mode_id = headline.attributes.mode.id;
          if (modeEventCount[mode_id]) modeEventCount[mode_id] += 1;
          else modeEventCount[mode_id] = 1;
        });
        setModeEventCount(modeEventCount);
      } catch (err) {
        console.log("Error fetching modes");
      }
    };

    getModeEventCount();
  }, [setModeEventCount]);

  return (
    <div className={styles["c-home-menu__scroll-area"]}>
      {headlines.map(headline => (
        <EventCard headline={headline} onClick={() => {}} type="Condensed" key={headline.id} />
      ))}
    </div>
  );
};

export default connect(
  (state: RootState) => ({
    defaultMode: state[modesSliceName].defaultMode,
    currentMode: state[modesSliceName].currentMode,
    highlights: state[modesSliceName].allModes?.filter(mode => mode.attributes.visibility.data_highlights),
    headlines: state.headlines.headlines
  }),
  {}
)(InfoPanel);
