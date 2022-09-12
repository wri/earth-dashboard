import classnames from "classnames";
import Icon, { IconNames } from "components/ui/Icon";
import React from "react";
import styles from "./share-row.module.scss";

type ShareRowProps = {
  text: string;
  icon: IconNames;
  onClick: () => void;
  className?: string;
};

const ShareRow = ({ text, icon, onClick, className }: ShareRowProps) => {
  return (
    <button onClick={onClick} className={classnames(styles["c-share-row"], className)}>
      <div className={styles["icon"]}>
        <Icon name={icon} size={icon === "copy-link" || icon === "more" ? 22 : 26} type="decorative" />
      </div>
      <p className={classnames(styles["c-share-row__text"])}>{text}</p>
    </button>
  );
};

export default ShareRow;
