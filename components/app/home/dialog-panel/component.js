import { Resizable } from "re-resizable";
import styles from "./dialog-panel.module.scss";

const DialogPanel = ({ children, dialogHeight, setDialogHeight, onClose, isMobile }) => {
  const handleResize = (e, direction, div) => setDialogHeight({ height: div.offsetHeight });

  const resizableProps = {
    className: styles["c-dialog-panel__draggable"],
    // Inline override, otherwise !important is needed in the stylesheet
    style: { position: "absolute" },
    handleClasses: { top: styles["c-dialog-panel__draggable__handle"] },
    // Inline override, otherwise !important is needed in the stylesheet
    handleStyles: { top: { width: "115px", height: "6px", left: "50%" } },
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
    defaultSize: { width: "100vw", height: dialogHeight },
    onResizeStop: handleResize,
    minWidth: "100vw",
    maxWidth: "100vw",
    minHeight: "50vh",
    maxHeight: "90vh"
  };

  return (
    <div className={styles["c-dialog-panel"]}>
      <div className={styles["c-dialog-panel__overlay"]} onClick={onClose}></div>
      {isMobile ? <Resizable {...resizableProps}>{children}</Resizable> : children}
    </div>
  );
};

export default DialogPanel;
