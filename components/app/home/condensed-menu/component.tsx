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
import { useRouter } from "next/router";

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
  const router = useRouter();

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
      {/* Resizable handle */}
      <div className={styles["c-condensed-menu__handle"]} />

      {/* Content */}
      <div className={styles["c-condensed-menu__title-container"]}>
        {(pageTypeId !== PAGE_TYPE_ID.INFO_PAGE || router?.pathname === "/explore") &&
          ((currentMode && currentMode.attributes.title !== "Default") || currentHeadline) && (
            <div className={styles["icon-container"]}>
              <img src={icon} alt={alt} />
            </div>
          )}
        <p className={classnames(styles["title"], pageTypeId !== PAGE_TYPE_ID.INFO_PAGE && styles["title-condensed"])}>
          {getMenuTitle(currentHeadline, currentMode, pageTypeId, router?.pathname)}
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
      {pageTypeId === PAGE_TYPE_ID.INFO_PAGE && <EventPrompt isMobile isCondensed />}
      {(currentMode?.id !== defaultMode?.id || router?.pathname === "/explore") && (
        <Scale
          hidden={currentMode?.id === defaultMode?.id && router?.pathname !== "/explore"}
          hideTooltipLabel
          isHorizontal
        />
      )}
    </div>
  );
};

export default CondensedMenu;
