import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import ResizablePanel from "./resizable-panel";
import styles from "./menu-mobile-container.module.scss";
import CondensedMenu from "../../condensed-menu";

type MenuMobileContainerProps = {
  defaultPanelHeight: number;
  panelHeight: number;
  setPanelHeight: Dispatch<SetStateAction<number>>;
  toggleMenu: () => void;
  pageTypeId: string;
  handleToggleLocation: () => void;
  isLocationDisabled: boolean;
  children: ReactNode;
};

const MenuMobileContainer = ({
  defaultPanelHeight,
  panelHeight,
  setPanelHeight,
  toggleMenu,
  pageTypeId,
  handleToggleLocation,
  isLocationDisabled,
  children
}: MenuMobileContainerProps) => {
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const navbarHeight = 56;

  useEffect(() => {
    if (typeof window !== "undefined") setWindowHeight(window.innerHeight);
  }, []);

  const snapHeights = [defaultPanelHeight, windowHeight * 0.6 - navbarHeight, windowHeight * 0.9 - navbarHeight];

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
    <div className={styles["c-mobile-menu-container"]} style={{ height: panelHeight }}>
      <ResizablePanel
        defaultHeight={defaultPanelHeight}
        height={panelHeight}
        onResize={handleResize}
        onResizeStop={handleResizeStop}
        maxHeight={`${windowHeight * 0.9 - navbarHeight}px`}
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
