import IconButton from "components/ui/icon-button";
import React from "react";
import { getMenuTitle } from "services/gca";
import { Headline } from "slices/headlines";
import { Mode } from "slices/modes";
import styles from "./condensed-menu.module.scss";
import Scale from "components/app/home/scale";
import { PAGE_TYPE_ID } from "../main-container/component";
import EventPrompt from "../event-prompt";
import classnames from "classnames";

type CondensedMenuProps = {
  toggleMenu: () => void;
  pageTypeId: string;
  handleToggleLocation: () => void;
  isLocationDisabled: boolean;
  currentHeadline: Headline | undefined;
  currentMode: Mode | undefined;
  defaultMode?: Mode;
};

const CondensedMenu = ({
  toggleMenu,
  pageTypeId,
  handleToggleLocation,
  isLocationDisabled,
  currentHeadline,
  currentMode,
  defaultMode
}: CondensedMenuProps) => {
  const icon =
    currentMode && currentMode.attributes.title !== "Default"
      ? currentMode.attributes.icon
      : currentHeadline?.attributes.mode.attributes.icon;

  const alt =
    currentMode && currentMode.attributes.title !== "Default"
      ? currentMode.attributes.title
      : currentHeadline?.attributes.mode.attributes.title;

  return (
    <div className={styles["c-condensed-menu"]}>
      <div className={styles["c-condensed-menu__title-container"]}>
        {pageTypeId !== PAGE_TYPE_ID.INFO_PAGE &&
          ((currentMode && currentMode.attributes.title !== "Default") || currentHeadline) && (
            <div className={styles["icon-container"]}>
              <img src={icon} alt={alt} />
            </div>
          )}
        <p className={classnames(styles["title"], pageTypeId !== PAGE_TYPE_ID.INFO_PAGE && styles["title-condensed"])}>
          {getMenuTitle(currentHeadline, currentMode, pageTypeId)}
        </p>
        <IconButton
          onClick={handleToggleLocation}
          name="location"
          className={styles["location-icon"]}
          disabled={isLocationDisabled}
          small
        />
        <IconButton onClick={toggleMenu} name="expand" size={16} className={styles["expand-icon"]} small />
      </div>
      {pageTypeId === PAGE_TYPE_ID.INFO_PAGE && <EventPrompt />}
      {currentMode?.id !== defaultMode?.id && (
        <Scale hidden={currentMode?.id === defaultMode?.id} hideTooltipLabel isHorizontal />
      )}
    </div>
  );
};

export default CondensedMenu;
