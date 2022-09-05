import { useMemo } from "react";
import styles from "../menu.module.scss";
import { connect } from "react-redux";
import { RootState } from "store/types";
import { NAME as modesSliceName, Mode } from "slices/modes";
import MenuOption from "components/app/home/menu-option";

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
};

const DataIndex = ({ highlights }: DataIndexProps) => {
  const dataLayers = useMemo(() => highlights?.map(mapHighlightToOption) || [], [highlights]);

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
    highlights: state[modesSliceName].allModes?.filter(mode => mode.attributes.visibility.data_highlights)
  }),
  {}
)(DataIndex);
