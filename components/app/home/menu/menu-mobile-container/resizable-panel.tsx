import { Resizable, ResizeCallback } from "re-resizable";
import { ReactNode, useEffect, useState } from "react";
import styles from "./menu-mobile-container.module.scss";

type ResizablePanelProps = {
  defaultHeight: number;
  height: number;
  onResize: ResizeCallback;
  onResizeStop: ResizeCallback;
  children: ReactNode;
};

const ResizablePanel = ({ defaultHeight, height, onResize, onResizeStop, children }: ResizablePanelProps) => {
  const [windowHeight, setWindowHeight] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") setWindowHeight(window.innerHeight);
  }, []);

  const navbarHeight = 56;

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
    minWidth: "100vw",
    maxWidth: "100vw",
    minHeight: `${defaultHeight}px`,
    maxHeight: `${windowHeight * 0.9 - navbarHeight}px`,
    snap: { y: [defaultHeight, windowHeight * 0.5 - navbarHeight, windowHeight * 0.9 - navbarHeight] },
    snapGap: 20,
    onResize,
    onResizeStop
  };

  return <Resizable {...resizableProps}>{children}</Resizable>;
};

export default ResizablePanel;
