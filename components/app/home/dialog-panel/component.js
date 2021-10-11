import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import FocusTrap from "focus-trap-react";
import styles from "./dialog-panel.module.scss";
import PropTypes from "prop-types";
import ResizablePanel from "./resizable-panel";

const transitionDuration = parseInt(styles["transitionDuration"], 10);

const DialogPanel = ({ children, dialogHeight, setDialogHeight, onClose, isMobile, shouldAnimate }) => {
  const [isIn, setIsIn] = useState(true);

  useEffect(() => {
    if (shouldAnimate) setIsIn(false);
  }, [shouldAnimate]);

  const handleResize = (e, direction, div) => setDialogHeight({ height: div.offsetHeight });

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
          <ResizablePanel isMobile={isMobile} height={dialogHeight} onResize={handleResize}>
            {children}
          </ResizablePanel>
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
