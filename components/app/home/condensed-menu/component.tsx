import IconButton from "components/ui/icon-button";
import React from "react";
import { getMenuTitle } from "services/gca";
import { Headline } from "slices/headlines";
import { Mode } from "slices/modes";
import { DATA_LAYER_PAGE_ID } from "../main-container/component";
import styles from "./condensed-menu.module.scss";
import Scale from "components/app/home/scale";

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
  return (
    <>
      <div className={styles["c-condensed-menu"]}>
        <div className={styles["c-condensed-menu__title-container"]}>
          {pageTypeId == DATA_LAYER_PAGE_ID && currentMode && (
            <div className={styles["icon-container"]}>
              <img src={currentMode.attributes.icon} alt={currentMode.attributes.title} />
            </div>
          )}
          <p className={styles["title"]}>{getMenuTitle(currentHeadline, currentMode, pageTypeId)}</p>
          <IconButton
            onClick={handleToggleLocation}
            name="location"
            className={styles["location-icon"]}
            disabled={isLocationDisabled}
            small
          />
          <IconButton onClick={toggleMenu} name="expand" size={16} className={styles["expand-icon"]} small />
        </div>
        {currentMode?.id !== defaultMode?.id && (
          <Scale hidden={currentMode?.id === defaultMode?.id} hideTooltipLabel isHorizontal />
        )}
      </div>
    </>
  );
};

export default CondensedMenu;
