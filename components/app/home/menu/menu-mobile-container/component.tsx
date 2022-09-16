import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import ResizablePanel from "./resizable-panel";
import styles from "./menu-mobile-container.module.scss";
import CondensedMenu from "../../condensed-menu";
import { INFO_PAGE_ID } from "../../main-container/component";

type MenuMobileContainerProps = {
  defaultPanelHeight: number;
  panelHeight: number;
  setPanelHeight: Dispatch<SetStateAction<number>>;
  toggleMenu: () => void;
  pageTypeId: string;
  handleToggleLocation: () => void;
  isLocationDisabled: boolean;
  hasMenuOpen: ConstrainBooleanParameters;
  children: ReactNode;
};

const MenuMobileContainer = ({
  defaultPanelHeight,
  panelHeight,
  setPanelHeight,
  toggleMenu,
  handleToggleLocation,
  isLocationDisabled,
  pageTypeId,
  hasMenuOpen,
  children
}: MenuMobileContainerProps) => {
  const [windowHeight, setWindowHeight] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") setWindowHeight(window.innerHeight);
  }, []);

  const snapHeights = [defaultPanelHeight, windowHeight * 0.6, windowHeight * 0.9];

  const handleResize = (e: any, direction: any, div: any) => setPanelHeight(div.offsetHeight);

  // Clip to closest snap point when stop resizing
  const handleResizeStop = (e: any, direction: any, div: any) => {
    const currentHeight = div.offsetHeight;
    const closest = snapHeights.reduce((prev, curr) => {
      return Math.abs(curr - currentHeight) < Math.abs(prev - currentHeight) ? curr : prev;
    });
    setPanelHeight(closest);
  };

  return (
    <div
      className={styles["c-mobile-menu-container"]}
      style={{ height: panelHeight, zIndex: pageTypeId === INFO_PAGE_ID || !hasMenuOpen ? 1000 : 1001 }}
    >
      <ResizablePanel
        defaultHeight={defaultPanelHeight}
        height={panelHeight}
        onResize={handleResize}
        onResizeStop={handleResizeStop}
        maxHeight={`${windowHeight * 0.9}px`}
        snap={snapHeights}
      >
        {panelHeight === defaultPanelHeight ? (
          <CondensedMenu
            toggleMenu={toggleMenu}
            pageTypeId={pageTypeId}
            handleToggleLocation={handleToggleLocation}
            isLocationDisabled={isLocationDisabled}
          />
        ) : (
          children
        )}
      </ResizablePanel>
    </div>
  );
};

export default MenuMobileContainer;
