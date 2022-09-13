import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import ResizablePanel from "./resizable-panel";
import styles from "./menu-mobile-container.module.scss";

type MenuMobileContainerProps = {
  defaultPanelHeight: number;
  panelHeight: number;
  setPanelHeight: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

const MenuMobileContainer = ({
  defaultPanelHeight,
  panelHeight,
  setPanelHeight,
  children
}: MenuMobileContainerProps) => {
  const TRANSITION_DURATION = 400;

  const [zIndex, setZIndex] = useState<number>(0);

  useEffect(() => {
    if (panelHeight > defaultPanelHeight) setZIndex(10);
    else setTimeout(() => setZIndex(0), TRANSITION_DURATION);
  }, [panelHeight]);

  const handleResize = (e: any, direction: any, div: any) => setPanelHeight(div.offsetHeight);

  return (
    <div className={styles["c-mobile-menu-container"]} style={{ zIndex, height: panelHeight }}>
      <ResizablePanel defaultHeight={defaultPanelHeight} height={panelHeight} onResize={handleResize}>
        <div
          style={{
            opacity: panelHeight > defaultPanelHeight ? 1 : 0,
            transition: `all ${TRANSITION_DURATION}ms`
          }}
        >
          {children}
        </div>
      </ResizablePanel>
    </div>
  );
};

export default MenuMobileContainer;
