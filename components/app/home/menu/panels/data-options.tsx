import styles from "../menu.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { connect } from "react-redux";
import { RootState } from "store/types";
import { setCurrentMode, NAME as modesSliceName, Mode } from "slices/modes";
import MenuOption from "components/app/home/menu-option";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

const ALL_EVENTS_ID = -1;

const mapHighlightToOption = ({ id, attributes }: Mode, setFocusedPanel: Dispatch<SetStateAction<Number | null>>) => {
  return {
    id,
    ...attributes,
    buttonText: "Learn More",
    focusAction: () => setFocusedPanel(id),
    ctaAction: () => {}
  };
};

type DataIndexProps = {
  highlights: Mode[] | undefined;
  currentMode: Mode | undefined;
  setCurrentMode: ActionCreatorWithPayload<Mode, string>;
};

const DataIndex = ({ highlights, setCurrentMode, currentMode }: DataIndexProps) => {
  const [focusedPanel, setFocusedPanel] = useState<Number | null>(null);
  const dataLayers = highlights?.map(highlight => mapHighlightToOption(highlight, setFocusedPanel)) || [];

  return (
    <div className={styles["c-home-menu__scroll-area"]}>
      <MenuOption
        className={styles["c-home-menu__all-events"]}
        title="All Extreme Events"
        description="View all of the latest extreme events"
        buttonText="View All"
        isFocussed={focusedPanel == ALL_EVENTS_ID}
        focusAction={() => setFocusedPanel(ALL_EVENTS_ID)}
        ctaAction={() => {}}
      />
      {dataLayers.map(dataLayer => (
        <MenuOption key={dataLayer.id} {...dataLayer} isFocussed={focusedPanel == dataLayer.id} />
      ))}
    </div>
  );
};

export default connect(
  (state: RootState) => ({
    highlights: state[modesSliceName].allModes?.filter(mode => mode.attributes.visibility.data_highlights),
    currentMode: state[modesSliceName].currentMode
  }),
  { setCurrentMode }
)(DataIndex);
