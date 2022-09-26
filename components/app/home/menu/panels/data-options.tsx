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

type DataIndexProps = {
  highlights: Mode[] | undefined;
  defaultMode: Mode | undefined;
  currentMode: Mode | undefined;
  onClickExtremeEvents: () => void;
  onClickDataLayer: ActionCreatorWithPayload<Mode, string>;
  onViewDataLayerSummary: ActionCreatorWithPayload<Mode, string>;
};

const DataIndex = ({
  highlights,
  defaultMode,
  currentMode,
  onClickExtremeEvents,
  onClickDataLayer,
  onViewDataLayerSummary
}: DataIndexProps) => {
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
      <MenuOption
        isSelected={currentMode?.id === defaultMode?.id}
        className={styles["c-home-menu__all-events"]}
        title="All Extreme Events"
        description="Stay up to date with Mongabay’s latest extreme events and the places being affected. Learn more about the planetary emergency with real-time data."
        buttonText="View All"
        onClick={defaultMode ? () => onClickDataLayer(defaultMode) : undefined}
        onClickCta={onClickExtremeEvents}
      />
      {dataLayers
        .sort((a, b) => ((modeEventCount[a.id] ?? 0) > (modeEventCount[b.id] ?? 0) ? -1 : 1))
        .filter(({ id }) => (modeEventCount[id] ?? 0) > 0)
        .map(dataLayer => (
          <MenuOption isSelected={currentMode?.id === dataLayer.id} key={dataLayer.id} {...dataLayer} />
        ))}

      <Link href="https://earth.nullschool.net/">
        <a rel="noopener noreferrer" target="_blank" onClick={() => fireEvent(ADVANCED_MENU, null)}>
          <ContentPanel className={styles["c-home-menu-item--advanced-data-item"]} canFocus={true}>
            <h3 className={styles["c-home-menu-item__title"]}>Advanced Data</h3>
            <p className={styles["c-home-menu-item__desc"]}>
              Dive deeper into the full datasets available. Combine and overlay data to create unique maps and
              visualizations.
            </p>

            <div className={styles["c-home-menu-item__external-link"]}>
              <Image width={16} height={16} alt="" role="presentation" src={ExternalLinkIcon} />
              <span>Earth Nullschool</span>
            </div>
          </ContentPanel>
        </a>
      </Link>
    </div>
  );
};

export default connect(
  (state: RootState) => ({
    defaultMode: state[modesSliceName].defaultMode,
    currentMode: state[modesSliceName].currentMode,
    highlights: state[modesSliceName].allModes?.filter(mode => mode.attributes.visibility.data_highlights)
  }),
  {}
)(DataIndex);
