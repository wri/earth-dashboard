import { useState } from "react";
import SelectInput from "components/ui/select";
import styles from "./header-options.module.scss";

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" }
];

const HeaderOptions = () => {
  const [language, setLanguage] = useState("en");

  return (
    <div className={styles["c-header-options"]}>
      <SelectInput
        options={LANGUAGES}
        value={LANGUAGES.find(option => option.value === language)}
        onChange={setLanguage}
        aria-label="Select a language"
        className={styles["c-header-options__language"]}
      />
    </div>
  );
};

export default HeaderOptions;
