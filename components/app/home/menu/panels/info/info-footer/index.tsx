import React from "react";
import IconButton from "components/ui/icon-button";
import classnames from "classnames";
import styles from "./info-footer.module.scss";
import CarouselViewIndicator from "components/ui/carousel-view-indicator";

type InfoFooterProps = {
  disableBackButton: boolean;
  disableNextButton: boolean;
  navigateInfo: (action: string) => void;
  index: number;
  length: number;
};

const InfoFooter = ({ disableBackButton, disableNextButton, navigateInfo, index, length }: InfoFooterProps) => {
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
        <CarouselViewIndicator ids={Array.from(Array(length).keys()).map(String)} activeId={index.toString()} />
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
