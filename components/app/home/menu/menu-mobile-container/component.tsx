import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import ResizablePanel from "./resizable-panel";
import styles from "./menu-mobile-container.module.scss";

type MenuMobileContainerProps = {
  defaultPanelHeight: number;
  panelHeight: number;
  setPanelHeight: Dispatch<SetStateAction<number>>;
  children: ReactNode;
};

const MenuMobileContainer = ({
  defaultPanelHeight,
  panelHeight,
  setPanelHeight,
  children
}: MenuMobileContainerProps) => {
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const zIndex = panelHeight > defaultPanelHeight ? 1000 : 0;
  const navbarHeight = 56;

  useEffect(() => {
    if (typeof window !== "undefined") setWindowHeight(window.innerHeight);
  }, []);

  const snapHeights = [defaultPanelHeight, windowHeight * 0.6 - navbarHeight, windowHeight * 0.9 - navbarHeight];

  const handleResize = (e: any, direction: any, div: any) => setPanelHeight(div.offsetHeight);

  const handleResizeStop = (e: any, direction: any, div: any) => {
    const currentHeight = div.offsetHeight;
    const closest = snapHeights.reduce((prev, curr) => {
      return Math.abs(curr - currentHeight) < Math.abs(prev - currentHeight) ? curr : prev;
    });
    setPanelHeight(closest);
  };

  return (
    <div className={styles["c-mobile-menu-container"]} style={{ zIndex, height: panelHeight }}>
      <ResizablePanel
        defaultHeight={defaultPanelHeight}
        height={panelHeight}
        onResize={handleResize}
        onResizeStop={handleResizeStop}
        maxHeight={`${windowHeight * 0.9 - navbarHeight}px`}
        snap={snapHeights}
      >
        {children}
      </ResizablePanel>
    </div>
  );
};

export default MenuMobileContainer;
