import { useState } from "react";
import SelectInput from "components/ui/select";
import styles from "./header-options.module.scss";
import IconButton from "components/ui/icon-button";

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" }
];

/** Header options for languages, share, and more. */
const HeaderOptions = () => {
  const [language, setLanguage] = useState("en");

  return (
    <div className={styles["c-header-options"]}>
      {/* Languages */}
      <SelectInput
        options={LANGUAGES}
        value={LANGUAGES.find(option => option.value === language)}
        onChange={setLanguage}
        aria-label="Select a language"
        className={styles["c-header-options__language"]}
      />

      {/* Share */}
      <IconButton
        name="share"
        type="meaningful"
        accessibilityText="Share"
        className={styles["c-header-options__share"]}
        onClick={() => console.log("share")}
      />

      {/* More */}
      <IconButton name="more" type="meaningful" accessibilityText="Share" onClick={() => console.log("more")} />
    </div>
  );
};

export default HeaderOptions;
