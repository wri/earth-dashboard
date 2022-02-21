import { useEffect, useRef, useState } from "react";
import dialogStyles from "components/app/home/dialog-panel/dialog-panel.module.scss";

const useDialogPanel = (isOpen, onClose) => {
  const firstInput = useRef(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (firstInput.current && isOpen) {
      try {
        firstInput.current.focus();
      } catch (e) {}
    }
  }, [firstInput, isOpen]);

  const handleClose = shouldTransition => {
    if (shouldTransition) {
      setShouldAnimate(true);
      setTimeout(handleClose, dialogStyles["transitionDuration"]);
      return;
    }
    setShouldAnimate(false);
    onClose();
  };

  return { firstInput, shouldAnimate, handleClose };
};

export default useDialogPanel;
