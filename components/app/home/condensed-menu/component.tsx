import IconButton from "components/ui/icon-button";
import React from "react";
import { Headline } from "slices/headlines";
import { Mode } from "slices/modes";
import {
  DATA_LAYER_PAGE_ID,
  EXTREME_EVENTS_PAGE_HEADLINE,
  EXTREME_EVENTS_PAGE_ID,
  INFO_PAGE_HEADLINE,
  INFO_PAGE_ID
} from "../main-container/component";
import NormalScale from "../normal-scale";
import styles from "./condensed-menu.module.scss";

type CondensedMenuProps = {
  toggleMenu: () => void;
  pageTypeId: string;
  handleToggleLocation: () => void;
  isLocationDisabled: boolean;
  currentHeadline: Headline | undefined;
  currentMode: Mode | undefined;
};

const CondensedMenu = ({
  toggleMenu,
  pageTypeId,
  handleToggleLocation,
  isLocationDisabled,
  currentHeadline,
  currentMode
}: CondensedMenuProps) => {
  const getMenuTitle = () => {
    if (currentHeadline) return currentHeadline.attributes.title;
    if (pageTypeId == INFO_PAGE_ID) return INFO_PAGE_HEADLINE;
    if (pageTypeId == EXTREME_EVENTS_PAGE_ID) return EXTREME_EVENTS_PAGE_HEADLINE;
    if (pageTypeId == DATA_LAYER_PAGE_ID && currentMode) return currentMode.attributes.title;
    return "Extreme Events";
  };

  return (
    <>
      <div className={styles["c-condensed-menu"]}>
        <div
          className={styles["c-condensed-menu__title-container"]}
          // TODO: when we get scale date, change margin else to auto
          style={pageTypeId !== DATA_LAYER_PAGE_ID ? { marginBottom: 0 } : { marginBottom: 0 }}
        >
          {pageTypeId == DATA_LAYER_PAGE_ID && currentMode && (
            <div className={styles["icon-container"]}>
              <img src={currentMode.attributes.icon} alt={currentMode.attributes.title} />
            </div>
          )}
          <p className={styles["title"]}>{getMenuTitle()}</p>
          <IconButton
            onClick={handleToggleLocation}
            name="location"
            className={styles["location-icon"]}
            disabled={isLocationDisabled}
            small
          />
          <IconButton onClick={toggleMenu} name="expand" size={16} className={styles["expand-icon"]} small />
        </div>
        {pageTypeId == DATA_LAYER_PAGE_ID && currentMode && (
          <NormalScale value={50} className={styles["c-normal-scale"]} />
        )}
      </div>
    </>
  );
};

export default CondensedMenu;
