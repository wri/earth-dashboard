import { useMemo } from "react";
import styles from "../menu.module.scss";
import { connect } from "react-redux";
import { RootState } from "store/types";
import { NAME as modesSliceName, Mode } from "slices/modes";
import MenuOption from "components/app/home/menu-option";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

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
    onClickCta: () => onViewDataLayerSummary(mode)
  };
};

type DataIndexProps = {
  highlights: Mode[] | undefined;
  defaultMode: Mode | undefined;
  onClickExtremeEvents: () => void;
  onClickDataLayer: ActionCreatorWithPayload<Mode, string>;
  onViewDataLayerSummary: ActionCreatorWithPayload<Mode, string>;
};

const DataIndex = ({
  highlights,
  defaultMode,
  onClickExtremeEvents,
  onClickDataLayer,
  onViewDataLayerSummary
}: DataIndexProps) => {
  const dataLayers = useMemo(
    () => highlights?.map(highlight => mapHighlightToOption(highlight, onClickDataLayer, onViewDataLayerSummary)) || [],
    [highlights, onClickDataLayer]
  );

  console.log("DEFAUT MODE", defaultMode);
  return (
    <div className={styles["c-home-menu__scroll-area"]}>
      <MenuOption
        className={styles["c-home-menu__all-events"]}
        title="All Extreme Events"
        description="View all of the latest extreme events"
        buttonText="View All"
        onClick={() => onClickDataLayer(defaultMode)}
        onClickCta={onClickExtremeEvents}
      />
      {dataLayers.map(dataLayer => (
        <MenuOption key={dataLayer.id} {...dataLayer} />
      ))}
    </div>
  );
};

export default connect(
  (state: RootState) => ({
    defaultMode: state[modesSliceName].defaultMode,
    highlights: state[modesSliceName].allModes?.filter(mode => mode.attributes.visibility.data_highlights)
  }),
  {}
)(DataIndex);
