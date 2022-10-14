import DialogPanel from "components/app/home/dialog-panel";
import classnames from "classnames";
import styles from "./info-modal.module.scss";
import IconButton from "components/ui/icon-button";
import useDialogPanel from "hooks/useDialogPanel";
import { Mode } from "slices/modes";
import { ActionCreatorWithOptionalPayload } from "@reduxjs/toolkit";

type InfoModalProps = {
  isMobile: boolean;
  infoMode: Mode | undefined;
  setInfoMode: ActionCreatorWithOptionalPayload<Mode | undefined, string>;
};

const InfoModal = ({ isMobile, infoMode, setInfoMode }: InfoModalProps) => {
  const { shouldAnimate, handleClose } = useDialogPanel(!!infoMode, () => {
    setInfoMode(undefined);
  });

  if (!infoMode) return null;
  return (
    <DialogPanel onClose={handleClose} isMobile={isMobile} shouldAnimate={shouldAnimate}>
      <div className={classnames(styles["c-info-modal"])} aria-labelledby="InfoModalTitle">
        {/* Header */}
        <div className={classnames(styles["c-info-modal__header"], "u-text-center")}>
          <h2 id="InfoModalTitle" className={classnames(styles["title"], "u-margin-bottom-none")}>
            {infoMode.attributes.title}
          </h2>

          {/* Close button */}
          <IconButton
            name="close"
            size={12}
            aria-label="Close Share"
            className={styles["c-info-modal__close"]}
            onClick={handleClose}
            small
          />
        </div>
        {/* Body */}
        <div className={classnames(styles["c-info-modal__body"])}>
          <div className={classnames(styles["scroll"])}>
            <p>{infoMode.attributes.scale_info_detail}</p>
          </div>
        </div>
      </div>
    </DialogPanel>
  );
};

export default InfoModal;
