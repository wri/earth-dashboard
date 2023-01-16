import { useState } from "react";
import SelectInput from "components/ui/select";
import classnames from "classnames";
import styles from "./header-options.module.scss";
import IconButton from "components/ui/icon-button";
import { useRouter } from "next/router";
import { LANGUAGES } from "constants/settings";
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { fireEvent } from "utils/gtag";
import { NEWS_SEARCH, PAGE_VIEW } from "constants/tag-manager";

type HeaderOptionsProps = {
  isSettingsOpen: boolean;
  isMobile: boolean;
  setSettingsOpen: ActionCreatorWithoutPayload<string>;
  setSettingsClose: ActionCreatorWithoutPayload<string>;
  setIsShareOpen: ActionCreatorWithPayload<boolean, string>;
  setIsNewsSearchOpen: ActionCreatorWithPayload<boolean, string>;
};

/** Header options for languages, share, and more. */
const HeaderOptions = ({
  isSettingsOpen,
  isMobile,
  setSettingsOpen,
  setSettingsClose,
  setIsShareOpen,
  setIsNewsSearchOpen
}: HeaderOptionsProps) => {
  const [language, setLanguage] = useState<{ value: string; label: string }>(LANGUAGES[0]);

  // Navigation
  const { pathname, push } = useRouter();

  /** Opens the more menu. */
  const handleOpenMore = () => {
    fireEvent(PAGE_VIEW, "more settings");
    if (isSettingsOpen) return setSettingsClose();
    setSettingsOpen();
  };

  /** Navigates to the search page. */
  const onSearch = () => {
    fireEvent(NEWS_SEARCH, null);
    if (isMobile) return setIsNewsSearchOpen(true);
    push("/news/search");
  };

  /** Opens share modal and fires event trigger. */
  const onShareClick = () => {
    setIsShareOpen(true);
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
