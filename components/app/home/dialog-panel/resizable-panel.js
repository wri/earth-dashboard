import { Resizable } from "re-resizable";
import { forwardRef } from "react";
import styles from "./dialog-panel.module.scss";

const ResizablePanel = forwardRef(({ isMobile, children, height, onResize }, ref) => {
  const resizableProps = {
    className: styles["c-dialog-panel__draggable"],
    // Inline override, otherwise !important is needed in the stylesheet
    style: { position: "absolute" },
    handleClasses: { top: styles["c-dialog-panel__draggable__handle"] },
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
    defaultSize: { width: "100vw", height: height },
    size: { height: height },
    onResize,
    minWidth: "100vw",
    maxWidth: "100vw",
    minHeight: "50vh",
    maxHeight: "90vh"
  };

  return isMobile ? (
    <Resizable ref={ref} {...resizableProps}>
      {children}
    </Resizable>
  ) : (
    <div ref={ref}>
      {/* <FocusTrap> needs to be able to get a reference to the underlying HTML element */}
      {children}
    </div>
  );
});

ResizablePanel.displayName = "ResizablePanel";

export default ResizablePanel;
