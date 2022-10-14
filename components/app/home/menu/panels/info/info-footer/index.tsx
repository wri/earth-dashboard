import React from "react";
import IconButton from "components/ui/icon-button";
import classnames from "classnames";
import styles from "./info-footer.module.scss";
import CarouselViewIndicator from "components/ui/carousel-view-indicator";
import Skeleton from "components/ui/skeleton";

type InfoFooterProps = {
  disableBackButton: boolean;
  disableNextButton: boolean;
  navigateInfo: (action: string) => void;
  index: number;
  length: number;
  isLoading: boolean;
};

/** Controls for the info panel. */
const InfoFooter = ({
  disableBackButton,
  disableNextButton,
  navigateInfo,
  index,
  length,
  isLoading
}: InfoFooterProps) => {
  return (
    <div className={classnames(styles["c-home-menu__footer"])}>
      {/* Back button */}
      {isLoading ? (
        <Skeleton.IconButton variant="sm" />
      ) : (
        <IconButton
          name="arrow-left"
          size={16}
          className={classnames(styles["c-home-menu__footer--btn"])}
          disabled={disableBackButton}
          onClick={() => navigateInfo("back")}
        />
      )}

      {/* Indicator */}
      {isLoading ? (
        <Skeleton.Text widths={["100%"]} className={styles["c-home-menu__footer--info--skeleton"]} />
      ) : (
        <div className={classnames(styles["c-home-menu__footer--info"])}>
          <CarouselViewIndicator ids={Array.from(Array(length).keys()).map(String)} activeId={index.toString()} />
        </div>
      )}

      {/* Next button */}
      {isLoading ? (
        <Skeleton.IconButton variant="sm" />
      ) : (
        <IconButton
          name="arrow-right"
          size={16}
          className={classnames(styles["c-home-menu__footer--btn"])}
          disabled={disableNextButton}
          onClick={() => navigateInfo("next")}
        />
      )}
    </div>
  );
};

export default InfoFooter;
