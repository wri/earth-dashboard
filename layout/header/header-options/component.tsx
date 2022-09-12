import { useState } from "react";
import SelectInput from "components/ui/select";
import classnames from "classnames";
import styles from "./header-options.module.scss";
import IconButton from "components/ui/icon-button";
import { useRouter } from "next/router";
import { LANGUAGES } from "constants/settings";
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";

type HeaderOptionsProps = {
  isSettingsOpen: boolean;
  isMobile: boolean;
  setSettingsOpen: ActionCreatorWithoutPayload<string>;
  setSettingsClose: ActionCreatorWithoutPayload<string>;
  setIsShareOpen: ActionCreatorWithPayload<boolean, string>;
};

/** Header options for languages, share, and more. */
const HeaderOptions = ({
  isSettingsOpen,
  isMobile,
  setSettingsOpen,
  setSettingsClose,
  setIsShareOpen
}: HeaderOptionsProps) => {
  const [language, setLanguage] = useState<{ value: string; label: string }>(LANGUAGES[0]);

  // Navigation
  const router = useRouter();

  /** Opens the more menu. */
  const handleOpenMore = () => {
    if (isSettingsOpen) return setSettingsClose();
    setSettingsOpen();
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
          size={16}
          aria-label="Share"
          className={classnames(styles["c-header-options__share"], styles["c-header-options__icon-button"])}
          onClick={router.pathname === "/" ? () => setIsShareOpen(true) : () => console.log("search")}
        />
      )}

      {/* More */}
      <IconButton
        name="more"
        size={16}
        aria-label="More"
        className={styles["c-header-options__icon-button"]}
        onClick={handleOpenMore}
      />
    </div>
  );
};

export default HeaderOptions;
