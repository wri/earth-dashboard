import { Resizable, ResizeCallback } from "re-resizable";
import { ReactNode } from "react";
import styles from "./menu-mobile-container.module.scss";
import classnames from "classnames";

type ResizablePanelProps = {
  defaultHeight: number;
  height: number;
  onResize: ResizeCallback;
  onResizeStop: ResizeCallback;
  snap: number[];
  maxHeight: string;
  children: ReactNode;
};

const ResizablePanel = ({
  defaultHeight,
  height,
  onResize,
  onResizeStop,
  maxHeight,
  snap,
  children
}: ResizablePanelProps) => {
  const resizableProps = {
    className: styles["c-mobile-menu-container__draggable"],
    handleClasses: {
      top: classnames(
        styles["c-mobile-menu-container__draggable__handle"],
        height === defaultHeight
          ? styles["c-mobile-menu-container__draggable__handle__closed"]
          : styles["c-mobile-menu-container__draggable__handle__open"]
      )
    },
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
    snapGap: 20,
    onResize,
    onResizeStop,
    maxHeight,
    snap: { y: snap }
  };

  return <Resizable {...resizableProps}>{children}</Resizable>;
};

export default ResizablePanel;
