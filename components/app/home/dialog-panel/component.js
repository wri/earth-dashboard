import { useState, useEffect } from "react";
import { Resizable } from "re-resizable";
import { CSSTransition } from "react-transition-group";
import FocusTrap from "focus-trap-react";
import styles from "./dialog-panel.module.scss";
import PropTypes from "prop-types";

const transitionDuration = parseInt(styles["transitionDuration"], 10);

const DialogPanel = ({ children, dialogHeight, setDialogHeight, onClose, isMobile, shouldAnimate }) => {
  const [isIn, setIsIn] = useState(true);

  useEffect(() => {
    if (shouldAnimate) setIsIn(false);
  }, [shouldAnimate]);

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

  const focusTrapOptions = Object.assign({
    onDeactivate: () => {
      setIsIn(false);
      setTimeout(onClose, transitionDuration);
    },
    // Close the Modal when user clicks outside
    clickOutsideDeactivates: true
  });

  return (
    <CSSTransition
      in={isIn}
      appear={true}
      timeout={transitionDuration}
      classNames={{
        appear: styles["c-dialog-panel--open"],
        appearDone: styles["c-dialog-panel--open"]
      }}
    >
      <div className={styles["c-dialog-panel"]} role="dialog">
        <FocusTrap focusTrapOptions={focusTrapOptions}>
          {isMobile ? <Resizable {...resizableProps}>{children}</Resizable> : children}
        </FocusTrap>
      </div>
    </CSSTransition>
  );
};

DialogPanel.propTypes = {
  dialogHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  setDialogHeight: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  shouldAnimate: PropTypes.bool.isRequired
};

DialogPanel.defaultProps = {
  shouldAnimate: false
};

export default DialogPanel;
