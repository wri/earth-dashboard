import React from "react";
import IconButton from "components/ui/icon-button";
import classnames from "classnames";
import styles from "./headline-footer.module.scss";
import Skeleton from "components/ui/skeleton";

type HeadlineFooterProps = {
  footerHeading: string;
  disableBackButton: boolean;
  disableNextButton: boolean;
  navigateHeadline: (action: string) => void;
  isLoading: boolean;
};

export default function HeadlineFooter({
  footerHeading,
  disableBackButton,
  disableNextButton,
  navigateHeadline,
  isLoading
}: HeadlineFooterProps) {
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
          onClick={() => navigateHeadline("back")}
        />
      )}

      {/* Indicator */}
      {isLoading ? (
        <Skeleton.Text widths={["100%"]} className={styles["c-home-menu__footer--info--skeleton"]} />
      ) : (
        <div className={classnames(styles["c-home-menu__footer--info"])}>
          <h3>{footerHeading}</h3>
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
          onClick={() => navigateHeadline("next")}
        />
      )}
    </div>
  );
}
