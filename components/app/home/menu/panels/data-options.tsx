import ContentPanel from "components/app/home/content-panel";
import { useState, useMemo, useEffect } from "react";
import styles from "../menu.module.scss";
import { connect } from "react-redux";
import { RootState } from "store/types";
import { NAME as modesSliceName, Mode } from "slices/modes";
import MenuOption from "components/app/home/menu-option";
import Link from "next/link";
import Image from "next/image";
import ExternalLinkIcon from "public/static/icons/external-link-v2.svg";
import { ActionCreatorWithPayload, current } from "@reduxjs/toolkit";
import dataLayer from "./data-layer";
import { fetchClimateAlerts } from "services/gca";

const mapHighlightToOption = (
  mode: Mode,
  onClickDataLayer: ActionCreatorWithPayload<Mode, string>,
  onViewDataLayerSummary: ActionCreatorWithPayload<Mode, string>,
  headlineTotal: number
) => {
  const { id, attributes } = mode;
  return {
    id,
    ...attributes,
    buttonText: "Learn More",
    onClick: () => onClickDataLayer(mode),
    onClickCta: () => onViewDataLayerSummary(mode),
    headlineTotal
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
  const [modeHeadlinesTotal, setModeHeadlinesTotal] = useState<{ [id: string]: number }>({});
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const getModeHeadlinesTotal = async (id: number) => {
    try {
      const resp = await fetchClimateAlerts({ mode_id: id });
      // @ts-expect-error
      return resp.data?.data.length;
    } catch (err) {
      console.log("Error fetching headlines", err);
    }
  };

  const getModesHeadlinesTotal = async () => {
    let modeHeadlinesTotal: { [id: number]: number } = {};
    if (!highlights) return;
    for (const { id } of highlights) {
      const total = await getModeHeadlinesTotal(id);
      if (typeof total === "number") modeHeadlinesTotal[id] = total;
    }
    setModeHeadlinesTotal(modeHeadlinesTotal);
    setIsFetching(false);
  };

  useEffect(() => {
    setIsFetching(true);
    getModesHeadlinesTotal();
  }, [highlights]);

  const dataLayers = useMemo(
    () =>
      highlights?.map(highlight =>
        mapHighlightToOption(highlight, onClickDataLayer, onViewDataLayerSummary, modeHeadlinesTotal[highlight.id] ?? 0)
      ) || [],
    [highlights, onClickDataLayer, modeHeadlinesTotal]
  );

  return (
    <div className={styles["c-home-menu__scroll-area"]}>
      <MenuOption
        isSelected={currentMode?.id === defaultMode?.id}
        className={styles["c-home-menu__all-events"]}
        title="All Extreme Events"
        description="View all of the latest extreme events"
        buttonText="View All"
        onClick={defaultMode ? () => onClickDataLayer(defaultMode) : undefined}
        onClickCta={onClickExtremeEvents}
      />
      {!isFetching &&
        dataLayers
          .sort((a, b) => (a.headlineTotal > b.headlineTotal ? -1 : 1))
          .filter(({ headlineTotal }) => headlineTotal > 0)
          .map(dataLayer => (
            <MenuOption isSelected={currentMode?.id === dataLayer.id} key={dataLayer.id} {...dataLayer} />
          ))}

      <Link href="https://earth.nullschool.net/">
        <a rel="noopener noreferrer" target="_blank">
          <ContentPanel className={styles["c-home-menu-item--advanced-data-item"]} canFocus={true}>
            <h3 className={styles["c-home-menu-item__title"]}>Advanced Data</h3>
            <p className={styles["c-home-menu-item__desc"]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

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
