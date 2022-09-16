import React from "react";
import IconButton from "components/ui/icon-button";
import classnames from "classnames";
import styles from "./headline-footer.module.scss";

type HeadlineFooterProps = {
  footerHeading: string;
  disableBackButton: boolean;
  disableNextButton: boolean;
  onTouchStart: () => void;
  onTouchMove: () => void;
  onTouchEnd: () => void;
  navigateHeadline: (action: string) => void;
};

export default function HeadlineFooter({
  footerHeading,
  disableBackButton,
  disableNextButton,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  navigateHeadline
}: HeadlineFooterProps) {
  return (
    <div
      className={classnames(styles["c-home-menu__footer"])}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <IconButton
        name="arrow-left"
        size={16}
        className={classnames(styles["c-home-menu__footer--btn"])}
        disabled={disableBackButton}
        onClick={() => navigateHeadline("back")}
      />
      <div className={classnames(styles["c-home-menu__footer--info"])}>
        <h3>{footerHeading}</h3>
      </div>
      <IconButton
        name="arrow-right"
        size={16}
        className={classnames(styles["c-home-menu__footer--btn"])}
        disabled={disableNextButton}
        onClick={() => navigateHeadline("next")}
      />
    </div>
  );
}
