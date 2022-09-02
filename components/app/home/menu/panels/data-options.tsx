import styles from "../menu.module.scss";
import { RadioGroup } from "@headlessui/react";
import classnames from "classnames";
import { connect } from "react-redux";
import { RootState } from "store/types";
import { setCurrentMode, NAME as modesSliceName, Mode } from "slices/modes";
import MenuOption from "components/app/home/menu-option";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

const mapHighlightToOption = ({ id, attributes }: Mode) => {
  return {
    id,
    ...attributes,
    buttonText: "Learn More",
    onClick: () => {}
  };
};

type DataIndexProps = {
  highlights: Mode[] | undefined;
  currentMode: Mode | undefined;
  setCurrentMode: ActionCreatorWithPayload<Mode, string>;
};

const DataIndex = ({ highlights, setCurrentMode, currentMode }: DataIndexProps) => {
  const dataLayers = highlights?.map(mapHighlightToOption) || [];

  return (
    <div className={styles["c-home-menu__scroll-area"]}>
      <MenuOption
        className={styles["c-home-menu__all-events"]}
        title="All Extreme Events"
        description="View all of the latest extreme events"
        buttonText="View All"
        onClick={() => {}}
      />
      {dataLayers.map(dataLayer => (
        <MenuOption key={dataLayer.id} {...dataLayer} />
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
