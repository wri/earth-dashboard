import React from "react";
import IconButton from "components/ui/icon-button";
import classnames from "classnames";
import styles from "./info-footer.module.scss";

type InfoFooterProps = {
  disableBackButton: boolean;
  disableNextButton: boolean;
  navigateInfo: (action: string) => void;
};

const InfoFooter = ({ disableBackButton, disableNextButton, navigateInfo }: InfoFooterProps) => {
  return (
    <div className={classnames(styles["c-home-menu__footer"])}>
      <IconButton
        name="arrow-left"
        size={16}
        className={classnames(styles["c-home-menu__footer--btn"])}
        disabled={disableBackButton}
        onClick={() => navigateInfo("back")}
      />
      <div className={classnames(styles["c-home-menu__footer--info"])}>
        <h3>test</h3>
      </div>
      <IconButton
        name="arrow-right"
        size={16}
        className={classnames(styles["c-home-menu__footer--btn"])}
        disabled={disableNextButton}
        onClick={() => navigateInfo("next")}
      />
    </div>
  );
};

export default InfoFooter;
