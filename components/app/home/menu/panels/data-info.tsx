import React from "react";
import EventPrompt from "../../event-prompt";
import styles from "../menu.module.scss";

type DataInfoProps = {};

const DataInfo = ({}: DataInfoProps) => {
  return (
    <div className={styles["c-home-menu__scroll-area"]} style={{ paddingTop: 84 }}>
      <EventPrompt />
    </div>
  );
};

export default DataInfo;
