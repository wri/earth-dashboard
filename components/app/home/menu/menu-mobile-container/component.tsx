import { Dispatch, ReactNode, SetStateAction } from "react";
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
  const zIndex = panelHeight > defaultPanelHeight ? 1001 : 0;

  const handleResize = (e: any, direction: any, div: any) => setPanelHeight(div.offsetHeight);

  return (
    <div className={styles["c-mobile-menu-container"]} style={{ zIndex, height: panelHeight }}>
      <ResizablePanel defaultHeight={defaultPanelHeight} height={panelHeight} onResize={handleResize}>
        {children}
      </ResizablePanel>
    </div>
  );
};

export default MenuMobileContainer;
