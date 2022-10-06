import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import DialogPanel from "components/app/home/dialog-panel";
import useDialogPanel from "hooks/useDialogPanel";

type SearchDialogProps = {
  isOpen: boolean;
  isMobile: boolean;
  setIsNewsSearchOpen: ActionCreatorWithPayload<boolean, string>;
};

/** Shows the search bar and filter with its results. */
const SearchDialog = ({ isOpen, isMobile, setIsNewsSearchOpen }: SearchDialogProps) => {
  // Dialog controls
  const { shouldAnimate, handleClose } = useDialogPanel(isOpen, () => {
    setIsNewsSearchOpen(false);
  });

  return isOpen ? (
    <DialogPanel onClose={handleClose} isMobile={isMobile} shouldAnimate={shouldAnimate}>
      <div aria-labelledby="settingsModalTitle" role="document">
        <p>Text</p>
        <p>Text</p>
        <p>Text</p>
        <p>Text</p>
        <p>Text</p>
        <p>Text</p>
        <p>Text</p>
        <p>Text</p>
        <p>Text</p>
        <p>Text</p>
      </div>
    </DialogPanel>
  ) : null;
};

export default SearchDialog;
