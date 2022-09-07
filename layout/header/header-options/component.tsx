import React, { useState } from "react";
import SelectInput from "components/ui/select";
import styles from "./header-options.module.scss";
import IconButton from "components/ui/icon-button";
import { useRouter } from "next/router";
import { LANGUAGES } from "constants/settings";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import ShareModal from "components/share-modal";

type HeaderOptionsProps = {
  isSettingsOpen: boolean;
  isMobile: boolean;
  setSettingsOpen: ActionCreatorWithoutPayload<string>;
  setSettingsClose: ActionCreatorWithoutPayload<string>;
};

/** Header options for languages, share, and more. */
const HeaderOptions = ({ isSettingsOpen, isMobile, setSettingsOpen, setSettingsClose }: HeaderOptionsProps) => {
  const [language, setLanguage] = useState<{ value: string; label: string }>(LANGUAGES[0]);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);

  // Navigation
  const router = useRouter();

  /** Opens the more menu. */
  const handleOpenMore = () => {
    if (isSettingsOpen) return setSettingsClose();
    setSettingsOpen();
  };

  /** Open share modal on mobile, native share on desktop */
  const handleSharePress = () => {
    if (isMobile) {
      setShowShareModal(true);
    } else {
      console.log("Share on desktop");
    }
  };

  return (
    <div className={styles["c-header-options"]}>
      {/* Languages */}
      {/* TODO: Currently hidden until next sprint */}
      {!isMobile && false && (
        <SelectInput
          options={LANGUAGES}
          value={language}
          onChange={setLanguage}
          aria-label="Select a language"
          className={styles["c-header-options__language"]}
        />
      )}

      {/* Share or search */}
      {router.pathname !== "/about" && (
        <IconButton
          name={router.pathname === "/" ? "share" : "search"}
          aria-label="Share"
          className={styles["c-header-options__share"]}
          onClick={router.pathname === "/" ? handleSharePress : () => console.log("search")}
        />
      )}

      {/* More */}
      <IconButton name="more" aria-label="More" onClick={handleOpenMore} />

      {isMobile && showShareModal && <ShareModal onClose={setShowShareModal} />}
    </div>
  );
};

export default HeaderOptions;
