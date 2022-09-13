import { Resizable } from "re-resizable";
import { ReactNode } from "react";
import styles from "./menu-mobile-container.module.scss";

type ResizablePanelProps = {
  defaultHeight: number;
  height: number;
  onResize: (e: any, direction: any, div: any) => void;
  children: ReactNode;
};

const ResizablePanel = ({ defaultHeight, height, onResize, children }: ResizablePanelProps) => {
  const navbarHeight = parseInt(styles["navbar-height"], 10);

  const resizableProps = {
    className: styles["c-mobile-menu-container__draggable"],
    handleClasses: { top: styles["c-mobile-menu-container__draggable__handle"] },
    // Inline override, otherwise !important is needed in the stylesheet
    handleStyles: { top: { width: "100%", height: "50px", left: "0", top: "-42px" } },
    enable: {
      top: true,
      right: false,
      bottom: false,
      left: false,
      topRight: false,
      bottomRight: false,
      bottomLeft: false,
      topLeft: false
    },
    defaultSize: { width: "100vw", height: `${defaultHeight}px` },
    size: { height: `${height}px`, width: "100vw" },
    onResize,
    minWidth: "100vw",
    maxWidth: "100vw",
    minHeight: `${defaultHeight}px`,
    maxHeight: `calc(90vh - 60px)`
    // maxHeight: "90vh"
  };

  console.log(styles["navbar-height"]);

  return <Resizable {...resizableProps}>{children}</Resizable>;
};

export default ResizablePanel;
