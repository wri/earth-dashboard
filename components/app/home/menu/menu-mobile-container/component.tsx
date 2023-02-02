import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import ResizablePanel from "./resizable-panel";
import styles from "./menu-mobile-container.module.scss";
import CondensedMenu from "../../condensed-menu";
import { PAGE_TYPE_ID } from "../../main-container/component";
import { useRouter } from "next/router";

type MenuMobileContainerProps = {
  defaultPanelHeight: number;
  panelHeight: number;
  setPanelHeight: Dispatch<SetStateAction<number>>;
  toggleMenu: () => void;
  pageTypeId: string;
  handleToggleLocation: () => void;
  isLocationDisabled: boolean;
  hasMenuOpen: boolean;
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
  const router = useRouter();

  const [windowHeight, setWindowHeight] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") setWindowHeight(window.innerHeight);
  }, []);

  const isInfoPage = pageTypeId === PAGE_TYPE_ID.INFO_PAGE && router?.pathname === "/";
  const isDataInfoPage = pageTypeId === PAGE_TYPE_ID.INFO_PAGE && router?.pathname === "/explore";

  const snapHeights = isInfoPage
    ? [defaultPanelHeight, 398]
    : isDataInfoPage
    ? [defaultPanelHeight, 440]
    : [defaultPanelHeight, windowHeight * 0.6, windowHeight * 0.9];

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
      style={{ height: panelHeight, zIndex: pageTypeId === PAGE_TYPE_ID.INFO_PAGE || !hasMenuOpen ? 1000 : 1001 }}
    >
      <ResizablePanel
        defaultHeight={defaultPanelHeight}
        height={panelHeight}
        onResize={handleResize}
        onResizeStop={handleResizeStop}
        maxHeight={isInfoPage ? "398px" : isDataInfoPage ? "440px" : `${windowHeight * 0.9}px`}
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
