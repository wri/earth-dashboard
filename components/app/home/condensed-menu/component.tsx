import IconButton from "components/ui/icon-button";
import React from "react";
import { getMenuTitle } from "services/gca";
import { Headline } from "slices/headlines";
import { Mode } from "slices/modes";
import { DATA_LAYER_PAGE_ID } from "../main-container/component";
import NormalScale from "../normal-scale";
import styles from "./condensed-menu.module.scss";
import Scale from "components/app/home/scale";

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
        <Scale isHorizontal />
        {pageTypeId == DATA_LAYER_PAGE_ID && currentMode && (
          <NormalScale value={50} className={styles["c-normal-scale"]} />
        )}
      </div>
    </>
  );
};

export default CondensedMenu;
